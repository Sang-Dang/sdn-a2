import categoriesModel from '@/modules/categories/categories.model'
import {
    CategoriesDto,
    CategoriesDtoPartial,
} from '@/modules/categories/categories.dto'
import { z } from 'zod'
import { GeneratePaginationMeta } from '@/lib/util/GeneratePaginationMeta'

const CategoriesService = {
    getCategories: async (page: number, limit: number) => {
        const totalDocuments = await categoriesModel.countDocuments()
        return {
            data: await categoriesModel
                .find()
                .skip(page * limit)
                .limit(limit),
            meta: GeneratePaginationMeta(totalDocuments, page, limit),
        }
    },

    getCategoryById: async (id: string) => {
        return await categoriesModel.findById(id)
    },

    createCategory: async (payload: z.infer<typeof CategoriesDto>) => {
        return await categoriesModel.create(payload)
    },

    updateCategory: async (
        id: string,
        payload: z.infer<typeof CategoriesDtoPartial>,
    ) => {
        return await categoriesModel.findByIdAndUpdate(id, payload, {
            new: true,
        })
    },

    deleteCategory: async (id: string) => {
        return await categoriesModel.findByIdAndDelete(id, {
            new: false,
        })
    },
}

export default CategoriesService
