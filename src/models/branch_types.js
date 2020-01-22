import mongoose from 'mongoose';

// Setup schema
    var branchtypes = new mongoose.Schema({
        branch_types: {
            type: String,
            required: true
        }
    });
module.exports = {
    BranchType: mongoose.model('BranchType', branchtypes)
}
