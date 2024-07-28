import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Route/auth.js";
import userRoute from "./Route/user.js";
import doctorRoute from "./Route/doctor.js";
import reviewRoute from './Route/review.js'
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
};
app.get("/", (req, res) => {
  res.send("api working");
});
//database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("data base connected");
  } catch (error) {
    console.log("monooDB connection failed", error);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews",reviewRoute );

app.listen(port, () => {
  connectDB();
  console.log("server running at port " + port);
});
