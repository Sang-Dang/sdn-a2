import categoriesModel from '@/modules/categories/categories.model'
import {
    CategoriesDto,
    CategoriesDtoPartial,
} from '@/modules/categories/categories.dto'
import { z } from 'zod'
import { GeneratePaginationMeta } from '@/lib/util/GeneratePaginationMeta'
import orchidsModel from '@/modules/orchids/orchids.model'

const CategoriesService = {
    getCategories: async (page: number, limit: number) => {
        const totalDocuments = await categoriesModel.countDocuments()
        return {
            data: await categoriesModel
                .find()
                .sort({ createdAt: -1 })
                .skip(page * limit)
                .limit(limit),
            meta: GeneratePaginationMeta(totalDocuments, page, limit),
        }
    },

    getAllCategories: async () => {
        return await categoriesModel.find()
    },

    getCategoryById: async (id: string) => {
        return await categoriesModel.findById(id)
    },

    getCategoryBySlug: async (slug: string) => {
        return await categoriesModel.findOne({ slug })
    },

    createCategory: async (payload: z.infer<typeof CategoriesDto>) => {
        return await categoriesModel.create(payload)
    },

    updateCategory: async (id: string, payload: z.infer<typeof CategoriesDtoPartial>) => {
        return await categoriesModel.findByIdAndUpdate(id, payload, {
            new: true,
        })
    },

    deleteCategory: async (id: string) => {
        await orchidsModel.deleteMany({ category: id })

        return await categoriesModel.findByIdAndDelete(id, {
            new: false,
        })
    },
}

export default CategoriesService
