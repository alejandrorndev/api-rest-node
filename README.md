# API de [Prueba tecnica]

Esta API proporciona varios flujos como lo son la creacion, edicion, eliminacion y listado de los usuarios, autenticacion de usuarios registrados. creacion, edicion, eliminacion y listado de los eventos y por ultimo creacion, edicion, eliminacion y listado de los asistentes a los enventos previamente registrados. A continuación se detallan las instrucciones para instalar, configurar y ejecutar el proyecto.

## Requisitos

- [Node.js](https://nodejs.org/) versión [20.17.0] o superior
- [NPM](https://www.npmjs.com/) versión [10.8.3] o superior

## Variables de Entorno

Para que la API funcione correctamente, debes configurar las siguientes variables de entorno. Crea un archivo `.env` en la raíz del proyecto y define las variables como se muestra a continuación:

```plaintext
PORT=El puerto en el que la API escuchará las solicitudes.
MYSQL_HOST=El host de la base de datos MySQL.
MYSQL_USER=El nombre de usuario para la base de datos MySQL.
MYSQL_PASSWORD=La contraseña para el usuario de la base de datos MySQL.
MYSQL_DB=El nombre de la base de datos MySQL a utilizar.
ACCESS_TOKEN_SECRET=Clave secreta utilizada para firmar los tokens de acceso.
REFRESH_TOKEN_SECRET=Clave secreta utilizada para firmar los tokens de refresco.
MAPBOX_ACCESS_TOKEN=Token de acceso para el servicio de Mapbox.
```

## Instalación

1. **Clonar el repositorio:**

   ```
   git clone https://github.com/alejandrorndev/api-rest-node.git
      ```
2. **Primero se debe instalar las dependencias**

  ```
  npm install
      ```

3. **Segundo se debe ejecutar el servidors**

  ```
  npm run dev
      ```
