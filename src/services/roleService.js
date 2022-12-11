import db from "../models";
import dotenv from "dotenv";
dotenv.config();

const getRoleByGroupId = async (groupId) => {
    let roles = await db.Group.findOne({
        where: { id: groupId },
        attributes: ["id", "name", "description"],
        include: [
            {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] },
            },
        ],
    });
    return roles;
};

const createRole = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allRoles = await db.Role.findAll({
                attributes: ["url"],
                raw: true,
            });

            const results = data.filter(
                ({ url: url1 }) =>
                    !allRoles.some(({ url: url2 }) => url1 === url2)
            );
            if (results.length) {
                await db.Role.bulkCreate(results);
                resolve({
                    EC: 0,
                    EM: "OK",
                    DT: "",
                });
            } else {
                resolve({
                    EC: 2,
                    EM: "Role already exist!",
                    DT: "",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
const getAllRole = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offset = (page - 1) * limit;
            const { count, rows } = await db.Role.findAndCountAll({
                attributes: ["id", "url", "description"],
                raw: true,
                offset: offset,
                limit: limit,
                order: [["id", "DESC"]],
            });
            let data = {
                listRole: rows,
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

const deleteRole = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await db.Role.findOne({
                where: { id: id },
            });
            if (role) {
                await role.destroy();
                resolve({
                    EC: 0,
                    EM: "Delete succeed!",
                    DT: "",
                });
            } else {
                resolve({
                    EC: 2,
                    EM: "This role doesn't exist!",
                    DT: "",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllRoleOnePage = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allRole = await db.Role.findAll({
                attributes: ["id", "url", "description"],
                raw: true,
                order: [["id", "DESC"]],
            });
            resolve({
                EC: 0,
                EM: "OK",
                DT: allRole,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const assignRoleForGroup = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Group_Role.destroy({
                where: { groupId: data[0].groupId },
            });
            await db.Group_Role.bulkCreate(data);
            resolve({
                EC: 0,
                EM: "OK",
                DT: "",
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    getRoleByGroupId,
    createRole,
    getAllRole,
    deleteRole,
    getAllRoleOnePage,
    assignRoleForGroup,
};
