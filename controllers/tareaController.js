const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

const {validationResult} = require('express-validator');

// Crea nueva tarea
exports.crearTarea = async (req,res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    

    try {
        // extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto); // Buscar proyecto
        if(!existeProyecto){ // sino existe:
            res.status(404).json({msg:'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual pertenece al usuario identificado
        // Verificar el creador
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }
        
        // Crear una nueva tarea 
        const tarea = new Tarea(req.body);

      
        // Guardamos la tarea
        await tarea.save();
        res.json({tarea});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtiene todas las tareas por proyecto
exports.obtenerTareas = async (req,res) => {

    

    try {
        // extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;

        const existeProyecto = await Proyecto.findById(proyecto); // Buscar proyecto
        if(!existeProyecto){ // sino existe:
            res.status(404).json({msg:'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual pertenece al usuario identificado
        // Verificar el creador
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Obtener las tareas por Proyecto
        const tareas = await Tarea.find({proyecto}).sort({creado: -1});
        res.json({tareas});
        
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

// Actualiza una tarea
exports.actualizarTarea = async (req,res) => {
    

    try {
       // extraer el proyecto y comprobar si existe
       const {proyecto, nombre, estado} = req.body;

       // Si la tarea existe o no
       let tarea = await Tarea.findById(req.params.id); // Buscar proyecto
       if(!tarea){ // sino existe:
           res.status(404).json({msg:'Tarea no encontrada'});
       }
       // extraer proyecto
       const existeProyecto = await Proyecto.findById(proyecto); // Buscar proyecto
   
       // Revisar si el proyecto actual pertenece al usuario identificado
       if(existeProyecto.creador.toString() !== req.usuario.id){
           return res.status(401).json({msg: 'No Autorizado'});
       }

       //Crear objeto con nueva info
       const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

       //Guardar la tarea
       tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea,{new: true});

       res.json({tarea});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// Elimina una tarea por su ID
exports.eliminarTarea = async (req,res) => {

    try {
        // extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;
 
        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id); // Buscar proyecto
        if(!tarea){ // sino existe:
            res.status(404).json({msg:'Tarea no encontrada'});
        }
        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto); // Buscar proyecto
    
        // Revisar si el proyecto actual pertenece al usuario identificado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }
 
        // Elimina la tarea
        await Tarea.findOneAndRemove({_id: req.params.id})
        res.json({msg:'Tarea Eliminada'})
         
     } catch (error) {
         console.log(error);
         res.status(500).send('Error en el servidor');
     }
}