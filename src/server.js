import express from "express";
import dotenv from "dotenv";
import viewEngineConfig from "./config/viewEngineConfig";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import connectionDB from "./config/connectDB";
import configCORS from "./config/configCORS";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

configCORS(app);

viewEngineConfig(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//test connect db
connectionDB();

initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.render("404.ejs");
});

app.listen(PORT, () => {
    console.log(">>> Server is running on localhost: ", PORT);
});
