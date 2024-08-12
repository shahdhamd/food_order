import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    console.log('token',token);
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();

    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: 'Error' })
    }
}

export default authMiddleware;