import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import groupController from "../controllers/groupController";
import jwtAction from "../middleware/jwtAction";

const router = express.Router();
const initApiRoutes = (app) => {
    router.all("*", jwtAction.checkUserJWT, jwtAction.checkPermissionUser);
    router.post("/register-user", apiController.registerUser);
    router.post("/login-user", apiController.loginUser);

    router.get(
        "/users/read",
        jwtAction.checkUserJWT,
        jwtAction.checkPermissionUser,
        userController.getAllUser
    );
    router.delete("/users/delete/:id", userController.deleteUserById);
    router.post("/users/create-new-user", userController.createNewUser);
    router.put("/users/update-user", userController.updateUser);
    router.get("/account", userController.getUserAccount);

    router.get("/group/read", groupController.getAllPosition);

    app.use("/api/v1/", router);
};

export default initApiRoutes;
