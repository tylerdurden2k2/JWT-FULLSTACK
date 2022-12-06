import userApiService from "../services/userApiService";

const getAllUser = async (req, res) => {
    try {
        console.log("check query: ", req.query);
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

export default {
    getAllUser,
    deleteUserById,
};
