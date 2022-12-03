import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const createNewUser = async (data) => {
    let { email, password, username } = data;
    let hashPassword = hashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPassword,
            username: username,
        });
    } catch (e) {
        console.log(">>check ERROR: ", e);
    }
};

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
    });
    try {
        const [rows, fields] = await connection.execute("SELECT * FROM USER");
        return rows;
    } catch (e) {
        console.log("catch error: ", error);
    }
};

const deleteUser = async (id) => {
    await db.User.destroy({
        where: { id: id },
    });
};

const getUserById = async (id) => {
    let user = await db.User.findOne({
        where: { id: id },
    });
    if (!user) {
        return {};
    }
    return user.get({ plain: true });
};

const editUser = async (data) => {
    let { id, email, username } = data;
    await db.User.update(
        { email: email, username: username },
        { where: { id: id } }
    );
};

export default {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    editUser,
};
