require("dotenv").config();
const express = require("express");

const app = express();

// middlewares
app.use(express.json());

//routers
app.use("/", require("./routers/get_list_router"));
app.use("/answer-url", require("./routers/answer_url_router"));
app.use("/event-url", require("./routers/event_url_router"));
app.use("/", require("./routers/get_customer_info_router"));
app.use('/', require('./routers/chatgpt_router'));

// server config
const PORT = process.env.port;
app.listen(PORT, async () => {
    try {
        console.log("Server is running at port: " + PORT);
    } catch (err) {
        console.log(err);
    }
});

