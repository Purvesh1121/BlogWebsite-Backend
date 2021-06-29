require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });
//   Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//  Route Middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);

// PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
