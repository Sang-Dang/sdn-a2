import mongoose from 'mongoose'
// @ts-ignore
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

export const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        slugPaddingSize: 4,
    },
})

const categoriesModel = mongoose.model('categories', categoriesSchema)
export default categoriesModel
