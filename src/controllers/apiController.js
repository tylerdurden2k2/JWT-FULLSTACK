import loginRegisterService from "../services/loginRegisterService";
const registerUser = async (req, res) => {
    try {
        let data = await loginRegisterService.registerNewUser(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({
            EM: "Error from server!",
            EC: -1,
            DT: "",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        let data = await loginRegisterService.LoginUser(req.body);
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
        }
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({
            EM: "Error from server!",
            EC: -1,
            DT: "",
        });
    }
};

export default {
    registerUser,
    loginUser,
};
