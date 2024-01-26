import mongoose from 'mongoose'
import Env from '@/env'

export async function getConnection() {
    return await mongoose.connect(Env.DB_URI, {
        dbName: Env.DB_NAME,
    })
}
