import UsersService from '@/modules/users/users.service'
import express from 'express'
import passport from 'passport'

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

usersRouter.post('/logout', (req, res, next) => {
    console.log('HERE')
    req.logout(err => {
        if (err) {
            return next(err)
        }
    })
    console.log('HI')
    req.flash('Logout success!')
    res.redirect('/login')
})

export default usersRouter
