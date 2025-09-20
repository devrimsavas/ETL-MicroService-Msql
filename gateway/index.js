//gateway

const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

//for index html files
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

// for same css with other microservice i will add public/style
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error Loading page");
    } else {
      res.send(data);
    }
  });
});

app.use("/product", proxy("http://localhost:8001"));

app.use("/customer", proxy("http://localhost:8002"));

app.use("/management", proxy("http://localhost:8003"));
app.use("/management/js", proxy("http://localhost:8003/public/js"));

app.listen(8000, () => {
  console.log("Gateway is running on Port 8000");
});
