import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// create the connection

// query database
const salt = bcrypt.genSaltSync(10);

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "jwt",
// });

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const createNewUser = async (data) => {
    let { email, password, username } = data;
    let hashPassword = hashUserPassword(password);
    // let checkPassword = bcrypt.compareSync("123", hashUserPassword);
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
    });
    try {
        await connection.execute(
            "INSERT INTO USER (email, password, username) VALUES ( ?, ?, ?)",
            [email, hashPassword, username]
        );
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

export default {
    createNewUser,
    getUserList,
    deleteUser,
};
