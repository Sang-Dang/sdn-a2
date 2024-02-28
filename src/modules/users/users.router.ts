import UserOnly from '@/common/middleware/UserOnly'
import { UserDTOPartial } from '@/modules/users/users.dto'
import UsersService from '@/modules/users/users.service'
import express from 'express'
import passport from 'passport'
import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'

const usersRouter = express.Router()

usersRouter.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/orchids',
        failureRedirect: '/login?error=true',
        failureFlash: true,
    }),
    async (req, res, next) => {},
)

usersRouter.post('/register', (req, res) => {
    const payload = req.body
    UsersService.signup(payload)
    req.flash('Register successful. Please login!')
    res.status(201)
    res.redirect('/login')
})

usersRouter.patch(
    '/',
    UserOnly,
    validateRequest({
        body: UserDTOPartial,
    }),
    async (req, res, next) => {
        const { id } = req.user as { id: string }
        const payload = req.body
        try {
            const result = await UsersService.updateUser(id, payload)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

usersRouter.put(
    '/change-password',
    UserOnly,
    validateRequest({
        body: z.object({
            newPassword: z.string().min(1),
            oldPassword: z.string().min(1),
        }),
    }),
    async (req, res, next) => {
        const { id } = req.user as { id: string }
        const { newPassword: password, oldPassword } = req.body
        try {
            const result = await UsersService.changePassword(id, oldPassword, password)
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    },
)

export default usersRouter
