import mongoose from "mongoose";
import pkg from "mongoose";
const { Promise } = pkg;
const db = {};
import User from "./user.model.js";
import Role from "./role.model.js";
import Words from "./words.model.js";
db.mongoose = mongoose;
db.user = User;
db.role = Role;
db.words = Words;
// db.user = require("./user.model").default;
// db.role = require("./role.model").default;
mongoose.set("useFindAndModify", false);

db.ROLES = ["user", "admin", "moderator"];

export default db;
