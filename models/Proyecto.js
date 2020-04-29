const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim:true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId, //relaciona con otra tabla
        ref: 'Usuario' // en este caso, la tabla Usuario
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Proyecto', ProyectoSchema);