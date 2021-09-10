const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const userRoute = require("./routes/user");
const blogsRoute = require("./routes/blogs");
const eventRoute = require("./routes/events");
const messageRoute = require("./routes/message");
const noticeRoute = require("./routes/notice");
const galleryRoute = require("./routes/gallery");

app.use(cors({ origin: "*" }));
// app.use(cors());

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/user", userRoute);
app.use("/blogs", blogsRoute);
app.use("/events", eventRoute);
app.use("/messages", messageRoute);
app.use("/notices", noticeRoute);
app.use("/gallery", galleryRoute);
module.exports = app;
