const jwt = require('jsonwebtoken');
require("dotenv").config()

const Auth = (req,res,next) => {
    const token = req.headers.authorization;
    if (token) {
        const decode = jwt.verify(token, process.env.KEY);
        if (decode) {
            const userID = decode.userID;
            req.body.userID = userID;
            next();
        } else {
            res.send("Please login first")
        }
    } else {
        res.send("Please login first last ")
    }
}

module.exports = {Auth};