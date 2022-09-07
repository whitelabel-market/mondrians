<template>
  <div>
    <MamoViewHeader variant="candlelight">
      <h1 class="text-4xl font-bold leading-relaxed text-center">
        Return Policy
      </h1>
    </MamoViewHeader>

    <section
      class="transition-colors duration-200 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
    >
      <div class="container max-w-4xl px-8 mx-auto space-y-8">
        <div class="space-y-2">
          <h2 class="text-2xl font-bold uppercase">
            Wenn Sie einen Kauf tätigen, erklären Sie sich mit unseren
            Verkaufsbedingungen und den folgenden Rückgabebedingungen
            einverstanden
          </h2>
          <h2 class="text-xl font-bold">Stornierungen</h2>
          <p>
            Nachdem Sie Ihre Bestellung aufgegeben haben, wird sie automatisch
            in eine Druckwarteschlange gestellt und innerhalb weniger Minuten
            gedruckt, so dass wir Ihre Bestellung normalerweise nicht stornieren
            können.
          </p>
          <h2 class="text-xl font-bold">Lieferung</h2>
          <ul>
            <li>
              Lieferung per Kurier: Sobald eine Bestellung versandt wurde, ist
              der Kunde dafür verantwortlich, die Links zur Sendungsverfolgung
              zu überwachen und auf verpasste Zustellversuche zu reagieren,
              indem er sich direkt mit dem Kurierdienst in Verbindung setzt, um
              die Lieferung neu zu vereinbaren. Wenn eine Bestellung als
              "unzustellbar" an den Absender zurückgeschickt wird, können dem
              Kunden weitere Kosten für die erneute Zustellung der Bestellung
              entstehen.
            </li>
            <li>
              Wenn sich die Ankunft Ihrer Bestellung aufgrund einer falsch
              eingegebenen Adresse verzögert, kann es sein, dass Sie bis zu 21
              Tage länger warten müssen, bis sie ankommt. Wenn eine
              Ersatzlieferung erforderlich ist, wird Ihnen ein leicht
              reduzierter Preis für diesen Service berechnet.
            </li>
          </ul>
          <h2 class="text-xl font-bold">Rückerstattung und Umtausch</h2>
          <ul>
            <li>
              Da alles, was wir verkaufen, individuell gestaltet und auf
              Bestellung gedruckt wird, können wir Rückerstattungen und Umtausch
              nicht in der gleichen Weise anbieten wie ein Ladengeschäft (wir
              können Ihr Design nicht an jemand anderen weiterverkaufen).
            </li>
            <li>
              Wir bieten Ihnen gerne eine Rückerstattung oder einen Umtausch an,
              wenn Sie einen Fehler mit dem Druck Ihres Designs feststellen,
              kontaktieren Sie uns bitte nach Erhalt Ihrer Bestellung.
            </li>

            <li>
              Wir können keine Rückerstattung oder keinen Umtausch anbieten,
              wenn ein Fehler (z. B. ein Rechtschreibfehler) im Design vorliegt.
              Es liegt in Ihrer Verantwortung, sich zu vergewissern, dass das
              Design korrekt ist, bevor Sie Ihre Bestellung abschließen.
            </li>

            <li>
              Wenn Ihr Artikel nicht ankommt, weil er auf dem Postweg verloren
              gegangen ist oder auf dem Transportweg beschädigt wurde, ersetzen
              wir Ihren Artikel nach Erhalt eines Fotos des Schadens durch einen
              Nachdruck Ihres Entwurfs, ohne dass Ihnen zusätzliche Kosten
              entstehen, wenn Sie uns dies unverzüglich mitteilen. Wenn ein
              Artikel nicht innerhalb der von uns geschätzten Lieferzeit
              geliefert wird, ist dies kein Grund für eine Rückerstattung, da es
              sich bei unseren Daten nur um Schätzungen handelt; wenn der
              Artikel nicht innerhalb einer angemessenen Zeitspanne eintrifft,
              wird sofort ein Ersatz versandt.
            </li>
            <li>
              Rückerstattungen werden nur gewährt, wenn ein Fehler unseres
              Druckers nach einem Nachdruck nicht behoben werden kann.
            </li>
          </ul>

          <h2 class="text-xl font-bold">Farbdruck</h2>
          <ul>
            <li>
              In einigen Fällen kann es zu einer leichten Abweichung zwischen
              den auf dem Bildschirm angezeigten Farben und den Farben auf Ihrem
              Druck, Poster oder Leinwand kommen. Dies gilt für jede Website,
              die Farbdrucke erstellt. Diese Diskrepanz ergibt sich aus den
              Unterschieden zwischen der Farbwiedergabe auf dem Bildschirm eines
              Computers/Geräts und der Farbwiedergabe auf einem Drucker.
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { MamoViewHeader } from "@/components/ViewHeader";
import { useHead } from "@vueuse/head";

useHead({
  title: "Return Policy",
});
</script>
