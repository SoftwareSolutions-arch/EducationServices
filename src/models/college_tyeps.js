import mongoose from 'mongoose';

// Setup schema
    var Collegetypes = new mongoose.Schema({
        college_types: {
            type: String,
            required: [true, 'college types is required.']
        }
    });
module.exports = {
    CollegeTypes: mongoose.model('CollegeTypes', Collegetypes)
}


