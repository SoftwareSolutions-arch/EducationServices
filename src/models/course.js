import mongoose from 'mongoose';
import validator from 'validator';
const Schema = mongoose.Schema;

// Setup schema

export const CourseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    attribute: {
        // required: [true, 'Attribute name is required.'],
        type: String,
        // trim: true,
        // require: true
    },
    reviewDetail: {
        type: Array
    },
    course_url: {
        type: String
    },
    root_url: {
        type: String
    },

    url_id: {
        type: String,
    }
});

module.exports = {
    Courses: mongoose.model('Course', CourseSchema)
}
