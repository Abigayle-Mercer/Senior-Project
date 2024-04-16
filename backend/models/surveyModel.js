const { interpolate } = require('d3')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const surveySchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    authorId: {
        type: int, 
    }

}, { timestamps: true })

module.exports = mongoose.model('Survey', surveySchema)

