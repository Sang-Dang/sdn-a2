import mongoose from 'mongoose'
// @ts-ignore
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

export const categoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            slug: 'name',
            unique: true,
            slugPaddingSize: 4,
        },
    },
    { timestamps: true },
)

const categoriesModel = mongoose.model('categories', categoriesSchema)
export default categoriesModel
