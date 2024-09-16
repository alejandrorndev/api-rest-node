# Usa una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en la imagen
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 5001

# Define el comando para ejecutar la aplicación
CMD [ "npm", "run", "dev" ]
