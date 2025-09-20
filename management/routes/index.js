var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/querya", async (req, res, next) => {
  let queryA = []; // Initialize as an empty array

  try {
    // Execute the raw SQL query and populate queryA array
    queryA = await db.sequelize.query(
      `SELECT DISTINCT ProductCategoryID, Name 
       FROM SalesLT.ProductCategory 
       WHERE ParentProductCategoryID IS NULL 
       ORDER BY Name ASC;`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render the query results in the view
    res.render("querya", { query: queryA });
  } catch (error) {
    console.error("Error executing query for Query A:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

router.get("/queryb", async (req, res, next) => {
  let query = []; // Initialize as an empty array

  try {
    // Execute the raw SQL query
    query = await db.sequelize.query(
      `SELECT 
         c.Name AS CategoryName, 
         AVG(p.ListPrice) AS AveragePrice
       FROM 
         SalesLT.Product AS p
       JOIN 
         SalesLT.ProductCategory AS c 
       ON 
         p.ProductCategoryID = c.ProductCategoryID
       GROUP BY 
         c.Name
       ORDER BY 
         AveragePrice DESC;`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render results in queryb view
    res.render("queryb", { query: query });
  } catch (error) {
    console.error("Error executing query for Query B:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

router.get("/queryc", async (req, res, next) => {
  let query = []; // Initialize as an empty array

  try {
    // Execute the updated SQL query
    query = await db.sequelize.query(
      `SELECT 
         parent.Name AS ParentCategoryName,
         AVG(p.ListPrice) AS AveragePrice
       FROM 
         SalesLT.Product AS p
       JOIN 
         SalesLT.ProductCategory AS category 
       ON 
         p.ProductCategoryID = category.ProductCategoryID
       JOIN 
         SalesLT.ProductCategory AS parent 
       ON 
         category.ParentProductCategoryID = parent.ProductCategoryID
       GROUP BY 
         parent.Name
       ORDER BY 
         AveragePrice ASC;`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render results in queryc view
    res.render("queryc", { query: query });
  } catch (error) {
    console.error("Error executing query for Query C:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

router.get("/queryd", async (req, res, next) => {
  let query = [{ Total: 0 }]; // Initialize with 0 in case of no results

  try {
    // Execute the SQL query
    query = await db.sequelize.query(
      `SELECT COUNT(DISTINCT CustomerID) AS Total
       FROM SalesLT.SalesOrderHeader
       WHERE OrderDate BETWEEN '2008-06-01' AND '2008-06-15';`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render results in queryd view
    res.render("queryd", { query: query[0] });
  } catch (error) {
    console.error("Error executing query for Query D:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

router.get("/querye", async (req, res, next) => {
  //here i saw first repeating names in table and i changed to distinct. ask it
  let query = []; // Initialize as an empty array

  try {
    // Execute the SQL query using INTERSECT
    query = await db.sequelize.query(
      `SELECT DISTINCT CustomerID, FirstName, LastName
       FROM SalesLT.Customer
       WHERE FirstName LIKE 'A%'
       
       INTERSECT
       
       SELECT DISTINCT CustomerID, FirstName, LastName
       FROM SalesLT.Customer
       WHERE LastName LIKE '%e';`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render results in querye view
    res.render("querye", { query: query });
  } catch (error) {
    console.error("Error executing query for Query E:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

router.get("/queryf", async (req, res, next) => {
  let query = []; // Initialize as an empty array

  try {
    // Execute the verified SQL query
    query = await db.sequelize.query(
      `SELECT
          c.Title,
          c.FirstName,
          c.MiddleName,
          c.LastName,
          c.CompanyName,
          a.City,
          a.StateProvince,
          a.CountryRegion
       FROM
          SalesLT.Customer AS c
       JOIN
          SalesLT.CustomerAddress AS ca ON c.CustomerID = ca.CustomerID
       JOIN
          SalesLT.Address AS a ON ca.AddressID = a.AddressID;`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render the results in the designated EJS view
    res.render("queryf", { query: query });
  } catch (error) {
    console.error("Error executing query for Query F:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

router.get("/queryg", async (req, res, next) => {
  let query = []; // Initialize as an empty array

  try {
    // Execute the SQL query with aligned naming for the EJS template
    query = await db.sequelize.query(
      `SELECT
          p.ProductNumber,
          pm.Name AS Name,
          p.Color
       FROM
          SalesLT.Product AS p
       JOIN
          SalesLT.ProductModel AS pm ON p.ProductModelID = pm.ProductModelID
       WHERE
          p.Color IS NOT NULL;`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render results in the "queryg" view
    res.render("queryg", { query: query });
  } catch (error) {
    console.error("Error executing query for Query G:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

router.get("/queryh", async (req, res, next) => {
  let query = []; // Initialize as an empty array

  try {
    // Execute the SQL query for Query H
    query = await db.sequelize.query(
      `SELECT
          p.Name AS Name,
          sod.UnitPrice,
          sod.OrderQty,
          sod.LineTotal
       FROM
          SalesLT.SalesOrderDetail AS sod
       JOIN
          SalesLT.Product AS p ON sod.ProductID = p.ProductID;`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // Render results in the "queryh" view
    res.render("queryh", { query: query });
  } catch (error) {
    console.error("Error executing query for Query H:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: error.message,
    });
  }
});

//main page

router.get("/", async (req, res, next) => {
  //get basepath
  //const basePath = req.originalUrl.includes("/management") ? "/management" : "";
  //console.log(`original basePath is ${basePath}`);

  let options = [
    {
      name: "Query A",
      link: "/querya",
      description: "Display the table results for Query A",
    },
    {
      name: "Query B",
      link: "/queryb",
      description: "Display the table results for Query B",
    },
    {
      name: "Query C",
      link: "/queryc",
      description: "Display the table results for Query C",
    },
    {
      name: "Query D",
      link: "/queryd",
      description: "Display the table results for Query D",
    },
    {
      name: "Query E",
      link: "/querye",
      description: "Display the table results for Query E",
    },
    {
      name: "Query F",
      link: "/queryf",
      description: "Query result for PowerBI visualization",
    },
    {
      name: "Query G",
      link: "/queryg",
      description: "Query result for PowerBI visualization",
    },
    {
      name: "Query H",
      link: "/queryh",
      description: "Query result for PowerBI visualization",
    },
  ];

  res.render("index", { options: options });
});

module.exports = router;
