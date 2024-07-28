import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;
  // check token is exist
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }
  try {
    
    const token = authToken.split(" ")[1];
    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decode.id;
    req.role = decode.role;
    // console.log(decode)
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};
export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user;
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);
  patient ? (user = patient) : (user = doctor);
  // console.log(roles, "testing", user, !roles.includes(user.role));
  if (!roles.includes(user.role)) {
    return res
      .status(402)
      .json({ success: false, message: "You are not authorized" });
  } else {
    // console.log("working");
  }
  next();
};
