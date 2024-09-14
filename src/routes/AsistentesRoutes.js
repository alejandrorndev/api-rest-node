const express = require("express");
const router = express.Router();
const AsistenteController = require('../controllers/AsistenteController')
const authToken = require("../utils/Autenticacion")

router.post("/", authToken, AsistenteController.RegistrarAsistente)

router.get("/", authToken, AsistenteController.ObtenerAsistentes)

router.get("/asistencia-diaria", authToken, AsistenteController.ObtenerAsistenciaDiaria)

router.get("/:asistenteId", authToken, AsistenteController.ObtenerAsistente)

router.get("/usuario/:userId", authToken, AsistenteController.ObtenerAsistentesPorUsuario)

router.get("/evento/:eventId", authToken, AsistenteController.ObtenerAsistentesPorEvento)

router.put("/:asistenteId", authToken, AsistenteController.ActualizarAsistente)

router.delete("/:asistenteId", authToken, AsistenteController.EliminarAsistente);

module.exports = router;
