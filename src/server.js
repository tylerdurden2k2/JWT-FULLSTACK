import express from "express";
import dotenv from "dotenv";
import viewEngineConfig from "./config/viewEngineConfig";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectionDB from "./config/connectDB";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

viewEngineConfig(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connect db
connectionDB();

initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> Server is running on localhost: ", PORT);
});
