import { z } from 'zod'

export const OrchidsDto = z.object({
    name: z.string().min(3).max(255),
    image: z.string().min(3).max(255),
    price: z.number().min(0),
    origin: z.string().min(1).max(255),
    isNatural: z.boolean(),
    color: z.string().min(3).max(255),
})

export const OrchidsDtoPartial = OrchidsDto.partial()
