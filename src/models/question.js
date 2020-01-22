import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema
var QuestionSchema = new mongoose.Schema({
    detailText: {
        type: String,
        required: true
    },
    foll_views:{
        type:String
    },
    question_url:{
    	type:Object
    },
    title:{
        type:String
    },
    url_id:{
        type:Number
    }
});
module.exports = {
    Question: mongoose.model('Question', QuestionSchema)
}


