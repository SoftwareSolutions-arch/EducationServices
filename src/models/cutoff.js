import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema
var CutoffsSchema = new mongoose.Schema({
    cutoff_head:{
        type:String
    },
    cutoff_page: {
        type: String,
    },
    overview: {
        type: String,
    },
    root_url: {
        type: String,
    },
    scholarship_url:{
        type: String, 
    },
    url_id:{
        type: Number, 
    }    
});

module.exports = {
    Cutoffs: mongoose.model('Cutoffs', CutoffsSchema)
}


