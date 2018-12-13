const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "projectuser",
  password: "",
  database: "real_estates"
});

module.exports = dbConnection;
