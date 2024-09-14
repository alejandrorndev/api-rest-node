const express = require("express");
const router = express.Router();
const eventsController = require('../controllers/EventoController')
const authToken = require("../utils/Autenticacion")
//const multer = require('multer');


//const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });

router.post("/", authToken, eventsController.createEvent)


router.get("/", authToken, eventsController.getAllEvents)


module.exports = router;