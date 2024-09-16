const express = require("express");
const router = express.Router();
const EventoController = require('../controllers/EventoController')
const autenticacion = require("../utils/Autenticacion")
const multer = require('multer');
const {
    validarCreacionEvento, 
    validarEventoId, 
    validarLugaresCercanos, 
    validarLugaresCercanosAlEvento, 
    validarCargueMasivo,
    validarActualizacionEvento
} = require('../validaciones/validacionEventos');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del organizador.
 *                 example: "alejo1@gmail.com"
 *               name:
 *                 type: string
 *                 description: Nombre del evento.
 *                 example: "comicon v2"
 *               description:
 *                 type: string
 *                 description: Descripción del evento.
 *                 example: "Evento diez de prueba"
 *               location:
 *                 type: string
 *                 description: Ubicación del evento.
 *                 example: "calle 30 #80-50, medellin"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha del evento en formato YYYY-MM-DD.
 *                 example: "2024-06-30"
 *           required:
 *             - email
 *             - name
 *             - description
 *             - location
 *             - date
 *     responses:
 *       200:
 *         description: Evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del organizador.
 *                       example: "alejo1@gmail.com"
 *                     name:
 *                       type: string
 *                       description: Nombre del evento.
 *                       example: "comicon v2"
 *                     description:
 *                       type: string
 *                       description: Descripción del evento.
 *                       example: "Evento diez de prueba"
 *                     location:
 *                       type: string
 *                       description: Ubicación del evento.
 *                       example: "calle 30 #80-50, medellin"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Fecha del evento en formato YYYY-MM-DD.
 *                       example: "2024-06-30"
 *       400:
 *         description: Error en los datos de entrada. Por ejemplo, el email no es válido o falta información requerida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Mensaje de error correspondiente a la validación fallida
 *                         example: "Debe ser un correo electrónico válido"
 *                       param:
 *                         type: string
 *                         description: El parámetro que falló la validación
 *                         example: "email"
 *                       location:
 *                         type: string
 *                         description: Donde se encontró el error (por ejemplo, en el cuerpo de la solicitud)
 *                         example: "body"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor, como fallos al crear el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al crear el evento: Detalle del error interno"
 */

router.post("/",validarCreacionEvento, autenticacion, EventoController.CrearEvento)

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Obtener una lista de eventos
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         description: Correo electrónico del organizador.
 *                         example: "alejo1@gmail.com"
 *                       name:
 *                         type: string
 *                         description: Nombre del evento.
 *                         example: "comicon v2"
 *                       description:
 *                         type: string
 *                         description: Descripción del evento.
 *                         example: "Evento diez de prueba"
 *                       location:
 *                         type: string
 *                         description: Ubicación del evento.
 *                         example: "calle 30 #80-50, medellin"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Fecha del evento en formato YYYY-MM-DD.
 *                         example: "2024-06-30"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor, como fallos al obtener la lista de eventos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al obtener la lista de eventos: Detalle del error interno"
 */

router.get("/", autenticacion, EventoController.ObtenerEventos)

/**
 * @swagger
 * /api/eventos/{eventoId}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a obtener
 *         example: 10
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         description: Token JWT para la autenticación
 *     responses:
 *       200:
 *         description: Evento encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       event_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 10
 *                       user_id:
 *                         type: integer
 *                         description: ID del usuario asociado
 *                         example: 2
 *                       name:
 *                         type: string
 *                         description: Nombre del evento
 *                         example: "Evento 1"
 *                       description:
 *                         type: string
 *                         description: Descripción del evento
 *                         example: "Prueba de evento 1"
 *                       created_date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación del evento
 *                         example: "2024-09-14T23:22:44.000Z"
 *                       location:
 *                         type: string
 *                         description: Ubicación del evento
 *                         example: "-74.075434,4.64911"
 *                       assistance:
 *                         type: integer
 *                         description: Número de asistentes
 *                         example: 0
 *                       event_date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha del evento
 *                         example: "2024-05-25T00:00:00.000Z"
 *       400:
 *         description: Error en la validación de parámetros. El ID del evento no es un número entero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "El ID debe ser un número entero"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         description: Evento no encontrado. El ID proporcionado no corresponde a ningún evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Evento con ID 10 no encontrado"
 *       500:
 *         description: Error interno del servidor. Problemas al obtener el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al obtener el evento: [Descripción del error]"
 */

