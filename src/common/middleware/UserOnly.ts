import { NextFunction, Request, Response } from 'express'

export default function UserOnly(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}
