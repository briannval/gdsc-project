FROM node:20-alpine AS vbuild

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=vbuild /app/nginx /etc/nginx/conf.d

COPY --from=vbuild /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
