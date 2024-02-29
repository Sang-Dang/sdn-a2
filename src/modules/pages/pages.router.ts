import AdminOnly from '@/common/middleware/AdminOnly'
import NoUserOnly from '@/common/middleware/NoUserOnly'
import UserOnly from '@/common/middleware/UserOnly'
import CategoriesService from '@/modules/categories/categories.service'
import OrchidsService from '@/modules/orchids/orchids.service'
import UsersService from '@/modules/users/users.service'
import express from 'express'
import { z } from 'zod'
import { validateRequest } from 'zod-express-middleware'

const pagesRouter = express.Router()

pagesRouter.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

pagesRouter.get('/', (req, res) => {
    res.redirect('/orchids')
})

pagesRouter.get('/categories', async (req, res) => {
    let { page } = req.query
    if (!page) page = '0'

    const categories = await CategoriesService.getCategories(Number(page), 5)

    res.render('pages/categories', {
        categories,
        isSearching: false,
        currentSite: req.originalUrl,
    })
})

pagesRouter.get('/categories/create', AdminOnly, async (req, res) => {
    res.render('pages/categories-create', {
        currentSite: req.originalUrl,
        category: undefined,
    })
})

pagesRouter.get('/categories/update/:id', AdminOnly, async (req, res) => {
    const { id } = req.params
    if (!id) res.redirect('/categories')

    const category = await CategoriesService.getCategoryById(id)

    if (!category) {
        res.redirect('/not-found')
        return
    }

    res.render('pages/categories-create', {
        category,
        currentSite: req.originalUrl,
    })
})
pagesRouter.get(
    '/categories/search',
    validateRequest({
        query: z.object({
            name: z.string(),
            page: z.string().optional(),
        }),
    }),
    async (req, res) => {
        const { name, page } = req.query

        const categories = await CategoriesService.searchByName(name, Number(page ?? 0), 5)
        res.render('pages/categories', {
            categories,
            isSearching: true,
            currentSite: req.originalUrl,
            searchQuery: {
                name,
            },
        })
    },
)

pagesRouter.get(
    '/categories/:slug',
    validateRequest({
        params: z.object({
            slug: z.string(),
        }),
        query: z.object({
            page: z.string().optional(),
        }),
    }),
    async (req, res) => {
        let { page } = req.query
        if (!page) page = '0'

        const { slug } = req.params
        const category = await CategoriesService.getCategoryBySlug(slug)

        if (!category) {
            res.redirect('/not-found')
            return
        }

        const orchids = await OrchidsService.getOrchidsByCategory(category._id.toString(), Number(page), 5)

        res.render('pages/categories-details.ejs', {
            category,
            orchids,
            currentSite: req.originalUrl,
        })
    },
)

pagesRouter.get('/orchids', async (req, res) => {
    let { page } = req.query
    if (!page) page = '0'

    const orchids = await OrchidsService.getOrchids(Number(page), 5)

    res.render('pages/orchids', {
        orchids,
        isSearching: false,
        currentSite: req.originalUrl,
    })
})

pagesRouter.get('/orchids/create', AdminOnly, async (req, res) => {
    const categories = await CategoriesService.getAllCategories()
    res.render('pages/orchids-create', {
        currentSite: req.originalUrl,
        orchid: undefined,
        categories,
    })
})

pagesRouter.get('/orchids/update/:id', AdminOnly, async (req, res) => {
    const { id } = req.params

    if (!id) res.redirect('/orchids')

    const orchid = await OrchidsService.getOrchidById(id)

    if (!orchid) {
        res.redirect('/not-found')
        return
    }

    const categories = await CategoriesService.getAllCategories()

    res.render('pages/orchids-create', {
        orchid,
        categories,
        currentSite: req.originalUrl,
    })
})

pagesRouter.get(
    '/orchids/search',
    validateRequest({
        query: z.object({
            name: z.string(),
            page: z.string().optional(),
        }),
    }),
    async (req, res) => {
        const { name, page } = req.query

        const orchids = await OrchidsService.getOrchidByName(name, Number(page ?? 0), 5)
        res.render('pages/orchids', {
            orchids,
            isSearching: true,
            currentSite: req.originalUrl,
            searchQuery: {
                name,
            },
        })
    },
)

pagesRouter.get(
    '/orchids/:slug',
    validateRequest({
        params: z.object({
            slug: z.string(),
        }),
    }),
    async (req, res) => {
        const { slug } = req.params
        const orchid = await OrchidsService.getOrchidBySlug(slug)

        if (!orchid) {
            res.redirect('/not-found')
            return
        }

        const comments = await OrchidsService.getComments(orchid._id.toString())
        let hasCommented = true
        if (req.user) {
            const { id } = req.user as { id: string }
            hasCommented = comments.some(comment => comment.author?._id.toString() === id)
            console.log(id)
        }

        res.render('pages/orchids-details.ejs', {
            orchid,
            comments,
            hasCommented,
            currentSite: req.originalUrl,
        })
    },
)

pagesRouter.get('/accounts', AdminOnly, async (req, res) => {
    let { page } = req.query
    if (!page) page = '0'

    const users = await UsersService.getUsers(Number(page), 5)

    res.render('pages/accounts', {
        users,
        currentSite: req.originalUrl,
    })
})

pagesRouter.get(
    '/accounts/:id',
    UserOnly,
    validateRequest({
        params: z.object({
            id: z.string(),
        }),
    }),
    async (req, res) => {
        const { id } = req.params

        const loggedInUserId = (req.user as { id: string })!.id

        if (loggedInUserId !== id) {
            res.redirect('/not-found')
            return
        }

        const user = await UsersService.getUserById(id)

        if (!user) {
            res.redirect('/not-found')
            return
        }

        res.render('pages/accounts-details.ejs', {
            user,
            currentSite: req.originalUrl,
        })
    },
)

pagesRouter.get('/login', NoUserOnly, async (req, res) => {
    res.render('pages/login')
})

pagesRouter.get('/register', NoUserOnly, async (req, res) => {
    res.render('pages/register')
})

pagesRouter.get('/logout', UserOnly, (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err)
        }
    })
    req.flash('Logout success!')
    res.redirect('/login')
})

pagesRouter.get('/not-found', (req, res) => {
    res.render('pages/404.ejs')
})

export default pagesRouter
