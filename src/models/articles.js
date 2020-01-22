import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema
var ArticleSchema = new mongoose.Schema({
    article_url: {
        type: String,
    },
    detailText: {
        type: String,
    },
    title: {
        type: String,
    },
    url_id:{
        type: Number, 
    } 
});

module.exports = {
    Article: mongoose.model('Article', ArticleSchema)
}


