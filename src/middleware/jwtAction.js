import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const signJWT = (payload) => {
    let secret = process.env.SECRET;
    try {
        return jwt.sign(payload, secret);
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

export default {
    signJWT,
    verifyJWT,
};
