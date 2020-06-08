FROM node:12.2.0 AS builder

WORKDIR /app
COPY . .
RUN npm install && \
    npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html/
