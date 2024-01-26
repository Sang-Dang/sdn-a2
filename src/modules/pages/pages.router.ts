import CategoriesService from '@/modules/categories/categories.service'
import OrchidsService from '@/modules/orchids/orchids.service'
import express from 'express'

const pagesRouter = express.Router()

pagesRouter.get('/', async (req, res) => {
    let { page } = req.query
    if (!page) page = '0'

    const categories = await CategoriesService.getCategories(0, 5)
    const orchids = await OrchidsService.getOrchids(Number(page), 5)

    res.render('pages/index', {
        categories,
        orchids,
        currentPage: Number(page),
    })
})

export default pagesRouter
