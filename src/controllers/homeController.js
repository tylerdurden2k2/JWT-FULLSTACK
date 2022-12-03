import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
});

const getHomePage = (req, res) => {
    return res.render("home.ejs");
};
const getUserPage = (req, res) => {
    return res.render("user.ejs");
};
const createNewUser = (req, res) => {
    let { email, password, username } = req.body;
    connection.query(
        "INSERT INTO USER (email, password, username) VALUES ( ?, ?, ?)",
        [email, password, username],
        function (err, results) {
            console.log(results);
        }
    );
    return res.send("createNewUser");
};
export default {
    getHomePage,
    getUserPage,
    createNewUser,
};
