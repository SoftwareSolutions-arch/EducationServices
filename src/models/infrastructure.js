import mongoose from 'mongoose';

// Setup schema
    var infrastructuretypes = new mongoose.Schema({
        infrastructure: {
            type: String,
            required: true
        }
    });
module.exports = {
    Infrastructure: mongoose.model('Infrastructure', infrastructuretypes)
}
