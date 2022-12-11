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

const deleteRole = async (req, res) => {
    try {
        let data = await roleService.deleteRole(req.body.id);
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

const getAllRoleOnePage = async (req, res) => {
    try {
        let data = await roleService.getAllRoleOnePage();
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

const getRoleByGroupId = async (req, res) => {
    try {
        let data = await roleService.getRoleByGroupId(req.params.groupId);
        return res.status(200).json({
            DT: data,
            EC: 0,
            EM: "OK",
        });
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
            DT: "",
        });
    }
};

const assignRoleForGroup = async (req, res) => {
    try {
        let data = {};
        data = await roleService.assignRoleForGroup(req.body);
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
    deleteRole,
    getAllRoleOnePage,
    getRoleByGroupId,
    assignRoleForGroup,
};
