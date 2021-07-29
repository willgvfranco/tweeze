import mongoose from "mongoose";
const Words = mongoose.model(
  "Words",
  new mongoose.Schema({
    name: String,
    pos: String,
    neg: String,
  })
);

export default Words;
