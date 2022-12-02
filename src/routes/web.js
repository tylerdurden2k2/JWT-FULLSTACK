import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();
const initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/user", homeController.getUserPage);
    app.use("/", router);
};

export default initWebRoutes;