router.get("/:eventoId",validarEventoId, autenticacion, EventoController.ObtenerEvento)

/**
 * @swagger
 * /api/eventos/lugares-cercanos:
 *   post:
 *     summary: Obtiene lugares cercanos basados en longitud, latitud y rango
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lon:
 *                 type: number
 *                 format: float
 *                 example: -74.107118
 *                 description: Longitud de la ubicación. Debe estar entre -180 y 180 grados.
 *               lat:
 *                 type: number
 *                 format: float
 *                 example: 4.598307
 *                 description: Latitud de la ubicación. Debe estar entre -90 y 90 grados.
 *               range:
 *                 type: integer
 *                 example: 500
 *                 description: Rango en metros para buscar lugares cercanos. Debe ser un número entero positivo con al menos 3 dígitos.
 *             required:
 *               - lon
 *               - lat
 *               - range
 *     responses:
 *       200:
 *         description: Lista de lugares cercanos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: poi.1159641181949
 *                         description: ID del lugar de interés.
 *                       type:
 *                         type: string
 *                         example: Feature
 *                       place_type:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["poi"]
 *                       relevance:
 *                         type: number
 *                         example: 1
 *                       properties:
 *                         type: object
 *                         properties:
 *                           foursquare:
 *                             type: string
 *                             example: 59d2c8006fa81f06f9c4c2f3
 *                           landmark:
 *                             type: boolean
 *                             example: true
 *                           category:
 *                             type: string
 *                             example: dentist, dentistry, dental hygienist
 *                           maki:
 *                             type: string
 *                             example: dentist
 *                       text:
 *                         type: string
 *                         example: Odontoclinic
 *                       place_name:
 *                         type: string
 *                         example: Odontoclinic, Bogotá, 111511, Colombia
 *                       center:
 *                         type: array
 *                         items:
 *                           type: number
 *                         example: [-74.107118, 4.598307]
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Point
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                             example: [-74.107118, 4.598307]
 *                       context:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             mapbox_id:
 *                               type: string
 *                             text:
 *                               type: string
 *                             wikidata:
 *                               type: string
 *                             short_code:
 *                               type: string
 *       400:
 *         description: Solicitud inválida debido a parámetros incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La longitud debe estar entre -180 y 180 grados"
 *       401:
 *         description: No autorizado. Token de autenticación no proporcionado o inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token de autenticación no válido."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al procesar la solicitud."
 */

router.post("/lugares-cercanos",validarLugaresCercanos, autenticacion, EventoController.UbicacionesCercanas)

/**
 * @swagger
 * /api/eventos/lugares-cercanos-al-evento:
 *   post:
 *     summary: Obtener lugares cercanos a un evento
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventoId:
 *                 type: integer
 *                 description: ID del evento para obtener lugares cercanos. Debe ser un número entero positivo.
 *                 example: 10
 *                 minimum: 1
 *               range:
 *                 type: integer
 *                 description: Rango en metros para buscar lugares cercanos. Debe ser un número entero positivo con al menos 3 dígitos.
 *                 example: 1000
 *                 minimum: 100
 *             required:
 *               - eventoId
 *               - range
 *             additionalProperties: false
 *     responses:
 *       200:
 *         description: Lugares cercanos encontrados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID del lugar
 *                         example: "poi.1159641197107"
 *                       type:
 *                         type: string
 *                         description: Tipo de entidad
 *                         example: "Feature"
 *                       place_type:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Tipos de lugar
 *                         example: ["poi"]
 *                       relevance:
 *                         type: number
 *                         description: Relevancia del lugar
 *                         example: 1
 *                       properties:
 *                         type: object
 *                         description: Propiedades del lugar
 *                         properties:
 *                           foursquare:
 *                             type: string
 *                             description: ID en Foursquare
 *                             example: "51007d3ee4b05400921927dd"
 *                           landmark:
 *                             type: boolean
 *                             description: Indica si es un hito
 *                             example: true
 *                           category:
 *                             type: string
 *                             description: Categoría del lugar
 *                             example: "nail salon, nails, nail shop, manicure, pedicure, shop"
 *                       text:
 *                         type: string
 *                         description: Nombre del lugar
 *                         example: "El Campincito Baños Turcos"
 *                       place_name:
 *                         type: string
 *                         description: Nombre completo del lugar
 *                         example: "El Campincito Baños Turcos, Bogotá, 111311, Colombia"
 *                       center:
 *                         type: array
 *                         items:
 *                           type: number
 *                         description: Coordenadas del centro del lugar
 *                         example: [-74.075246, 4.649566]
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             description: Tipo de geometría
 *                             example: "Point"
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                             description: Coordenadas del lugar
 *                             example: [-74.075246, 4.649566]
 *                       context:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: ID del contexto
 *                               example: "postcode.4247090"
 *                             mapbox_id:
 *                               type: string
 *                               description: ID en Mapbox
 *                               example: "dXJuOm1ieHBsYzpRTTR5"
 *                             text:
 *                               type: string
 *                               description: Texto del contexto
 *                               example: "111311"
 *       400:
 *         description: Error en la validación de parámetros. El ID del evento o el rango no son válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "El ID del evento debe ser un número entero positivo y el rango debe ser un número entero positivo con al menos 3 dígitos"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor. Problemas al obtener los lugares cercanos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al obtener los lugares cercanos: [Descripción del error]"
 */

