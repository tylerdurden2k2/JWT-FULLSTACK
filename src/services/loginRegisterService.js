import bcrypt from "bcryptjs";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const checkPhone = async (phone) => {
    let user = await db.User.findOne({
        where: { phone: phone },
    });
    if (user) {
        return true;
    }
    return false;
};

const checkEmail = async (email) => {
    let user = await db.User.findOne({
        where: { email: email },
    });
    if (user) {
        return true;
    }
    return false;
};

const registerNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, phone, username, password } = data;
            if (!email || !phone || !username || !password) {
                resolve({
                    EM: "You missing a parameter!",
                    EC: 1,
                    data: "",
                });
            } else {
                let isEmailExist = await checkEmail(email);
                let isPhoneExist = await checkPhone(phone);
                if (isEmailExist) {
                    resolve({
                        EM: "This email is exist!",
                        EC: 3,
                        data: "",
                    });
                } else if (isPhoneExist) {
                    resolve({
                        EM: "This phone is exist!",
                        EC: 3,
                        data: "",
                    });
                } else {
                    let hashPassword = hashUserPassword(password);
                    await db.User.create({
                        email: email,
                        phone: phone,
                        password: hashPassword,
                        username: username,
                    });
                    console.log("success!");
                    resolve({
                        EM: "OK!",
                        EC: 0,
                        data: "",
                    });
                }
            }
        } catch (e) {
            console.log("check e: ", e);
            reject(e);
        }
    });
};

export default {
    registerNewUser,
};
