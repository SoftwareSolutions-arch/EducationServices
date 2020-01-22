import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Setup schema
var leadsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    address: {
        type: String,
        required:true
    }
});

// create Leads Model
module.exports = {
    Leads: mongoose.model('LeadSchema', leadsSchema)
}