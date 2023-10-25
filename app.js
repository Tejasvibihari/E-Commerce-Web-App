import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";





const app = express();
const port = 3000;


app.use(express.static("public"));
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.get("/mens", (req, res) => {
    res.render("mens.ejs");
});
app.get("/womens", (req, res) => {
    res.render("womens.ejs");
});
app.get("/kids", (req, res) => {
    res.render("kids.ejs");
});
app.get("/footwear", (req, res) => {
    res.render("footwear.ejs");
});


// Admin Route 

app.get("/seller", (req, res) => {
    res.render("seller.ejs");
});
app.get("/dashboard", (req, res) => {
    res.render("seller.ejs");
});
app.get("/product", (req, res) => {
    res.render("product.ejs");
});
app.get("/order", (req, res) => {
    res.render("order.ejs");
});
app.get("/customers", (req, res) => {
    res.render("customers.ejs");
});
app.get("/adminprofile", (req, res) => {
    res.render("adminprofile.ejs");
});













app.listen(port, () => {
    console.log(`Server Started Successfully on Port ${port}`);
})