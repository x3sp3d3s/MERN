const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


// crea proyectos
// api/proyectos
router.post('/',
        auth,
        [
            check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
        ],
        proyectoController.crearProyecto
);
// Obten todos los proyectos
router.get('/',
        auth, // Primero mirar si esta autenticado auth.js hi ha la funcio
        proyectoController.obtenerProyectos
);
// Actualiza el proyecto via ID
router.put('/:id',
        auth, // Primero mirar si esta autenticado auth.js hi ha la funcio
        [
            check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
        ],
        proyectoController.actualizarProyecto
);
// Eliminar un proyecto
router.delete('/:id',
        auth, // Primero mirar si esta autenticado auth.js hi ha la funcio
        proyectoController.eliminarProyecto
);
module.exports = router;