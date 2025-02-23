# Etapa 1: Compilação
FROM node:18 AS build

WORKDIR /app

#COPY package*.json ./
COPY package*.json angular.json tsconfig*.json tsconfig.app.json ./
COPY src ./src
COPY public ./public

RUN npm install

#COPY . .
RUN npm run build -- --configuration production
# Etapa 2: Servir a aplicação
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /app/dist/sociedadefisica/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]