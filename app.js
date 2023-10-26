import bodyParser from "body-parser";
import express from "express";
import mongoose, { Mongoose } from "mongoose";
import multer from "multer";


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));



// Image Upload

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage,
});

// Mongoose Connection 

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB")
    .then(() => {
        console.log("Database Created Successfully");
    })
    .catch((err) => {
        console.log(err);
    });

const menproductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
});
const Men = mongoose.model("Men", menproductSchema);

const womenproductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
});
const Women = mongoose.model("Women", womenproductSchema);

const kidproductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
});
const Kid = mongoose.model("Kid", kidproductSchema);

const footwearproductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
});
const Footwear = mongoose.model("Footwear", footwearproductSchema);



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
// Add Product 

app.get("/addmen", (req, res) => {
    res.render("addmen.ejs");
});
app.get("/addwomen", (req, res) => {
    res.render("addwomen.ejs");
});
app.get("/addkid", (req, res) => {
    res.render("addkid.ejs");
});
app.get("/addfootwear", (req, res) => {
    res.render("addfootwear.ejs");
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


// Post Route 

app.post("/addmen", upload.single("image"), (req, res) => {
    const productName = req.body["productName"];
    const description = req.body["productDescription"];
    const productPrice = req.body["productPrice"];
    const productCategory = req.body["productCategory"];
    const productRating = req.body["productRating"];
    const file = req.file.filename;

    const men = new Men({
        name: productName,
        description: description,
        price: productPrice,
        category: productCategory,
        rating: productRating,
        imagePath: file
    });

    men.save()
        .then(() => {
            console.log("Saved");
        })
        .catch((err) => {
            console.log(err);
        })
    res.redirect("/product")

})












app.listen(port, () => {
    console.log(`Server Started Successfully on Port ${port}`);
})