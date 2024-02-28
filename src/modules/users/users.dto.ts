import { z } from 'zod'

export const SignupDTO = z.object({
    name: z.string().min(3).max(255),
    username: z.string().min(3).max(255),
    password: z.string().min(3).max(255),
    YOB: z.number().min(1900).max(2022),
})

export const SignupDTOPartial = SignupDTO.partial()

export const UserDTO = z.object({
    name: z.string().min(3).max(255),
    username: z.string().min(3).max(255),
    YOB: z.number().min(1900).max(2022),
})

export const UserDTOPartial = UserDTO.partial()
