const express = require("express");
const router = express.Router();
const usersController = require('../controllers/UsuarioController')
const authToken = require("../utils/Autenticacion")


router.post("/", usersController.RegistrarUsuario)

router.post("/auth/login", usersController.InicioDeSesion)

router.get("/", authToken,  usersController.ObtenerUsuarios)

router.get("/:userId", authToken, usersController.ObtenerUsuario)

router.put("/:userId", authToken, usersController.ActualizarUsuario)

router.delete("/:userId", authToken, usersController.EliminarUsuario);



module.exports = router;
