const express = require("express");
const router = express.Router();
const EventoController = require('../controllers/EventoController')
const autenticacion = require("../utils/Autenticacion")
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", autenticacion, EventoController.CrearEvento)


router.get("/", autenticacion, EventoController.ObtenerEventos)


router.get("/:eventoId", autenticacion, EventoController.ObtenerEvento)


router.post("/lugares-cercanos", autenticacion, EventoController.UbicacionesCercanas)


router.post("/lugares-cercanos-al-evento", autenticacion, EventoController.ObtenerUbicacionesCercanasAlEvento)


router.post("/cargue-masivo", autenticacion, upload.single('file'),  EventoController.CreacionMasivaEventos)


router.put("/:eventoId", autenticacion, EventoController.ActualizarEvento)


router.delete("/:eventoId", autenticacion, EventoController.EliminarEvento);



module.exports = router;