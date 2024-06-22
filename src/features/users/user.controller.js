import jwt from 'jsonwebtoken'

import { addUser, authenticateUser } from "./user.model.js"



export const signUp = (req, res) => {
    let response = addUser(req.body)
    if (response.success) {
        return res.status(201).json(response)
    }
    return res.status(400).json(response)
}


export const signIn = (req, res) => {
    let response = authenticateUser(req.body)
    if (response.success) {
        let load = { id: response.user.id, name: response.user.name }
        let token = jwt.sign(load, 'tD0U~ga~yhCE?sdvj{F/%6JbPN1jckI?Eiw<"|nV-H7}X|{W?s4ytaZfe7MBie=', { expiresIn: 900000 })

        res.cookie("jwtToken", token, { maxAge: 900000, httpOnly: true })
        res.cookie("userId", response.user.id, { maxAge: 900000, httpOnly: true })
        return res.status(200).json({ ...response, token })
    }
    return res.status(404).json(response)
}


export const logout = (req, res) => {
    res.clearCookie('jwtToken')
    res.clearCookie('userId')
    return res.status(200).json({ success: true, msg: "user logged out" })
}