const express = require("express");
const router = express.Router();
const usersController = require('../controllers/UsuarioController')
const authToken = require("../utils/Autenticacion")


router.post("/", usersController.RegistrarUsuario)

router.post("/inicio-sesion", usersController.InicioDeSesion)

router.get("/", authToken,  usersController.ObtenerUsuarios)

router.get("/:usuarioId", authToken, usersController.ObtenerUsuario)

router.put("/:usuarioId", authToken, usersController.ActualizarUsuario)

router.delete("/:usuarioId", authToken, usersController.EliminarUsuario);



module.exports = router;
