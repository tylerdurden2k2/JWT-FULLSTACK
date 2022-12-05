import db from "../models";

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

export default {
    getAllUser,
    getUserOfPage,
};
