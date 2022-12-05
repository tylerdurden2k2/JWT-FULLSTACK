import express from "express";
import apiController from "../controllers/apiController";

const router = express.Router();
const initApiRoutes = (app) => {
    router.post("/register-user", apiController.registerUser);
    app.use("/api/v1/", router);
};

export default initApiRoutes;
