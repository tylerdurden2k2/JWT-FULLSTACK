import userService from "../services/userService";

const getHomePage = (req, res) => {
    return res.render("home.ejs");
};
const getUserPage = (req, res) => {
    return res.render("user.ejs");
};
const createNewUser = (req, res) => {
    // userService.createNewUser(req.body);
    userService.getUserList();
    return res.send("createNewUser");
};
export default {
    getHomePage,
    getUserPage,
    createNewUser,
};
