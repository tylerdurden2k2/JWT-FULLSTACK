import express from "express";
import dotenv from "dotenv";
import viewEngineConfig from "./config/viewEngineConfig";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import connectionDB from "./config/connectDB";
import configCORS from "./config/configCORS";
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

configCORS(app);

viewEngineConfig(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connect db
connectionDB();

initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(">>> Server is running on localhost: ", PORT);
});
