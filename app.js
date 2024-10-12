require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const post_routes = require("./routes/posts");
const user_routes = require("./routes/user");
const animal_post_routes = require("./routes/animalPost")
const crop_post_routes = require("./routes/cropPost")
const language_router=require("./routes/language");
const message_router=require("./routes/sms");
const i18next=require('./config/i18n');
const i18nextMiddleware = require('i18next-http-middleware');
const app = express()
const cors = require('cors');

const PORT = process.env.PORT || 5000;


// Middleware to parse JSON
// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(i18nextMiddleware.handle(i18next));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello From pashu Panta Backend")
})

app.use("/api/posts", post_routes)
app.use("/api/user", user_routes)
app.use("/api/animal", animal_post_routes)
app.use("/api/crop", crop_post_routes)
app.use('/language', language_router)
app.use("/sms",message_router)

app.listen(PORT, () => {
    connectDB(process.env.MONGO_URL);
    console.log(`Listening on Port ${PORT}`);
})