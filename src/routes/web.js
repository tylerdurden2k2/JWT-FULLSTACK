import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();
const initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/user", homeController.getUserPage);
    router.post("/users/create-user", homeController.createNewUser);
    router.post("/users/delete-user/:id", homeController.deleteUser);
    router.get("/users/update-user-page/:id", homeController.getEditUserPage);
    router.post("/users/update-user", homeController.editUser);
    app.use("/", router);
};

export default initWebRoutes;
