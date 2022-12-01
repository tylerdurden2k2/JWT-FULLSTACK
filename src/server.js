import express from "express";
import dotenv from "dotenv";
import viewEngineConfig from "./configs/viewEngineConfig";
import initWebRoutes from "./routes/web";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

viewEngineConfig(app);

initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> Server is running on localhost: ", PORT);
});
