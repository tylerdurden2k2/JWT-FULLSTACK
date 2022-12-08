import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const noCheckRoute = ["/", "/register-user", "/login-user"];

const signJWT = (payload) => {
    let secret = process.env.SECRET;
    try {
        return jwt.sign(payload, secret, {
            expiresIn: "10000",
        });
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
};

const verifyJWT = (token) => {
    let secret = process.env.SECRET;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        // err
        console.log("error: ", err);
        return null;
    }
};

const checkUserJWT = (req, res, next) => {
    if (noCheckRoute.includes(req.path)) return next();
    let cookies = req.cookies;
    let decoded = null;
    if (cookies && cookies.jwt) {
        decoded = verifyJWT(cookies.jwt);
    }
    if (decoded) {
        req.user = decoded;
        req.token = cookies.jwt;
        next();
    } else {
        return res.status(401).json({
            DT: "",
            EC: -1,
            EM: "Not authenticated user!",
        });
    }
};

const checkPermissionUser = (req, res, next) => {
    if (noCheckRoute.includes(req.path) || req.path === "/account")
        return next();
    let arrRoles = [];
    if (req.user) {
        arrRoles = [...req.user.roles.Roles];
        let currentUrl = req.path;
        if (arrRoles.length === 0) {
            return res.status(403).json({
                DT: "",
                EC: -1,
                EM: "You don't have permission to access this resource",
            });
        }
        let check = arrRoles.some((item) => item.url === currentUrl);
        if (check) {
            next();
        } else {
            return res.status(403).json({
                DT: "",
                EC: -1,
                EM: "You don't have permission to access this resource",
            });
        }
    } else {
        return res.status(401).json({
            DT: "",
            EC: -1,
            EM: "Not authenticated user!",
        });
    }
};

export default {
    signJWT,
    verifyJWT,
    checkUserJWT,
    checkPermissionUser,
};
