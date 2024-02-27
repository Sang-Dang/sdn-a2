import { Schema, model } from 'mongoose'
// import passportLocalMongoose from 'passport-local-mongoose'

export const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
    YOB: {
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

const usersModel = model('users', usersSchema)
export default usersModel
