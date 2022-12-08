import userApiService from "../services/userApiService";

const getAllUser = async (req, res) => {
    try {
        let { page, limit } = req.query;
        let data = {};
        if (!page || !limit) {
            data = await userApiService.getAllUser();
        } else {
            data = await userApiService.getUserOfPage(+page, +limit);
        }
        return res.status(200).json(data);
    } catch (e) {
        console.log("check error: ", e);
        return res.status(500).json({
            EC: -1,
            EM: "Error form server!",
            DT: "",
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        let data = await userApiService.deleteUserById(req.params.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({
            EC: -1,
            EM: "Error form server!",
        });
    }
};

const createNewUser = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
        });
    }
};

const getUserAccount = (req, res) => {
    return res.status(200).json({
        EC: 0,
        EM: "OK",
        DT: {
            access_token: req.token,
            roles: req.user.roles,
            email: req.user.email,
            username: req.user.username,
        },
    });
};

export default {
    getAllUser,
    deleteUserById,
    createNewUser,
    updateUser,
    getUserAccount,
};
