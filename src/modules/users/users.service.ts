import { SignupDTO } from '@/modules/users/users.dto'
import { z } from 'zod'
import * as bcrypt from 'bcrypt'
import usersModel from '@/modules/users/users.model'

const UsersService = {
    saltRounds: 3 as const,
    signup: async (dto: z.infer<typeof SignupDTO>) => {
        const userExists = await usersModel.exists({ username: dto.username })

        if (!!userExists) {
            throw new Error('User already exists.')
        }

        const hashedPassword = await bcrypt.hash(
            dto.password,
            UsersService.saltRounds,
        )
        const createdUserModel = new usersModel({
            ...dto,
            password: hashedPassword,
        })
        const createdUser = await createdUserModel.save()
        return createdUser
    },
}

export default UsersService
