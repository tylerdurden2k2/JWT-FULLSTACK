import bcrypt from "bcryptjs";
import db from "../models";
import { Op } from "sequelize";
import roleService from "./roleService";
import jwtAction from "../middleware/jwtAction";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
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
                        groupId: 4,
                    });
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

const LoginUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { keyLogin, password } = data;
            let user = await db.User.findOne({
                where: {
                    [Op.or]: [{ email: keyLogin }, { phone: keyLogin }],
                },
                raw: true,
            });
            if (user) {
                let check = comparePassword(password, user.password);
                if (check) {
                    let roles = await roleService.getRoleByGroupId(user);
                    let payload = {
                        email: user.email,
                        roles,
                        username: user.username,
                    };
                    resolve({
                        EC: 0,
                        EM: "OK",
                        DT: {
                            access_token: jwtAction.signJWT(payload),
                            roles,
                            email: user.email,
                            username: user.username,
                        },
                    });
                } else {
                    resolve({
                        EC: 2,
                        EM: "Incorrect password or account!",
                        DT: "",
                    });
                }
            } else {
                resolve({
                    EC: 2,
                    EM: "Incorrect password or account!",
                    DT: "",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    registerNewUser,
    LoginUser,
};
