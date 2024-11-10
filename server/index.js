const express = require("express");
require("dotenv").config();
const dbConnect = require("./utils/database.connect");
const initialRoutes = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
const PORT = 5000 || 8888;
const data = require("./data/ecommerce.json");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.URL_CLIENT,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dbConnect();
initialRoutes(app);

app.use("/", (req, res) => {
  res.send("server on");
});

app.listen(PORT, () => {
  console.log(`http://localhoast:${PORT}`);
});
