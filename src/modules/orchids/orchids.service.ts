import { GeneratePaginationMeta } from '@/lib/util/GeneratePaginationMeta'
import { OrchidsDto, OrchidsDtoPartial } from '@/modules/orchids/orchids.dto'
import orchidsModel from '@/modules/orchids/orchids.model'
import { z } from 'zod'

const OrchidsService = {
    getOrchids: async (page: number, limit: number) => {
        const totalDocuments = await orchidsModel.countDocuments()

        return {
            data: await orchidsModel
                .find()
                .skip(page * limit)
                .limit(limit),
            meta: GeneratePaginationMeta(totalDocuments, page, limit),
        }
    },

    getOrchidById: async (id: string) => {
        return await orchidsModel.findById(id)
    },

    createOrchid: async (payload: z.infer<typeof OrchidsDto>) => {
        return await orchidsModel.create(payload)
    },

    updateOrchid: async (
        id: string,
        payload: z.infer<typeof OrchidsDtoPartial>,
    ) => {
        return await orchidsModel.findByIdAndUpdate(id, payload, {
            new: true,
        })
    },

    deleteOrchid: async (id: string) => {
        return await orchidsModel.findByIdAndDelete(id)
    },
}

export default OrchidsService
