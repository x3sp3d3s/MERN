const Usuario = require('../models/Usuario'); // Importar modelo usuario
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) =>{


    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // Extraer email y password del req
    const {email, password} = req.body;

    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }
        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'});
        }
        // Si todo ok:  Crear y firmar el JWT --> autenticar usuarios
        const payload = {
            usuario:{
                id: usuario.id
            }
        };
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora de autenticacion
        }, (error, token)=>{
            if(error) throw error;
             // Mensaje de confirmacion
            res.json({token});
        });

    } catch (error) {
        console.log(error); 
    }

}

// Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) =>{
    try {
        
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); // seleccionamos per sin el pass
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}