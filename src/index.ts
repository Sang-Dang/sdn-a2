import express, { Request, Response, type Express } from 'express'
import Env from '@/env'
import categoriesRouter from '@/modules/categories/categories.router'
import { getConnection as getDbConnection } from '@/lib/db'
import orchidsRouter from '@/modules/orchids/orchids.router'
import pagesRouter from '@/modules/pages/pages.router'
import path from 'path'

Env.load()
getDbConnection()

const app: Express = express()
const port = Env.PORT

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(express.json())

app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/orchids', orchidsRouter)
app.use('/', pagesRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

app.use((err: Error, _: Request, res: Response) => {
    console.log('HI')
    console.error(err.stack) // Log error stack trace to the console
    res.status(500).send('Something broke!')
})
