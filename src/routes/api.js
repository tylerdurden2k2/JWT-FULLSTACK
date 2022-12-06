import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import groupController from "../controllers/groupController";

const router = express.Router();
const initApiRoutes = (app) => {
    router.post("/register-user", apiController.registerUser);
    router.post("/login-user", apiController.loginUser);

    router.get("/users/read", userController.getAllUser);
    router.delete("/users/delete/:id", userController.deleteUserById);
    router.post("/users/create-new-user", userController.createNewUser);

    router.get("/group/read", groupController.getAllPosition);

    app.use("/api/v1/", router);
};

export default initApiRoutes;
