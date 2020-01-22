import mongoose from 'mongoose';
import { stringLiteral } from 'babel-types';
const Schema = mongoose.Schema;

// Setup schema
var ShortListCollegeSchema = new mongoose.Schema({
    userid:{
        type: Schema.Types.ObjectId, 
        ref:'User'  
    },
    collegeid:{
        type: Schema.Types.ObjectId, 
        ref:'College'
    },
});
module.exports = {
    ShortListCollege: mongoose.model('ShortListCollege', ShortListCollegeSchema)
}


