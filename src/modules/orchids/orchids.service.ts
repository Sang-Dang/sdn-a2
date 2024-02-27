import { GeneratePaginationMeta } from '@/lib/util/GeneratePaginationMeta'
import categoriesModel from '@/modules/categories/categories.model'
import { OrchidsDto, OrchidsDtoPartial } from '@/modules/orchids/orchids.dto'
import orchidsModel from '@/modules/orchids/orchids.model'
import mongoose from 'mongoose'
import { Types } from 'mongoose'
import { z } from 'zod'

const OrchidsService = {
    getOrchids: async (page: number, limit: number) => {
        const totalDocuments = await orchidsModel.countDocuments()
        return {
            data: await orchidsModel
                .find()
                .populate('category')
                .skip(page * limit)
                .limit(limit)
                .exec(),
            meta: GeneratePaginationMeta(totalDocuments, page, limit),
        }
    },

    getOrchidById: async (id: string) => {
        return await orchidsModel.findById(id)
    },

    createOrchid: async (payload: z.infer<typeof OrchidsDto>) => {
        const category = await categoriesModel.findOne({
            name: payload.categoryId,
        })

        if (category === null) {
            throw new Error('Category not found')
        }

        const orchid = new orchidsModel({
            ...payload,
        })
        orchid.category = category._id

        return orchid.save()
    },

    updateOrchid: async (id: string, payload: z.infer<typeof OrchidsDtoPartial>) => {
        return await orchidsModel.findByIdAndUpdate(id, payload, {
            new: true,
        })
    },

    deleteOrchid: async (id: string) => {
        return await orchidsModel.findByIdAndDelete(id)
    },
}

export default OrchidsService
