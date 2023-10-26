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
        type: Number,
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
    const tshirtProduct = Men.find({ category: "T-shirt" });
    const shirtProduct = Men.find({ category: "Shirt" });
    const jacketProduct = Men.find({ category: "Jacket" });
    const undergarmentProduct = Men.find({ category: "Undergarments" });

    Promise.all([tshirtProduct, shirtProduct, jacketProduct, undergarmentProduct])
        .then(([tshirtProduct, shirtProduct, jacketProduct, undergarmentProduct]) => {
            res.render("mens.ejs", ({
                tshirtProduct,
                shirtProduct,
                jacketProduct,
                undergarmentProduct
            }));
        })
        .catch((err) => {
            console.log(err);
        })

});
app.get("/womens", (req, res) => {
    const suitsProduct = Women.find({ category: "Suits" });
    const sareeProduct = Women.find({ category: "Saree" });
    const dressProduct = Women.find({ category: "Dress" });
    const undergarmentProduct = Women.find({ category: "Undergarments" });

    Promise.all([suitsProduct, sareeProduct, dressProduct, undergarmentProduct])
        .then(([suitsProduct, sareeProduct, dressProduct, undergarmentProduct]) => {
            res.render("womens.ejs", ({
                suitsProduct,
                sareeProduct,
                dressProduct,
                undergarmentProduct
            }));
        })
        .catch((err) => {
            console.log(err);
        })

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
    const menProduct = Men.find({}).exec();
    const womenProduct = Women.find({}).exec();
    const kidProduct = Kid.find({}).exec();
    const footwearProduct = Footwear.find({}).exec();

    Promise.all([menProduct, womenProduct, kidProduct, footwearProduct])
        .then(([menProduct, womenProduct, kidProduct, footwearProduct]) => {
            res.render("product.ejs", {
                mens: menProduct,
                womens: womenProduct,
                kids: kidProduct,
                footwears: footwearProduct
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });

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

});

app.post("/addwomen", upload.single("image"), (req, res) => {
    const productName = req.body["productName"];
    const description = req.body["productDescription"];
    const productPrice = req.body["productPrice"];
    const productCategory = req.body["productCategory"];
    const productRating = req.body["productRating"];
    const file = req.file.filename;

    const women = new Women({
        name: productName,
        description: description,
        price: productPrice,
        category: productCategory,
        rating: productRating,
        imagePath: file
    });

    women.save()
        .then(() => {
            console.log("Saved");
        })
        .catch((err) => {
            console.log(err);
        })
    res.redirect("/product")

});

app.post("/addkid", upload.single("image"), (req, res) => {
    const productName = req.body["productName"];
    const description = req.body["productDescription"];
    const productPrice = req.body["productPrice"];
    const productCategory = req.body["productCategory"];
    const productRating = req.body["productRating"];
    const file = req.file.filename;

    const kid = new Kid({
        name: productName,
        description: description,
        price: productPrice,
        category: productCategory,
        rating: productRating,
        imagePath: file
    });

    kid.save()
        .then(() => {
            console.log("Saved");
        })
        .catch((err) => {
            console.log(err);
        })
    res.redirect("/product")

});

app.post("/addfootwear", upload.single("image"), (req, res) => {
    const productName = req.body["productName"];
    const description = req.body["productDescription"];
    const productPrice = req.body["productPrice"];
    const productCategory = req.body["productCategory"];
    const productRating = req.body["productRating"];
    const file = req.file.filename;

    const footwear = new Footwear({
        name: productName,
        description: description,
        price: productPrice,
        category: productCategory,
        rating: productRating,
        imagePath: file
    });

    footwear.save()
        .then(() => {
            console.log("Saved");
        })
        .catch((err) => {
            console.log(err);
        })
    res.redirect("/product")

});











app.listen(port, () => {
    console.log(`Server Started Successfully on Port ${port}`);
})