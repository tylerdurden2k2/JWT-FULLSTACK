import userService from "../services/userService";

const getHomePage = (req, res) => {
    return res.render("home.ejs");
};
const getUserPage = async (req, res) => {
    const listUsers = await userService.getUserList();
    console.log("check listUsers: ", listUsers);
    return res.render("user.ejs", { listUsers });
};
const createNewUser = (req, res) => {
    // userService.createNewUser(req.body);

    return res.send("createNewUser");
};
export default {
    getHomePage,
    getUserPage,
    createNewUser,
};
