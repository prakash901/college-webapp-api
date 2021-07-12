const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/user");
const blogsRoute = require("./routes/blogs");
const eventRoute = require("./routes/events");
const messageRoute = require("./routes/message");
const noticeRoute = require("./routes/notice");

app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/blogs", blogsRoute);
app.use("/events", eventRoute);
app.use("/messages", messageRoute);
app.use("/notices", noticeRoute);
module.exports = app;
