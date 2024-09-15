const express = require("express");
const { validationResult } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/UsuarioController');
const authToken = require("../utils/Autenticacion");
const {
    validarRegistroUsuario,
    validarInicioSesion,
    validarUsuarioId,
    validarActualizacionUsuario
} = require('../validaciones/validacionUsuarios');


const validador = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


router.post("/",
    validarRegistroUsuario,
    validador, 
    usersController.RegistrarUsuario
);


router.post("/inicio-sesion",
    validarInicioSesion,
    validador, 
    usersController.InicioDeSesion
);

router.get("/", authToken, usersController.ObtenerUsuarios);


router.get("/:usuarioId",
    validarUsuarioId,
    validador,
    authToken,
    usersController.ObtenerUsuario
);


router.put("/:usuarioId",
    validarActualizacionUsuario,
    validador,
    authToken,
    usersController.ActualizarUsuario
);

router.delete("/:usuarioId",
    validarUsuarioId,
    validador,
    authToken,
    usersController.EliminarUsuario
);

module.exports = router;
