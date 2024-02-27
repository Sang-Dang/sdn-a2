import usersModel from '@/modules/users/users.model'
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

export default function passportInit(pp: typeof passport) {
    pp.use(
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                session: true,
            },
            async (username, password, done) => {
                try {
                    const user = await usersModel.findOne(
                        { username },
                        {
                            password: 1,
                            username: 1,
                            name: 1,
                            YOB: 1,
                            isAdmin: 1,
                        },
                        {},
                    )
                    if (!user) {
                        return done(null, false, {
                            message: 'Invalid Credentials',
                        })
                    }

                    console.log(user)

                    const pw = await bcrypt.compare(password, user.password!)
                    if (pw) {
                        return done(null, user)
                    } else {
                        return done(null, false, {
                            message: 'Invalid Credentials',
                        })
                    }
                } catch (error) {
                    console.error(error)
                    return done(null, false, {
                        message: 'some shit happened. idk',
                    })
                }
            },
        ),
    )
    pp.serializeUser((user, done) => {
        process.nextTick(() => {
            return done(null, user)
        })
    })
    pp.deserializeUser((user: any, done) => {
        process.nextTick(function () {
            return done(null, {
                id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
            })
        })
    })
}
