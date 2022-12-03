import userService from "../services/userService";

const getHomePage = (req, res) => {
    return res.render("home.ejs");
};
const getUserPage = async (req, res) => {
    const listUsers = await userService.getUserList();
    return res.render("user.ejs", { listUsers });
};
const createNewUser = async (req, res) => {
    await userService.createNewUser(req.body);
    return res.redirect("/user");
};
const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
};

export default {
    getHomePage,
    getUserPage,
    createNewUser,
    deleteUser,
};
