import { GeneratePaginationMeta } from '@/lib/util/GeneratePaginationMeta'
import categoriesModel from '@/modules/categories/categories.model'
import { OrchidsDto, OrchidsDtoPartial, commentDTO } from '@/modules/orchids/orchids.dto'
import orchidsModel from '@/modules/orchids/orchids.model'
import { z } from 'zod'

const OrchidsService = {
    getOrchids: async (page: number, limit: number) => {
        const totalDocuments = await orchidsModel.countDocuments()
        return {
            data: await orchidsModel
                .find()
                .sort({ createdAt: -1 })
                .populate('category')
                .skip(page * limit)
                .limit(limit)
                .exec(),
            meta: GeneratePaginationMeta(totalDocuments, page, limit),
        }
    },

    getOrchidById: async (id: string) => {
        return await orchidsModel.findById(id).populate('category')
    },

    getOrchidByName: async (name: string, page: number, limit: number) => {
        return {
            data: await orchidsModel
                .find({
                    name: {
                        $regex: new RegExp(name, 'i'),
                    },
                })
                .sort({ createdAt: -1 })
                .skip(page * limit)
                .limit(limit),
            meta: GeneratePaginationMeta(
                await orchidsModel.countDocuments({
                    name: {
                        $regex: new RegExp(name, 'i'),
                    },
                }),
                page,
                limit,
            ),
        }
    },

    getOrchidsByCategory: async (categoryId: string, page: number, limit: number) => {
        const totalDocuments = await orchidsModel.countDocuments({ category: categoryId })
        return {
            data: await orchidsModel
                .find({ category: categoryId })
                .sort({ createdAt: -1 })
                .skip(page * limit)
                .limit(limit)
                .exec(),
            meta: GeneratePaginationMeta(totalDocuments, page, limit),
        }
    },

    getOrchidBySlug: async (slug: string) => {
        return await orchidsModel.findOne({ slug }, undefined, {
            populate: 'category',
        })
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
        let category
        if (payload.categoryId) {
            category = await categoriesModel.findOne({
                name: payload.categoryId,
            })

            if (category === null) {
                throw new Error('Category not found')
            }
        }

        return await orchidsModel.findByIdAndUpdate(
            id,
            {
                ...payload,
                category: category ? category._id : undefined,
            },
            {
                new: true,
            },
        )
    },

    deleteOrchid: async (id: string) => {
        return await orchidsModel.findByIdAndDelete(id)
    },

    addComment: async (orchidId: string, authorId: string, dto: z.infer<typeof commentDTO>) => {
        const orchid = await orchidsModel.findById(orchidId)

        if (!orchid) {
            throw new Error('Orchid not found')
        }

        // TODO wtf?
        if (orchid.comments.some(comment => comment.author?._id.toString() === authorId)) {
            throw new Error('You already commented on this orchid')
        }

        orchid.comments.push({
            author: authorId,
            comment: dto.comment,
            rating: dto.rating,
        })

        await orchid.save()
    },

    getComments: async (orchidId: string) => {
        const orchid = await orchidsModel.findById(orchidId).populate('comments.author')

        if (!orchid) {
            throw new Error('Orchid not found')
        }

        return orchid.comments
    },
}

export default OrchidsService
