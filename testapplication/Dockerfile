# Stage 1: Build the React app
FROM node:18.14.0 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Stage 2: Serve the React app using NGINX
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]