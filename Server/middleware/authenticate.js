const jwt = require('jsonwebtoken')
const user = require('../Schema/userSchema')


const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await user.findOne({ _id: verifyToken._id, "tokens:token": token })
        if (!rootUser) {
            throw new Error("User Not Found")

        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send(error.message);
    }

}
module.exports = Authenticate