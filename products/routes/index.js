var express = require("express");
var db = require("../models");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Product",
    greeting: "Welcome to Product service",
  });
});

/* Demo route to test database connection with raw query */
router.get("/test-db", async function (req, res, next) {
  try {
    // Example raw query to fetch data from a table, modify the table name accordingly
    const result = await db.sequelize.query(
      "SELECT TOP 10 * FROM SalesLT.Product",
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

/* Product details endpoint */

router.get("/:id", async function (req, res) {
  const productId = req.params.id;

  try {
    const result = await db.sequelize.query(
      `SELECT 
          ProductID, 
          Name AS ProductName, 
          (SELECT Name FROM SalesLT.ProductModel WHERE ProductModelID = P.ProductModelID) AS ProductModel,
          (SELECT Name FROM SalesLT.ProductCategory WHERE ProductCategoryID = P.ProductCategoryID) AS ProductCategory,
          Color, 
          Size, 
          Weight, 
          ListPrice, 
          SellStartDate
       FROM SalesLT.Product AS P
       WHERE ProductID = :productId`,
      {
        replacements: { productId: productId },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    if (result.length === 0) {
      // Send 404 status and render the "Product not found" message in the same template
      return res
        .status(404)
        .render("product", { title: "Product Details", product: null });
    }

    const product = result[0];
    product.SellStartDate = new Date(product.SellStartDate).toLocaleDateString(
      "en-GB"
    );

    // Render product details if the product is found
    res.render("product", { title: "Product Details", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .render("error", { message: "Internal server error", error: {} });
  }
});

module.exports = router;
