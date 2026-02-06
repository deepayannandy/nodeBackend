import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  mobile: {
    type: String,
    require: true,
    trim: true,
  },
  role: {
    type: String,
    require: true,
    enum: ["superAdmin", "admin", "customer", "supplier"],
  },
  password: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: false,
  },
});
