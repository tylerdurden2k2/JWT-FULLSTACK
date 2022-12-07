import db from "../models";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listUser = [];
            listUser = await db.User.findAll({
                attributes: {
                    exclude: [
                        "password",
                        "createdAt",
                        "updatedAt",
                        "GroupId",
                        "groupId",
                    ],
                },
                include: [
                    {
                        model: db.Group,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                EC: 0,
                EM: "OK",
                DT: listUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getUserOfPage = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offset = (page - 1) * limit;
            const { count, rows } = await db.User.findAndCountAll({
                attributes: {
                    exclude: [
                        "password",
                        "createdAt",
                        "updatedAt",
                        "GroupId",
                        "groupId",
                    ],
                },
                include: [
                    {
                        model: db.Group,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                ],
                raw: true,
                nest: true,
                offset: offset,
                limit: limit,
                order: [["id", "DESC"]],
            });
            console.log("count: ", count, "rows: ", rows);
            let data = {
                listUser: rows,
                totalPages: Math.ceil(count / limit),
                totalRows: count,
            };
            resolve({
                EC: 0,
                EM: "OK",
                DT: data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
            });
            if (user) {
                await user.destroy();
                resolve({
                    EC: 0,
                    EM: "Delete succeed!",
                });
            } else {
                resolve({
                    EC: 2,
                    EM: "This user isn't exist!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [user, created] = await db.User.findOrCreate({
                where: {
                    [Op.or]: [{ email: data.email }, { phone: data.phone }],
                },
                defaults: {
                    email: data.email,
                    phone: data.phone,
                    username: data.username,
                    sex: data.sex,
                    address: data.address,
                    groupId: data.groupId,
                    password: hashUserPassword(data.password),
                },
            });
            if (created) {
                resolve({
                    EC: 0,
                    EM: "Create new user success!",
                });
            } else {
                resolve({
                    EC: 2,
                    EM: "Phone or Email already exist in database!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(
                {
                    username: data.username,
                    sex: data.sex,
                    address: data.address,
                    groupId: data.groupId,
                },
                { where: { email: data.email } }
            );
            resolve({
                EC: 0,
                EM: "Update succeed!",
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    getAllUser,
    getUserOfPage,
    deleteUserById,
    createNewUser,
    updateUser,
};
