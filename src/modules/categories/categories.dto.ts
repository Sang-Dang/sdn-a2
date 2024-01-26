import { z } from 'zod'

export const CategoriesDto = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
})

export const CategoriesDtoPartial = CategoriesDto.partial()
