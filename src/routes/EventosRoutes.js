const express = require("express");
const router = express.Router();
const eventsController = require('../controllers/EventoController')
const authToken = require("../utils/Autenticacion")
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", authToken, eventsController.createEvent)


router.get("/", authToken, eventsController.getAllEvents)


router.get("/:eventId", authToken, eventsController.getEvent)


router.post("/LugaresCercanos", authToken, eventsController.getNearLocations)


router.post("/LugaresCercanosAlEvento", authToken, eventsController.getNearLocationsFromEvent)


router.post("/CargueMasivo", authToken, upload.single('file'),  eventsController.massiveCreationEvents)


router.put("/:eventId", authToken, eventsController.updateEvent)


router.delete("/:eventId", authToken, eventsController.deleteEvent);



module.exports = router;