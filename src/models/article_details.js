import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema
var ArticleDetailSchema = new mongoose.Schema({
    article_detail_url: {
        type: String
    },
    article_number: {
        type: Number,
    },
    html: {
        type: String
    },
    root_url: {
        type: String,
    },
    sort: {
        type: Number
    },
    tag: {
        type: String
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    }
});

module.exports = {
    ArticlesDetails: mongoose.model('ArticlesDetails', ArticleDetailSchema)
}


