import jwt from 'jsonwebtoken'

export const jwtAuth = (req, res, next) => {

    let token = req.cookies.jwtToken;

    // token not found 
    if (!token) {
        return res.status(404).json({ success: false, msg: "unauthorized" })
    }

    try {
        jwt.verify(token, 'tD0U~ga~yhCE?sdvj{F/%6JbPN1jckI?Eiw<"|nV-H7}X|{W?s4ytaZfe7MBie=')
    }
    catch {
        return res.status(404).json({ success: false, msg: "unauthorized" })
    }

    next()
}