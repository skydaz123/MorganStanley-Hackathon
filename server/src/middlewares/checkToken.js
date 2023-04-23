import { auth } from "../firebase.js"

export default async function checkToken(req, res, next) {
    const header = req.headers.authorization

    if (!/^bearer [^ ]+$/i.test(header || ""))
        return res.sendStatus(401)

    const token = header.split(" ")[1]
    try {
        const {
            uid: id,
            email,
        } = await auth.verifyIdToken(token, true)

        // we store the user's id and email in locals
        res.locals.user = { id, email }
        next()
    } catch (err) {
        next(err)
    }
}
