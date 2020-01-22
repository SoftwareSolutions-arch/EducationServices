import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema
export const FeesSchema = new mongoose.Schema({
    fees: {
        type:String,
        trim: true,
        required:[true, 'fees is required.'],
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = {
    Fees: mongoose.model('Fees', FeesSchema)
}
