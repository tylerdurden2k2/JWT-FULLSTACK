import groupService from "../services/groupService";

const getAllPosition = async (req, res) => {
    try {
        let data = await groupService.getAllPosition();
        return res.status(200).json(data);
    } catch (e) {
        console.log("Error: ", e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server...",
            DT: [],
        });
    }
};

export default { getAllPosition };
