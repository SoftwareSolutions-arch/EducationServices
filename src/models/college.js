import mongoose from 'mongoose';
import { stringLiteral } from 'babel-types';
// Setup schema
    var CollegeSchema = new mongoose.Schema({
        facilitie: {
            type: String,
            required: [true, 'facilitie is required.']
        },
        highlight: {
            type: String,
            required: [true, 'highlight is required.']
        },
        title: {
            type: String,
            required: [true, 'title is required.']
        },
        url:{
            type: String,
            required: [true, 'url is required.'] 
        },
        description:{
            type: String,
            required: [true, 'description is required.'] 
        },
        branches:{
            type:String,
            required: [true, 'branches is required.']
        },
        address:{
            type:String,
            required: [true, 'address is required.']
        },
        infrastructure:{
            type:String,
            required: [true, 'college types is required.']
        },
        exam:{
            type:String,
            required: [true, 'infrastructure is required.']
        },
        collegetype:{
            type:String,
            required: [true, 'collegetype is required.']
        },
        course:{
            type:String,
            required: [true, 'course is required.']
        },
        country:{
            type:String,
            required: [true, 'country is required.']
        },
        fees:{
            type:String,
            required: [true, 'fees is required.']
        },
        location:{
            type:String,
            required: [true, 'location is required.']
        },
        collegepicture:{
            type:String,
            required: [true, 'college picture is required.']
        }
    });
module.exports = {
    College: mongoose.model('College', CollegeSchema)
}


