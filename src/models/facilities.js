import mongoose from 'mongoose';
// Setup schema
var FacilitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'name is required.'],
    },
});
module.exports = {
    Facilities: mongoose.model('Facilities', FacilitiesSchema)
}


