export default function errorHandler(err, req, res, next) {
    if (res.headersSent)
        return next(err)
    if (!err)
        return next()

    console.error(err)
    return res.status(500).send(err)
}
