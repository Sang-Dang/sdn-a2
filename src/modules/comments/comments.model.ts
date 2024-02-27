import { Schema, model } from 'mongoose'

const commentsScema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
    author: {
        type: Schema.ObjectId,
        ref: 'users',
        require: true,
    },
})

const commentsModel = model('comments', commentsScema)
export default commentsModel
