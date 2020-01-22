import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema
export const ReviewSchema = new mongoose.Schema({
    byuser: {
        type: String,
        trim: true,
    },
    crowdLife:{
        type: Number
    },
    detailText:{
        type: String 
    },
    faculty:{
        type: Number  
    },
    infrastructure:{
        type: Number  
    },
    placement:{
        type: Number 
    },
    rating:{
        type: Number
    },
    review_url:{
        type: String
    },
    root_url:{
        type: String
    },
    title:{
        type: String
    },
    url_id:{
        type:Number
    },
    valueForMoney:{
        type:Number
    }
});


module.exports = {
    Review: mongoose.model('Review', ReviewSchema)
}
