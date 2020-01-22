import mongoose from 'mongoose';
import validator from 'validator';
const Schema = mongoose.Schema;
// Setup schema

export const BranchSchema = new mongoose.Schema({
    branch: {
        required: [true, 'Branch is required.'],
        type: String,
        require: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    status: {
        type: Boolean,
        default: true
    },
});

module.exports = {
    Branch: mongoose.model('Branch', BranchSchema)
}
