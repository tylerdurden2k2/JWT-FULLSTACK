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
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
    });
    try {
        await connection.execute("DELETE FROM USER WHERE id=?", [id]);
    } catch (error) {
        console.log("catch error: ", error);
    }
};

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
    });
    try {
        const [rows, fields] = await connection.execute(
            "SELECT * FROM USER WHERE id=?",
            [id]
        );
        return rows;
    } catch (error) {
        console.log("catch error: ", error);
    }
};

const editUser = async (data) => {
    let { id, email, username } = data;
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
    });
    try {
        await connection.execute(
            "UPDATE USER SET email=?, username=? WHERE id=?",
            [email, username, id]
        );
    } catch (error) {
        console.log("catch error: ", error);
    }
};

export default {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    editUser,
};
