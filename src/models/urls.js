import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema
var UrlSchema = new mongoose.Schema({
    facilitie: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true 
    },
    branches:{
        type:Array,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    infrastructure:{
        type:Array,
        required:true
    },
    exam:{
        type:Array,
        required:true
    },
    collegetype:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    fees:{
        type:String,
        required:true
    },
    city:{
        type:Array,
        required:true
    },
    collegepicture:{
        type:String,
        required:true
    },
    // review:{
    //     type:String,
    //     required:true
    // },
    placement:{
        type:String,
        required:true
    },
    company:{
        type:Array,
        required:true
    },
    state:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = {
    Url: mongoose.model('Url', UrlSchema)
}