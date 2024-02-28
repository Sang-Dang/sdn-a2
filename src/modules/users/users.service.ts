import { SignupDTO } from '@/modules/users/users.dto'
import { z } from 'zod'
import * as bcrypt from 'bcrypt'
import usersModel from '@/modules/users/users.model'
import { UserDTOPartial } from '@/modules/users/users.dto'
import { GeneratePaginationMeta } from '@/lib/util/GeneratePaginationMeta'

const UsersService = {
    saltRounds: 3 as const,
    signup: async (dto: z.infer<typeof SignupDTO>) => {
        const userExists = await usersModel.exists({ username: dto.username })

        if (!!userExists) {
            throw new Error('User already exists.')
        }

        const hashedPassword = await bcrypt.hash(dto.password, UsersService.saltRounds)
        const createdUserModel = new usersModel({
            ...dto,
            password: hashedPassword,
        })
        const createdUser = await createdUserModel.save()
        return createdUser
    },
    getUsers: async (page: number, limit: number) => {
        return {
            data: await usersModel
                .find()
                .skip(page * limit)
                .limit(limit)
                .exec(),
            meta: GeneratePaginationMeta(await usersModel.countDocuments(), page, limit),
        }
    },

    getUserById: async (id: string) => {
        return await usersModel.findById(id)
    },

    updateUser: async (id: string, payload: z.infer<typeof UserDTOPartial>) => {
        return await usersModel.findByIdAndUpdate(id, payload, { new: true })
    },

    changePassword: async (id: string, oldPassword: string, newPassword: string) => {
        const user = await usersModel.findById(id, {
            password: 1,
        })
        if (!user) {
            throw new Error('User not found.')
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isPasswordMatch) {
            throw new Error('Old password is incorrect.')
        }

        const hashedPassword = await bcrypt.hash(newPassword, UsersService.saltRounds)
        const result = await usersModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
        console.log(result)
        return {
            success: result !== null,
        }
    },
}

export default UsersService
