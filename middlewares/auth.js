const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const authHandler = async (req, res, next) => {
    console.log("inside middleware")
    try {
        if (req.originalUrl === "/api/login" || req.originalUrl === "/api/logout") {
            next();
        } else if (
            req.headers &&
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];

            if (token == null || token == undefined) return res.sendStatus(401);

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
            });
        } else {
            res.send({
                statusCode: 401,
                message: "Unauthorized",
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(401).send({
            message: "Unauthenticated",
            error: e
        });
    }
};

module.exports = authHandler;