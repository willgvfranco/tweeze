require("dotenv").config();

export const USER = "tweezeauth";
export const PWD = "admin777";
export const HOST = process.env.DB_HOST;
// export const HOST = "mongo";
export const PORT = process.env.DB_PORT;
// export const PORT = 27017;
export const AUTH_LINE =
  "?authSource=admin&readPreference=primary&appname=tweeze_accounts&directConnection=true&ssl=false";
export const DB = "tweeze_accounts";
