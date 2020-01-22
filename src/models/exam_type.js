import mongoose from 'mongoose';

// Setup schema
    var examtypes = new mongoose.Schema({
        examtype: {
            type: String,
            required:[true, 'exam type is required.'],
        }
    });
module.exports = {
    ExamType: mongoose.model('ExamType', examtypes)
}
