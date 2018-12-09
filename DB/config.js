const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "projectuser",
  password: "",
  database: "real_estates"
});

dbConnection.connect(function(err) {
  if (err != null) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + dbConnection.threadId);
});
module.exports = dbConnection;
