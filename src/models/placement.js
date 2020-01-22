import mongoose from 'mongoose';
import { stringLiteral } from 'babel-types';
// Setup schema
var PlacementSchema = new mongoose.Schema({
    highest_package: {
        type: String,
        required: true
    },
    average_package: {
        type: String,
        required: true
    },
    offers:{
        type:String
    },
    no_of_recruiters:{
        type:String
    }
});
module.exports = {
    Placement: mongoose.model('Placement', PlacementSchema)
}


