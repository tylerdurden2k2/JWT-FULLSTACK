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

const createNewUser = (data) => {
    let { email, password, username } = data;
    let hashPassword = hashUserPassword(password);
    // let checkPassword = bcrypt.compareSync("123", hashUserPassword);

    connection.query(
        "INSERT INTO USER (email, password, username) VALUES ( ?, ?, ?)",
        [email, hashPassword, username],
        function (err, results) {
            if (err) {
                console.log(">>ERROR: ", err);
            } else {
                console.log(">>check results: ", results);
            }
        }
    );
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

    // await connection.query("SELECT * FROM USER", function (err, results) {
    //     if (err) {
    //         console.log(">>ERROR: ", err);
    //         return listUsers;
    //     } else {
    //         console.log(">>check results: ", results);
    //         return results;
    //     }
    // });
};

export default {
    createNewUser,
    getUserList,
};
