import AdminOnly from '@/common/middleware/AdminOnly'
import UserOnly from '@/common/middleware/UserOnly'
import { OrchidsDto, commentDTO } from '@/modules/orchids/orchids.dto'
import OrchidsService from '@/modules/orchids/orchids.service'
import express, { NextFunction, Response } from 'express'
import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'

const orchidsRouter = express.Router()

orchidsRouter.get(
    '/',
    validateRequest({
        query: z.object({
            page: z.string().refine(value => !isNaN(Number(value)) && Number(value) >= 0, {
                message: 'Page must be a numeric string and not less than 0',
            }),
            limit: z.string().refine(value => !isNaN(Number(value)), {
                message: 'Limit must be a numeric string',
            }),
        }),
    }),
    async (req, res: Response, next: NextFunction) => {
        const { page, limit } = req.query
        try {
            const result = await OrchidsService.getOrchids(Number(page), Number(limit))
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

orchidsRouter.get(
    '/:id',
    validateRequest({
        params: z.object({
            id: z.string(),
        }),
    }),
    async (req, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const result = await OrchidsService.getOrchidById(id)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

orchidsRouter.post(
    '/comments/:orchidId',
    UserOnly,
    validateRequest({
        params: z.object({
            orchidId: z.string().min(1),
        }),
        body: commentDTO,
    }),
    async (req, res, next) => {
        const { orchidId } = req.params
        const { id } = req.user as { id: string }
        const payload = req.body
        try {
            const result = await OrchidsService.addComment(orchidId, id, payload)
            res.status(200).send(result)
        } catch (err) {
            console.error(err)
            next(err)
        }
    },
)

orchidsRouter.post(
    '/',
    validateRequest({
        body: OrchidsDto,
    }),
    async (req, res: Response, next: NextFunction) => {
        const payload = req.body
        try {
            const result = await OrchidsService.createOrchid(payload)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

orchidsRouter.patch(
    '/:id',
    validateRequest({
        params: z.object({
            id: z.string(),
        }),
        body: OrchidsDto.partial(),
    }),
    async (req, res: Response, next: NextFunction) => {
        const { id } = req.params
        const payload = req.body
        try {
            const result = await OrchidsService.updateOrchid(id, payload)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

orchidsRouter.delete(
    '/:id',
    validateRequest({
        params: z.object({
            id: z.string(),
        }),
    }),
    async (req, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const result = await OrchidsService.deleteOrchid(id)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

export default orchidsRouter
