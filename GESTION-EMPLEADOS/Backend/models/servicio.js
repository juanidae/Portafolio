const mongoose = require('mongoose');

const {Schema} = mongoose;

const EmpleadoSchema = new Schema({

name: {type:String, require:true},

descrption: {type:String, require:true},

price: {type:Number, require:true},

duration: {type:String, require:true},

});

module.exports = mongoose.model('Servicio', EmpleadoSchema);