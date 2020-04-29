const Usuario = require('../models/Usuario'); // Importar modelo usuario
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) =>{
    //console.log(req.body); 
    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // Extraer email y password
    const {email, password} = req.body;

    try {
        // Revisar que usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }
        // crea nuevo usuario
        usuario = new Usuario(req.body);
        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        // guardar usuario
        await usuario.save();

        // Crear y firmar el JWT --> autenticar usuarios
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
        res.status(400).send('Hubo un error');     
    }
}   