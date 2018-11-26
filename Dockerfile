FROM ubuntu:latest
RUN \
    apt-get update && \
    apt-get install -y curl sudo build-essential
RUN \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

WORKDIR website
COPY package.json package.json
RUN yarn
COPY . .
# RUN yarn run build.builder
RUN yarn run build.frontend
# RUN yarn run run.builder

CMD tail -f /dev/null
