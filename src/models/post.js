import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema
export const PostSchema = new mongoose.Schema({
    title: {
        type:String,
        trim: true,
        require: true
    },
    posttype: {
        type:String,
        trim: true,
        require: true
    },
    text:{
        type:String
    }
});

module.exports = {
    Posts: mongoose.model('Posts', PostSchema)
}
