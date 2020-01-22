import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const ExamSchema = new mongoose.Schema({
    name: {
        required: [true, 'Exam name required.'],
        type: String,
    },
    applicationprocess:{
        type:String
    },
    declarationofresult:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = {
    Exam: mongoose.model('Exam', ExamSchema)
}
