# # Stage 1: Build Angular App
# FROM node:20-alpine AS builder

# # Set working directory
# WORKDIR /app


# # Copy package.json and package-lock.json to install dependencies
# COPY package*.json ./

# # Limpar cache e remover pacotes antigos
# RUN npm cache clean --force
# RUN rm -rf node_modules
# RUN rm -f package-lock.json

# # Instalar dependências novamente
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # RUN npm install

# # Build the Angular app for production
# RUN npm run build -- --configuration=production

# # Stage 2: NGINX for serving Angular app
# FROM nginx:alpine

# # Copy the Angular build output from the builder stage to NGINX's html directory
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=builder /app/dist/sociedadefisica /usr/share/nginx/html


# # Expose port 80 to the outside world
# EXPOSE 80

# # Start NGINX server
# CMD ["nginx", "-g", "daemon off;"]


# Etapa 1: Compilação
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production
# Etapa 2: Servir a aplicação
FROM nginx:alpine
COPY --from=build /app/dist/sociedadefisica/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]