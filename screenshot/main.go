package main

import (
	"context"
	"io/ioutil"
	"log"
	"net/http"
	"sync"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

func createScreenshot(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Query().Get("url")

	ctx, cancel := chromedp.NewContext(
		context.Background(),
		chromedp.WithDebugf(log.Printf),
	)
	defer cancel()

	var wg sync.WaitGroup

	wg.Add(1)

	chromedp.ListenTarget(ctx, func(ev interface{}) {
		if ev, ok := ev.(*page.EventLifecycleEvent); ok {
			if ev.Name == "firstMeaningfulPaint" {
				wg.Done()
			}
		}
	})

	var buf []byte

	// capture entire browser viewport
	if err := chromedp.Run(ctx,
		chromedp.Navigate(url),
		chromedp.ActionFunc(func(ctx context.Context) error {
			wg.Wait()
			return nil
		}),
		chromedp.EmulateViewport(7086, 9448),
		chromedp.FullScreenshot(&buf, 100),
	); err != nil {
		log.Fatal(err)
	}
	if err := ioutil.WriteFile("fullScreenshot.png", buf, 0o644); err != nil {
		log.Fatal(err)
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write(buf)
}

func main() {
	handler := http.HandlerFunc(createScreenshot)
	http.Handle("/screenshot", handler)
	http.ListenAndServe(":3333", nil)
}