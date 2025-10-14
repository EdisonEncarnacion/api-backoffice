# Imagen base ligera de Node.js
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --production

# Copiar la carpeta dist con el código compilado
COPY dist ./dist

# Exponer puerto (igual que el que usas en main.js)
EXPOSE 3017

# Comando para ejecutar la app
CMD ["node", "dist/main.js"]
