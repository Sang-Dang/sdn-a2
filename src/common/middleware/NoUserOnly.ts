import { NextFunction, Request, Response } from 'express'

export default function NoUserOnly(req: Request, res: Response, next: NextFunction) {
    if (req.isUnauthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}
