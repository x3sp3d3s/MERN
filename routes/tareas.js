const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


// crea tareas
// api/tareas
router.post('/',
        auth,
        [
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
        ],
        tareaController.crearTarea
);
// Obten todas las tareas
router.get('/',
        auth,
        tareaController.obtenerTareas
);
// Actualiza la tarea via ID
router.put('/:id',
        auth, // Primero mirar si esta autenticado auth.js hi ha la funcio
        tareaController.actualizarTarea
);
// Eliminar una tarea
router.delete('/:id',
        auth, // Primero mirar si esta autenticado auth.js hi ha la funcio
        tareaController.eliminarTarea
);
module.exports = router;