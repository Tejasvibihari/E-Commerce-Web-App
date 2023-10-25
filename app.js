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
app.get("/seller", (req, res) => {
    res.render("seller.ejs");
});

app.listen(port, () => {
    console.log(`Server Started Successfully on Port ${port}`);
})