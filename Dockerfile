FROM node as builder
RUN mkdir -p /magnesie-result-front
WORKDIR /magnesie-result-front
COPY package.json /magnesie-result-front
RUN npm install
COPY . /magnesie-result-front
RUN npm run build -- --prod

FROM nginx:1.17.1-alpine
COPY --from=builder /magnesie-result-front/dist/magnesie-result-front /usr/share/nginx/html