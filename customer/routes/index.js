var express = require("express");
var router = express.Router();

var db = require("../models");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", {
    title: "Customer Service",
    greeting: "Welcome to Customer service",
  });
});

/* GET customers by last name prefix */
router.get("/:prefix", async function (req, res) {
  const prefix = req.params.prefix;

  try {
    // Raw SQL query to fetch customers with last names starting with the given prefix
    const result = await db.sequelize.query(
      `SELECT CustomerID, CompanyName,Title, FirstName, MiddleName,LastName, EmailAddress,ModifiedDate, Phone 
       FROM SalesLT.Customer
       WHERE LastName LIKE :prefix + '%'`,
      {
        replacements: { prefix: prefix }, // Securely replace the prefix in query
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render the results in the customers template
    res.render("customers", {
      title: "Customer List",
      customers: result,
      prefix: prefix,
    });
  } catch (error) {
    console.error("Error executing raw query:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

/* Demo route to test database connection with raw query */
router.get("/test-db", async function (req, res, next) {
  try {
    // Query to fetch basic customer data from SalesLT.Customer table
    const result = await db.sequelize.query(
      "SELECT TOP 10 CustomerID, Title, FirstName, LastName, EmailAddress, Phone FROM SalesLT.Customer",
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Sending the query result as JSON
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error executing raw query:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

module.exports = router;
