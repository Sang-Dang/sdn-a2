import { NextFunction, Request, Response } from 'express'

export default function AdminOnly(req: Request, res: Response, next: NextFunction) {
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
        res.redirect('/')
    }
}
