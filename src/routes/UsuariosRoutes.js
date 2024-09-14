const express = require("express");
const router = express.Router();
const usersController = require('../controllers/UsuarioController')
const authToken = require("../utils/Autenticacion")


router.get("/", authToken,  usersController.getAllUsers)

module.exports = router;
