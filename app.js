require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const post_routes = require("./routes/posts");
const user_routes = require("./routes/user");
const app = express()

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello From pashu Panta Backend")
})

app.use("/api/posts", post_routes)
app.use("/api/user",user_routes)

app.listen(PORT, () => {
    connectDB(process.env.MONGO_URL);
    console.log(`Listening on Port ${PORT}`);
})