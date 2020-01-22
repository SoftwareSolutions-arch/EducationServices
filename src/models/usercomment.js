import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema
var UserCommentSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true
    },
    questionID: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    users:{
        type:Object
    }
});
module.exports = {
    UserComment: mongoose.model('UserComment', UserCommentSchema)
}


