const express = require("express");
const app = express();
require("./conn/conn");
const cors = require("cors");
const auth = require("./routes/auth");
const list = require("./routes/list");
const path = require("path");
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
   // res.send("Hello");
   app.use(express.static(path.resolve(__dirname,"frontend","dist")));
   res.sendFile(path.resolve(__dirname,"frontend", "dist","index.html"));
});


app.use("/api/v1",auth);
app.use("/api/v2",list);

module.exports = app;
