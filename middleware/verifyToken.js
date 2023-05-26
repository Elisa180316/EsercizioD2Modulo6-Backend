import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    //Se in header di richiesta c'è header auth//
    const token = req.header('auth')

    if (!token) {
        return res.status(401).send({
            errorType: 'Token non presente',
            statusCode: 401,
            message: 'Per poter utilizzare questo endpoint è necessario un token di accesso'
        })
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_JWT_KEY)
        req.user = verified

        next()
    } catch(error) {
        res.status(403).send({
            errorType: 'Token Error',
            statusCode: 403,
            message: 'Il token della tua sessione non è valido o è scaduto'
        })
    }
}

