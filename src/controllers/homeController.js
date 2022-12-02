const getHomePage = (req, res) => {
    return res.render("home.ejs");
};
const getUserPage = (req, res) => {
    return res.render("user.ejs");
};
export default {
    getHomePage,
    getUserPage,
};
