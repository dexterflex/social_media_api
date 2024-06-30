import jwt from 'jsonwebtoken'

export const jwtAuth = (req, res, next) => {

    let token = req.cookies.jwtToken;

    // token not found 
    if (!token) {
        return res.status(404).json({ success: false, msg: "unauthorized" })
    }

    try {
        jwt.verify(token, process.env.SECRET_KEY)
    }
    catch {
        return res.status(404).json({ success: false, msg: "unauthorized" })
    }

    next()
}