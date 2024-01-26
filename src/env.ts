import 'dotenv/config'

export default class Env {
    public static PORT: number
    public static DB_URI: string
    public static DB_NAME: string

    public static load() {
        Env.PORT = Env.getPort()
        Env.DB_URI = Env.getDbUri()
        Env.DB_NAME = Env.getDbName()
    }

    private static getPort(): number {
        return Number(process.env.PORT ?? 3000)
    }

    private static getDbUri(): string {
        if (!process.env.DB_URI) {
            throw new Error('DB_URI is not defined')
        }
        return process.env.DB_URI
    }

    private static getDbName(): string {
        if (!process.env.DB_NAME) {
            throw new Error('DB_NAME is not defined')
        }
        return process.env.DB_NAME
    }
}
