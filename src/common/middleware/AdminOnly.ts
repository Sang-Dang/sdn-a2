import { NextFunction, Request, Response } from 'express'

export default function AdminOnly(req: Request, res: Response, next: NextFunction) {
    console.log(req.user)
    if (
        req.isAuthenticated() &&
        (
            req.user as {
                isAdmin: boolean
            }
        ).isAdmin === true
    ) {
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
}
