const express = require("express");
const router = express.Router();
const eventsController = require('../controllers/EventoController')
const authToken = require("../utils/Autenticacion")
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", authToken, eventsController.CrearEvento)


router.get("/", authToken, eventsController.ObtenerEventos)


router.get("/:eventoId", authToken, eventsController.ObtenerEvento)


router.post("/lugares-cercanos", authToken, eventsController.UbicacionesCercanas)


router.post("/lugares-cercanos-al-evento", authToken, eventsController.ObtenerUbicacionesCercanasAlEvento)


router.post("/cargue-masivo", authToken, upload.single('file'),  eventsController.CreacionMasivaEventos)


router.put("/:eventoId", authToken, eventsController.ActualizarEvento)


router.delete("/:eventoId", authToken, eventsController.EliminarEvento);



module.exports = router;