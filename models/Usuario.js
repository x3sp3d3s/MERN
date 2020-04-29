const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true // Elimina espacios inicio o final
    },
    email:{
        type: String,
        required: true,
        trim: true, // Elimina espacios inicio o final
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    registro:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema); 