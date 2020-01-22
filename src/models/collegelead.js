import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema
var CollegeLeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'email is required.']
    },
    phone:{
        type:Number,
        required: [true, 'phone is required.']
    },
    course:{
        type:String,
        required: [true, 'Course is required.']
    },
    askquestion:{
        type:String,
        required: [true, 'askQuestion is required.']
    }
});

module.exports = {
    CollegeLead: mongoose.model('CollegeLead', CollegeLeadSchema)
}


