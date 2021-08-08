import express from "express";
import cors from "cors";
import {
  USER,
  PWD,
  HOST,
  PORT as _PORT,
  AUTH_LINE,
  DB,
} from "./config/db.config.js";
const app = express();
import initial from "./utils/db-initial";
import db from "./models/index.js";
const Role = db.role;
db.mongoose
  .connect(`mongodb://${USER}:${PWD}@${HOST}:${_PORT}/${DB}${AUTH_LINE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao mongo");
    initial(Role);
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:7777",
  origin: "http://localhost:3000",
};

app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  express.json({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tweeze Accounts application." });
});
// routes
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import elkRoutes from "./routes/elk.routes.js";
// import wordsRoutes from "./routes/words.routes.js";
import routes from "./routes";

// authRoutes(app);
// userRoutes(app);
// elkRoutes(app);
routes(app);

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Tweeze Accounts is running on port ${PORT}.`);
});
