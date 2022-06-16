const express = require("express");
const cors = require("cors");
const db = require("./config/db.config");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const productsRoutes = require("./routes/products.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();

app.use("/uploads", express.static("uploads")); // set uploads folder to public (static)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build")));

// connect to database
// db.connect((err) => {
//   if (err) {
//     console.error("error connecting: " + err);
//     return;
//   }
//   console.log("Successfully connected to SQL database!");
// });

// db.on('acquire', function (connection) {
//   console.log('Connection %d acquired', connection.threadId);
// });
// db.on('release', function (connection) {
//   console.log('Connection %d released', connection.threadId);
// });

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

// app.get("/", (req, res) => {
//   res.send(
//     "<h2>Welcome to my Node.js server. Go to /products to check products list.</h2>"
//   );
// });

//
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
