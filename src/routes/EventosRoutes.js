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

router.post("/",validarCreacionEvento, autenticacion, EventoController.CrearEvento)


router.get("/", autenticacion, EventoController.ObtenerEventos)


router.get("/:eventoId",validarEventoId, autenticacion, EventoController.ObtenerEvento)


router.post("/lugares-cercanos",validarLugaresCercanos, autenticacion, EventoController.UbicacionesCercanas)


router.post("/lugares-cercanos-al-evento",validarLugaresCercanosAlEvento, autenticacion, EventoController.ObtenerUbicacionesCercanasAlEvento)


router.post("/cargue-masivo", upload.single('file'),validarCargueMasivo, autenticacion,  EventoController.CreacionMasivaEventos)


router.put("/:eventoId",validarActualizacionEvento, autenticacion, EventoController.ActualizarEvento)


router.delete("/:eventoId",validarEventoId, autenticacion, EventoController.EliminarEvento);



module.exports = router;