import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema
export const SpecializationSchema = new mongoose.Schema({
    specializationname: {
        type:String,
        trim: true,
        require: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = {
    Specialization: mongoose.model('Specialization', SpecializationSchema)
}
