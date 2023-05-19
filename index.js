const express = require("express");
const router = require("./routes/route");
const connectDB = require("./connection/connection");
require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());
app.use("/api/v3/app", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