router.post("/lugares-cercanos-al-evento",validarLugaresCercanosAlEvento, autenticacion, EventoController.ObtenerUbicacionesCercanasAlEvento)

/**
 * @swagger
 * /api/eventos/cargue-masivo:
 *   post:
 *     summary: Cargue masivo de eventos desde un archivo Excel
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo Excel que contiene los eventos para el cargue masivo.
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: Archivo Excel procesado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: string
 *                   example: OK
 *                 Message:
 *                   type: string
 *                   example: Archivo Excel procesado correctamente
 *       400:
 *         description: Error en la validación del archivo. Puede ser que no se proporcione un archivo, el archivo no sea de tipo Excel o la extensión del archivo no sea válida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Descripción del error
 *                         example: "Se debe proporcionar un archivo Excel"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor. Problemas al procesar el archivo Excel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al procesar el archivo Excel: [Descripción del error]"
 */

router.post("/cargue-masivo", upload.single('file'),validarCargueMasivo, autenticacion,  EventoController.CreacionMasivaEventos)

/**
 * @swagger
 * /api/eventos/{eventoId}:
 *   put:
 *     summary: Actualizar un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a actualizar
 *         example: 10
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del organizador del evento.
 *                 example: "user@gmail.com"
 *               name:
 *                 type: string
 *                 description: Nombre del evento.
 *                 example: "actualizando este evento"
 *               description:
 *                 type: string
 *                 description: Descripción del evento.
 *                 example: "Evento actualizado de prueba"
 *               location:
 *                 type: string
 *                 description: Ubicación del evento.
 *                 example: "Ave Cra 30 #45-3, Bogotá"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha del evento en formato YYYY-MM-DD.
 *                 example: "2024-07-01"
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "user@gmail.com"
 *                     name:
 *                       type: string
 *                       example: "actualizando este evento"
 *                     description:
 *                       type: string
 *                       example: "Evento actualizado de prueba"
 *                     location:
 *                       type: string
 *                       example: "Ave Cra 30 #45-3, Bogotá"
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-07-01"
 *       400:
 *         description: Error en la validación de parámetros. Puede ser que el ID del evento no sea un número entero positivo o que los campos del cuerpo no cumplan con los requisitos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Descripción del error
 *                         example: "El ID del evento debe ser un número entero positivo"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         description: Evento no encontrado. El ID proporcionado no corresponde a ningún evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Evento con ID 10 no encontrado"
 *       500:
 *         description: Error interno del servidor. Problemas al actualizar el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al actualizar el evento: [Descripción del error]"
 */

router.put("/:eventoId",validarActualizacionEvento, autenticacion, EventoController.ActualizarEvento)

/**
 * @swagger
 * /api/eventos/{eventoId}:
 *   delete:
 *     summary: Eliminar un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a eliminar
 *         example: 10
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: string
 *                   example: "Evento eliminado exitosamente"
 *       400:
 *         description: Error en la validación del ID. El ID proporcionado no es un número entero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Descripción del error
 *                         example: "El ID debe ser un número entero"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         description: Evento no encontrado. El ID proporcionado no corresponde a ningún evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Evento con ID 10 no encontrado"
 *       500:
 *         description: Error interno del servidor. Problemas al eliminar el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al eliminar el evento: [Descripción del error]"
 */

router.delete("/:eventoId",validarEventoId, autenticacion, EventoController.EliminarEvento);



module.exports = router;