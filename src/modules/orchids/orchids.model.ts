import mongoose from 'mongoose'
// @ts-ignore
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

export const orchidsSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    origin: String,
    isNatural: Boolean,
    color: String,
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        slugPaddingSize: 4,
    },
})

const orchidsModel = mongoose.model('orchids', orchidsSchema)
export default orchidsModel
