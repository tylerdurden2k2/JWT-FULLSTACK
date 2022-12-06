import db from "../models";
const getAllPosition = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listPosition = [];
            listPosition = await db.Group.findAll({
                order: [["name", "ASC"]],
                raw: true,
            });
            console.log("check list: ", listPosition);
            resolve({
                EC: 0,
                EM: "OK",
                DT: listPosition,
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    getAllPosition,
};
