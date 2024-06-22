import { body, validationResult } from "express-validator";

const signupValidate = [
    body('name')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
        .trim().escape(),
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, msg: errors.array()[0].msg });
        }
        next();
    }
];

export default signupValidate;
