# Étape 1 : build de l'app Angular
FROM node:20.17.0 as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/teranga-collecte/browser /usr/share/nginx/html
EXPOSE 80

