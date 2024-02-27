import mongoose, { Schema } from 'mongoose'
// @ts-ignore
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

export const orchidsSchema = new Schema(
    {
        name: String,
        image: String,
        price: Number,
        origin: String,
        isNatural: Boolean,
        color: String,
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categories',
            require: true,
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

orchidsSchema.pre('find', function () {
    this.populate('category')
})

const orchidsModel = mongoose.model('orchids', orchidsSchema)
export default orchidsModel
