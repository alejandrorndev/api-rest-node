const { body, param , validationResult } = require('express-validator');

const validador = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validarCreacionEvento = [
    body('email')
        .isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('name')
        .notEmpty().withMessage('El nombre del evento es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('description')
        .notEmpty().withMessage('La descripción del evento es obligatoria'),
    body('location')
        .notEmpty().withMessage('La ubicación del evento es obligatoria')
        .isLength({ min: 5 }).withMessage('La ubicación debe tener al menos 5 caracteres'),
    body('date')
        .notEmpty().withMessage('La fecha del evento es obligatoria')
        .isISO8601().withMessage('Debe ser una fecha válida en formato YYYY-MM-DD'),
        validador
];

const validarEventoId = [
    param('eventoId').isInt().withMessage('El ID debe ser un número entero'),validador
];

const validarLugaresCercanos = [
    body('lon')
        .isFloat({ min: -180, max: 180 }).withMessage('La longitud debe estar entre -180 y 180 grados'),
    body('lat')
        .isFloat({ min: -90, max: 90 }).withMessage('La latitud debe estar entre -90 y 90 grados'),
    body('range')
        .isInt({ min: 100 }).withMessage('El rango debe ser un número entero positivo y debe tener al menos 3 digitos'),
        validador
];

const validarLugaresCercanosAlEvento = [
    body('eventoId')
        .isInt({ min: 1 }).withMessage('El ID del evento debe ser un número entero positivo'),
    body('range')
        .isInt({ min: 100 }).withMessage('El rango debe ser un número entero positivo y debe tener al menos 3 digitos'),
        validador
];

const validarCargueMasivo = [
    (req, res, next) => {
        // Validar que el archivo esté presente
        if (!req.file) {
            return res.status(400).json({ errors: [{ msg: 'Se debe proporcionar un archivo Excel' }] });
        }

        // Validar tipo de archivo
        const file = req.file;
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ errors: [{ msg: 'El archivo debe ser de tipo Excel' }] });
        }

        // Validar extensión del archivo
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
            return res.status(400).json({ errors: [{ msg: 'El archivo debe tener una extensión .xlsx o .xls' }] });
        }

        next();
    },
    validador
];


const validarActualizacionEvento = [
    param('eventoId')
        .isInt({ min: 1 }).withMessage('El ID del evento debe ser un número entero positivo'),

    body('email')
        .optional()
        .isEmail().withMessage('Debe ser un correo electrónico válido'),

    body('name')
        .optional()
        .notEmpty().withMessage('El nombre del evento no puede estar vacío')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

    body('description')
        .optional()
        .notEmpty().withMessage('La descripción del evento no puede estar vacía'),

    body('location')
        .optional()
        .notEmpty().withMessage('La ubicación del evento no puede estar vacía')
        .isLength({ min: 5 }).withMessage('La ubicación debe tener al menos 5 caracteres'),

    body('date')
        .optional()
        .isISO8601().withMessage('Debe ser una fecha válida en formato YYYY-MM-DD'),
    validador
];

module.exports = { validarCreacionEvento, validarEventoId, validarLugaresCercanos, validarLugaresCercanosAlEvento, validarCargueMasivo,validarActualizacionEvento };
