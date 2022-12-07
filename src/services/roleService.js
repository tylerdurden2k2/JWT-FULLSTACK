import db from "../models";
import dotenv from "dotenv";
dotenv.config();

const getRoleByGroupId = async (user) => {
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: [
            {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] },
            },
        ],
    });
    console.log("check roles: ", roles);
    return roles;
};

export default getRoleByGroupId;
