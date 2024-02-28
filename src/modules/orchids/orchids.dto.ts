import { z } from 'zod'

export const OrchidsDto = z.object({
    name: z.string().min(3).max(255),
    image: z.string().min(3).max(255),
    price: z.number().min(0),
    origin: z.string().min(1).max(255),
    isNatural: z.boolean(),
    color: z.string().min(3).max(255),
    categoryId: z.string().min(3).max(255),
})

export const OrchidsDtoPartial = OrchidsDto.partial()

export const commentDTO = z.object({
    rating: z.string().refine(
        value => {
            const number = Number(value)
            return !isNaN(number) && number >= 1 && number <= 5
        },
        {
            message: 'Must be a numeric string between 1 and 5',
        },
    ),
    comment: z.string(),
})

export const commentDTOPartial = commentDTO.partial()
