import userService from "../services/userService";

const getHomePage = (req, res) => {
    return res.render("home.ejs");
};
const getUserPage = async (req, res) => {
    const listUsers = await userService.getUserList();
    console.log("check cookie: ", req.cookies);
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

const getEditUserPage = async (req, res) => {
    let dataUser = await userService.getUserById(req.params.id);
    return res.render("edit-user-page.ejs", { dataUser });
};

const editUser = async (req, res) => {
    await userService.editUser(req.body);
    return res.redirect("/user");
};
export default {
    getHomePage,
    getUserPage,
    createNewUser,
    deleteUser,
    getEditUserPage,
    editUser,
};
