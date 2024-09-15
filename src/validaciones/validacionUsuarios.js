const { body, param } = require('express-validator');

const validarRegistroUsuario = [
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    body('password').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
    body('name').notEmpty().withMessage('El nombre es obligatorio')
];

const validarInicioSesion = [
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

const validarUsuarioId = [
    param('usuarioId').isInt().withMessage('El ID debe ser un número entero')
];

const validarActualizacionUsuario = [
    param('usuarioId').isInt().withMessage('El ID debe ser un número entero'),
    body('email').optional().isEmail().withMessage('Debe ser un correo válido'),
    body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío')
];

module.exports = {
    validarRegistroUsuario,
    validarInicioSesion,
    validarUsuarioId,
    validarActualizacionUsuario
};
