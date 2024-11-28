const sql = require("mssql");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" })); // Allow all origins

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const PORT = process.env.PORT || 8085;

var config = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  driver: process.env.driver,
  options: {
    encrypt: false,
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 49937,
};

// Database connection
sql.connect(config, function (err) {
  if (err) console.log("Database connection error:", err);
  else console.log("Connected to the database");
});

// About route
app.get("/about", function (req, res) {
  res.send("<p>About page</p>");
});

// Get records by Employer_Petitioner_Name
app.get("/:Employer_Petitioner_Name", (req, res) => {
  const employerName = req.params.Employer_Petitioner_Name;

  // SQL query with a parameter
  const query = `SELECT Fiscal_Year, Employer_Petitioner_Name, Initial_Approval, Initial_Denial FROM [exampledb].[dbo].[master_file] WHERE Employer_Petitioner_Name LIKE @Employer_Petitioner_Name`;

  // Execute query with parameter
  const sqlRequest = new sql.Request();
  sqlRequest.input("Employer_Petitioner_Name", sql.VarChar, `${employerName}%`); // Adding wildcard for partial match

  sqlRequest.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
    } else {
      res.json(result.recordset); // Send the result as JSON
    }
  });
});

// Start the server
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
