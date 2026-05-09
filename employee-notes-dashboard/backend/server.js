const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Atlas Connected"))
.catch((err) => console.log(err));

app.use("/api/notes", noteRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});