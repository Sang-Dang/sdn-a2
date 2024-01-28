import CategoriesService from '@/modules/categories/categories.service'
import OrchidsService from '@/modules/orchids/orchids.service'
import express from 'express'

const pagesRouter = express.Router()

pagesRouter.get('/', (req, res) => {
    res.redirect('/orchids')
})

pagesRouter.get('/categories', async (req, res) => {
    let { page } = req.query
    if (!page) page = '0'

    const categories = await CategoriesService.getCategories(Number(page), 5)

    res.render('pages/categories', {
        categories,
        currentSite: req.originalUrl,
    })
})

pagesRouter.get('/categories/create', async (req, res) => {
    res.render('pages/categories-create', {
        currentSite: req.originalUrl,
    })
})

pagesRouter.get('/categories/update/:id', async (req, res) => {
    const { id } = req.params
    if (!id) res.redirect('/categories')

    const category = await CategoriesService.getCategoryById(id)

    res.render('pages/categories-update', {
        category,
        currentSite: req.originalUrl,
    })
})

pagesRouter.get('/orchids', async (req, res) => {
    let { page } = req.query
    if (!page) page = '0'

    const orchids = await OrchidsService.getOrchids(Number(page), 5)

    res.render('pages/orchids', {
        orchids,
        currentSite: req.originalUrl,
    })
})

pagesRouter.get('/orchids/create', async (req, res) => {
    res.render('pages/orchids-create', {
        currentSite: req.originalUrl,
    })
})

pagesRouter.get('/orchids/update/:id', async (req, res) => {
    const { id } = req.params

    if (!id) res.redirect('/orchids')

    const orchid = await OrchidsService.getOrchidById(id)

    res.render('pages/orchids-update', {
        orchid,
        currentSite: req.originalUrl,
    })
})

export default pagesRouter
