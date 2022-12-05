import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";

const router = express.Router();
const initApiRoutes = (app) => {
    router.post("/register-user", apiController.registerUser);
    router.post("/login-user", apiController.loginUser);

    router.get("/users/read", userController.getAllUser);
    app.use("/api/v1/", router);
};

export default initApiRoutes;
