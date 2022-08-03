FROM node:16

# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y --no-install-recommends google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 libxtst6 libxcb-dri3-0 libx11-xcb1 libxcb1 \
# Apparently it can happen, that some necessary deps are installed with google-chrome-stable 
# Here is a list of all deps for Puppeteer/Chromium: 
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix
    && rm -rf /var/lib/apt/lists/*



# Chrome can leave many zombie processes, so it is recommended to use --init for docker run or dumb-init
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#tips
# https://github.com/Yelp/dumb-init#option-4-downloading-the-binary-directly
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.4/dumb-init_1.2.4_x86_64\
    && chmod +x /usr/local/bin/dumb-init

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

#RUN npx prisma generate
CMD [ "node", "server.js" ]