const sequelize = require('./connection');
const userRoute = require("./routes/user.route");
const express = require("express");
const cors = require("cors");
const authenticationMiddleware = require("./middlewares/auth")
const app = express();
app.use(cors());
app.use(express.json());
app.use(authenticationMiddleware);

app.use("/api", userRoute);

async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
checkConnection();

app.listen(3000, console.log("listening on port 3000"));