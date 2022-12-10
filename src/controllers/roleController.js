import roleService from "../services/roleService";

const createRole = async (req, res) => {
    try {
        let data = await roleService.createRole(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
            DT: "",
        });
    }
};
const getAllRole = async (req, res) => {
    try {
        let { page, limit } = req.query;
        let data = await roleService.getAllRole(+page, +limit);
        return res.status(200).json(data);
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
            DT: "",
        });
    }
};
export default {
    createRole,
    getAllRole,
};
