FROM golang:1.16.5 AS build-env

RUN apt update && apt -y upgrade 

# Install Chrome
RUN apt-get install -y --no-install-recommends fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 libcairo2 libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libwayland-client0 libx11-6 libxcb1 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils 
RUN wget  https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i ./google-chrome-stable_current_amd64.deb 
RUN apt --fix-broken install
RUN dpkg -i google-chrome-stable_current_amd64.deb
RUN dpkg -l | grep chrome

WORKDIR /app

ADD ./ ./

# Download all the dependencies
RUN go get -d -v ./...

# Install the package
RUN go install -v ./...

# Build the Go app
RUN go build -o /build

# Expose port 8080 to the outside world
EXPOSE 3333

# Run the executable
CMD [ "/build" ]
