const express = require("express");
require("dotenv").config(); // ✅ Load .env
const app = express();
const cors = require("cors");
const conn = require("./conn/conn"); // ✅ DB connection
const auth = require("./routes/auth");
const list = require("./routes/list");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/v1", auth);
app.use("/api/v2", list);

// Connect to DB and start server
conn();

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
