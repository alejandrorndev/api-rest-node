const express = require("express");
const router = express.Router();
const AsistenteController = require('../controllers/AsistenteController')
const Autenticacion = require("../utils/Autenticacion")
const {
    validarRegistroAsistente, 
    validarAsitenteId,
    validarObtenerAsistentesPorUsuario,
    validarObtenerAsistentesPorEvento, 
    validarActualizacionAsistente
} = require('../validaciones/validacionesAsistentes');

/**
 * @swagger
 * /api/asistentes:
 *   post:
 *     summary: Registrar un asistente a un evento
 *     tags: [Asistentes]
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
 *                 description: ID del evento al que el usuario asistirá
 *                 example: 22
 *               usuarioId:
 *                 type: integer
 *                 description: ID del usuario que asistirá al evento
 *                 example: 2
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la asistencia (formato YYYY-MM-DD)
 *                 example: "2024-07-01"
 *     responses:
 *       200:
 *         description: Asistencia registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Asistencia registrada exitosamente Asistencia:"
 *                     data:
 *                       type: object
 *                       properties:
 *                         eventoId:
 *                           type: integer
 *                           description: ID del evento
 *                           example: 22
 *                         usuarioId:
 *                           type: integer
 *                           description: ID del usuario
 *                           example: 2
 *                         date:
 *                           type: string
 *                           format: date
 *                           description: Fecha de la asistencia
 *                           example: "2024-07-01"
 *       400:
 *         description: Error en la validación de los parámetros
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
 *                         description: Mensaje de error
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
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         description: El evento no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Mensaje de error indicando que el evento no existe
 *                       example: "El evento no existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al registrar la asistencia"
 */

router.post("/",validarRegistroAsistente, Autenticacion, AsistenteController.RegistrarAsistente)

/**
 * @swagger
 * /api/asistentes:
 *   get:
 *     summary: Obtener un listado de todos los asistentes registrados
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Listado de asistentes recuperado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assistance_id:
 *                         type: integer
 *                         description: ID de la asistencia
 *                         example: 20
 *                       event_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       user_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de la asistencia
 *                         example: "2024-07-01T05:00:00.000Z"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener los asistentes"
 */

router.get("/", Autenticacion, AsistenteController.ObtenerAsistentes)

/**
 * @swagger
 * /api/asistentes/asistencia-diaria:
 *   get:
 *     summary: Obtener el número de asistentes por cada día de la semana
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Asistencia diaria recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     Domingo:
 *                       type: integer
 *                       description: Número de asistencias registradas el domingo
 *                       example: 1
 *                     Lunes:
 *                       type: integer
 *                       description: Número de asistencias registradas el lunes
 *                       example: 0
 *                     Martes:
 *                       type: integer
 *                       description: Número de asistencias registradas el martes
 *                       example: 0
 *                     Miércoles:
 *                       type: integer
 *                       description: Número de asistencias registradas el miércoles
 *                       example: 0
 *                     Jueves:
 *                       type: integer
 *                       description: Número de asistencias registradas el jueves
 *                       example: 0
 *                     Viernes:
 *                       type: integer
 *                       description: Número de asistencias registradas el viernes
 *                       example: 0
 *                     Sábado:
 *                       type: integer
 *                       description: Número de asistencias registradas el sábado
 *                       example: 0
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener la asistencia diaria"
 */

router.get("/asistencia-diaria", Autenticacion, AsistenteController.ObtenerAsistenciaDiaria)

/**
 * @swagger
 * /api/asistentes/{asistenteId}:
 *   get:
 *     summary: Obtener la información de un asistente por ID
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: asistenteId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 20
 *         description: ID del asistente a buscar
 *     responses:
 *       200:
 *         description: Asistente encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assistance_id:
 *                         type: integer
 *                         description: ID de la asistencia
 *                         example: 20
 *                       event_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       user_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de la asistencia
 *                         example: "2024-07-01T05:00:00.000Z"
 *       400:
 *         description: Error en la validación de los parámetros
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
 *                         description: Mensaje de error
 *                         example: "El ID del asistente debe ser un número entero positivo"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         description: Asistente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Asistente no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener el asistente"
 */

