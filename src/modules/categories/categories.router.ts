import {
    CategoriesDto,
    CategoriesDtoPartial,
} from '@/modules/categories/categories.dto'
import CategoriesService from '@/modules/categories/categories.service'
import express, { NextFunction, Response } from 'express'
import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'

const categoriesRouter = express.Router()

categoriesRouter.get(
    '/',
    validateRequest({
        query: z.object({
            page: z
                .string()
                .refine(value => !isNaN(Number(value)) && Number(value) >= 0, {
                    message:
                        'Page must be a numeric string and not less than 0',
                }),
            limit: z.string().refine(value => !isNaN(Number(value)), {
                message: 'Limit must be a numeric string',
            }),
        }),
    }),
    async (req, res: Response, next: NextFunction) => {
        const { page, limit } = req.query
        try {
            const result = await CategoriesService.getCategories(
                Number(page),
                Number(limit),
            )
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

categoriesRouter.get(
    '/:id',
    validateRequest({
        params: z.object({
            id: z.string(),
        }),
    }),
    async (req, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const result = await CategoriesService.getCategoryById(id)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

categoriesRouter.post(
    '/',
    validateRequest({
        body: CategoriesDto,
    }),
    async (req, res: Response, next: NextFunction) => {
        const payload = req.body
        try {
            const result = await CategoriesService.createCategory(payload)
            res.status(201).send(result)
        } catch (err) {
            next(err)
        }
    },
)

categoriesRouter.patch(
    '/:id',
    validateRequest({
        params: z.object({
            id: z.string(),
        }),
        body: CategoriesDtoPartial,
    }),
    async (req, res: Response, next: NextFunction) => {
        const { id } = req.params
        const payload = req.body
        try {
            const result = await CategoriesService.updateCategory(id, payload)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

categoriesRouter.delete(
    '/:id',
    validateRequest({
        params: z.object({
            id: z.string(),
        }),
    }),
    async (req, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const result = await CategoriesService.deleteCategory(id)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

// ! testing code
// TODO delete testing code
categoriesRouter.post('/many', async (req, res) => {
    const payload = req.body
    for (const item of payload) {
        await CategoriesService.createCategory(item)
    }
})

export default categoriesRouter
