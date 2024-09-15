const express = require("express");
const router = express.Router();
const usersController = require('../controllers/UsuarioController');
const Autenticacion = require("../utils/Autenticacion");
const {
    validarRegistroUsuario,
    validarInicioSesion,
    validarUsuarioId,
    validarActualizacionUsuario
} = require('../validaciones/validacionUsuarios');



router.post("/",validarRegistroUsuario,usersController.RegistrarUsuario);

router.post("/inicio-sesion",validarInicioSesion,usersController.InicioDeSesion);

router.get("/", Autenticacion, usersController.ObtenerUsuarios);

router.get("/:usuarioId",validarUsuarioId,Autenticacion,usersController.ObtenerUsuario);

router.put("/:usuarioId",validarActualizacionUsuario,Autenticacion,usersController.ActualizarUsuario);

router.delete("/:usuarioId",validarUsuarioId,Autenticacion,usersController.EliminarUsuario);

module.exports = router;
