import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema

export const Company = new mongoose.Schema({
    company_name: {
        type: String, 
        required:[true, 'Company name is required.'],
        trim: true 
    },
    package:{
        type: String, 
        required:[true, 'package details is required.'],
        trim: true 
    },
    details:{
        type: String, 
        // required:[true, 'package details is required.'],
        trim: true 
    }
});

module.exports = {
    Company: mongoose.model('Company', Company)
}