router.get("/:asistenteId",validarAsitenteId, Autenticacion, AsistenteController.ObtenerAsistente)

/**
 * @swagger
 * /api/asistentes/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener los asistentes registrados por usuario
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *         description: ID del usuario para obtener los asistentes
 *     responses:
 *       200:
 *         description: Lista de asistentes encontrados para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assistance_id:
 *                         type: integer
 *                         description: ID de la asistencia
 *                         example: 20
 *                       event_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       user_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de la asistencia
 *                         example: "2024-07-01T05:00:00.000Z"
 *       400:
 *         description: Error en la validación de los parámetros
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
 *                         description: Mensaje de error
 *                         example: "El ID del usuario debe ser un número entero positivo"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener los asistentes del usuario"
 */

router.get("/usuario/:usuarioId",validarObtenerAsistentesPorUsuario, Autenticacion, AsistenteController.ObtenerAsistentesPorUsuario)

/**
 * @swagger
 * /api/asistentes/evento/{eventoId}:
 *   get:
 *     summary: Obtener asistentes para un evento específico
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         description: ID del evento para obtener los asistentes
 *         schema:
 *           type: integer
 *           example: 22
 *     responses:
 *       200:
 *         description: Lista de asistentes para el evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assistance_id:
 *                         type: integer
 *                         description: ID de la asistencia
 *                         example: 20
 *                       event_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       user_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de la asistencia
 *                         example: "2024-07-01T05:00:00.000Z"
 *       400:
 *         description: Error en la validación del ID del evento
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
 *                         description: Mensaje de error
 *                         example: "El ID del evento debe ser un número entero positivo"
 *       404:
 *         description: No se encontraron asistentes para el evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "No se encontraron asistentes para este evento"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener los asistentes para el evento"
 */

router.get("/evento/:eventoId",validarObtenerAsistentesPorEvento, Autenticacion, AsistenteController.ObtenerAsistentesPorEvento)

/**
 * @swagger
 * /api/asistentes/{asistenteId}:
 *   put:
 *     summary: Actualizar los detalles de un asistente
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: asistenteId
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del asistente que se actualizará
 *           example: 1
 *       - in: body
 *         name: body
 *         description: Datos para actualizar el asistente
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             eventoId:
 *               type: integer
 *               description: ID del evento al que el asistente está asociado
 *               example: 4
 *             usuarioId:
 *               type: integer
 *               description: ID del usuario asociado con la asistencia
 *               example: 4
 *             date:
 *               type: string
 *               format: date
 *               description: Fecha de la asistencia (formato YYYY-MM-DD)
 *               example: "2024-09-09"
 *     responses:
 *       200:
 *         description: Asistente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "OK"
 *                     message:
 *                       type: string
 *                       example: "Asistencia actualizada exitosamente"
 *                     data:
 *                       type: object
 *                       properties:
 *                         eventoId:
 *                           type: integer
 *                           description: ID del evento actualizado
 *                           example: 4
 *                         usuarioId:
 *                           type: integer
 *                           description: ID del usuario actualizado
 *                           example: 4
 *                         date:
 *                           type: string
 *                           format: date
 *                           description: Fecha de la asistencia actualizada
 *                           example: "2024-09-09"
 *       400:
 *         description: Error en la validación de los parámetros
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
 *                         description: Mensaje de error
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
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         description: Error específico de recursos no encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: 
 *                     "El evento asociado no existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al actualizar el asistente"
 */

router.put("/:asistenteId",validarActualizacionAsistente, Autenticacion, AsistenteController.ActualizarAsistente)

/**
 * @swagger
 * /api/asistentes/{asistenteId}:
 *   delete:
 *     summary: Eliminar un asistente
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: asistenteId
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del asistente que se desea eliminar
 *           example: 1
 *     responses:
 *       200:
 *         description: Asistente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Asistencia eliminada exitosamente"
 *       404:
 *         description: El asistente no fue encontrado o no pudo ser eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Asistente no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error interno del servidor"
 */

router.delete("/:asistenteId",validarAsitenteId, Autenticacion, AsistenteController.EliminarAsistente);

module.exports = router;
