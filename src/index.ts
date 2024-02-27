import passportInit from '@/config/authenticate'
import Env from '@/env'
import { getConnection as getDbConnection } from '@/lib/db'
import categoriesRouter from '@/modules/categories/categories.router'
import orchidsRouter from '@/modules/orchids/orchids.router'
import pagesRouter from '@/modules/pages/pages.router'
import usersRouter from '@/modules/users/users.router'
import flash from 'connect-flash'
import cors from 'cors'
import express, { Request, Response, type Express } from 'express'
import session from 'express-session'
import logger from 'morgan'
import passport from 'passport'
import path from 'path'

Env.load()
getDbConnection()

const app: Express = express()
const port = Env.PORT
passportInit(passport)

// #region session init
app.use(
    session({
        secret: 'very secure secret',
        resave: false,
        saveUninitialized: false,
        // store: new session.MemoryStore(),
    }),
)
// #endregion

// #region view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(
    cors({
        origin: '*',
        allowedHeaders: '*',
        methods: '*',
    }),
)
// #endregion

// #region middleware
app.use(logger('dev'))
app.use(express.json()) // parse incoming body as json automatically
app.use(express.urlencoded({ extended: true })) // parse incoming body as urlencoded automatically
app.use(express.static('public')) // serve static files from the public folder
// #endregion

// #region passport init
// app.use(passport.initialize())
// app.use(passport.session())
app.use(passport.authenticate('session'))
// #endregion

// #region connect-flash init

app.use(flash())
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// #endregion

// #region routes
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/orchids', orchidsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/', pagesRouter)
// #endregion

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

app.use((err: Error, _: Request, res: Response) => {
    // if (err) console.error(err.stack) // Log error stack trace to the console
})
