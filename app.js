import bodyParser from "body-parser";
import express from "express";
import mongoose, { Mongoose } from "mongoose";
import multer from "multer";
import Razorpay from 'razorpay';
// import { createOrder } from './controllers/paymentController.js';




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

// Order Schema 

// Define a schema for the order form
const orderSchema = new mongoose.Schema({
    size: {
        type: String, // Should be 'S', 'M', 'L', 'XL', or 'XXL'
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    productid: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    productprice: {
        type: String,
        required: true
    }
});

// Create a model for the order schema
const Order = mongoose.model('Order', orderSchema);

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
    const tshirtProduct = Kid.find({ category: "T-shirt" });
    const shirtProduct = Kid.find({ category: "Shirt" });
    const ethenicProduct = Kid.find({ category: "Ethenic Wear" });
    const undergarmentProduct = Kid.find({ category: "Undergarments" });

    Promise.all([tshirtProduct, shirtProduct, ethenicProduct, undergarmentProduct])
        .then(([tshirtProduct, shirtProduct, ethenicProduct, undergarmentProduct]) => {
            res.render("kids.ejs", ({
                tshirtProduct,
                shirtProduct,
                ethenicProduct,
                undergarmentProduct
            }));
        })
        .catch((err) => {
            console.log(err);
        })
});
app.get("/footwear", (req, res) => {
    const casualShoe = Footwear.find({ category: "Casual Shoes" });
    const sportShoe = Footwear.find({ category: "Sports Shoes" });
    const sneakerShoe = Footwear.find({ category: "Sneakers" });
    const heelShoe = Footwear.find({ category: "Heels" });
    const bootShoe = Footwear.find({ category: "Boots" });

    Promise.all([casualShoe, sportShoe, sneakerShoe, heelShoe, bootShoe])
        .then(([casualShoe, sportShoe, sneakerShoe, heelShoe, bootShoe]) => {
            res.render("footwear.ejs", ({
                casualShoe,
                sportShoe,
                sneakerShoe,
                heelShoe,
                bootShoe
            }));
        })
        .catch((err) => {
            console.log(err);
        })
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



app.get("/mens/:mensId", (req, res) => {
    const requestedMensId = req.params.mensId;

    if (!mongoose.Types.ObjectId.isValid(requestedMensId)) {
        return res.status(400).send("Invalid mensId parameter");
    }

    Men.findOne({ _id: requestedMensId }).then((mens) => {
        res.render("menorder.ejs", {
            id: mens._id,
            name: mens.name,
            description: mens.description,
            price: mens.price,
            imagePath: mens.imagePath,
            rating: mens.rating,
            category: mens.category
        });


    });
});

app.get("/womens/:womensId", (req, res) => {
    const requestedWomensId = req.params.womensId;

    // Validate the mensId parameter
    if (!mongoose.Types.ObjectId.isValid(requestedWomensId)) {
        return res.status(400).send("Invalid mensId parameter");
    }

    // Find women object by id
    Women.findOne({ _id: requestedWomensId }).then((womens) => {
        res.render("womenorder.ejs", {
            id: womens._id,
            name: womens.name,
            description: womens.description,
            price: womens.price,
            imagePath: womens.imagePath,
            rating: womens.rating,
            category: womens.category
        });
    });
});

app.get("/kids/:kidsId", (req, res) => {
    const requestedKidsId = req.params.kidsId;

    // Validate the mensId parameter
    if (!mongoose.Types.ObjectId.isValid(requestedKidsId)) {
        return res.status(400).send("Invalid mensId parameter");
    }

    // Find women object by id
    Kid.findOne({ _id: requestedKidsId }).then((kids) => {
        res.render("kidsorder.ejs", {
            id: kids._id,
            name: kids.name,
            description: kids.description,
            price: kids.price,
            imagePath: kids.imagePath,
            rating: kids.rating,
            category: kids.category
        });
    });
});

app.get("/footwears/:footwearsId", (req, res) => {
    const requestedfootwearsId = req.params.footwearsId;

    // Validate the mensId parameter
    if (!mongoose.Types.ObjectId.isValid(requestedfootwearsId)) {
        return res.status(400).send("Invalid mensId parameter");
    }

    // Find women object by id
    Footwear.findOne({ _id: requestedfootwearsId }).then((footwears) => {
        res.render("footwearorder.ejs", {
            id: footwears._id,
            name: footwears.name,
            description: footwears.description,
            price: footwears.price,
            imagePath: footwears.imagePath,
            rating: footwears.rating,
            category: footwears.category
        });
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

    Order.find({})
        .then((orders) => {
            res.render("order.ejs", { orders })
        });
});

app.get("/customers", (req, res) => {
    Order.find({})
        .then((orders) => {
            res.render("customers.ejs", { orders })
        });
});
app.get("/adminprofile", (req, res) => {
    res.render("adminprofile.ejs");
});
app.get("/editadmin", (req, res) => {
    res.render("editadmin.ejs");
});
app.get("/ordersucces", (req, res) => {
    res.render("ordersucces.ejs");
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

// Admin Form Data 
// app.get("/editadmin", (req, res) => {
//     const firstname = req.body[first_name];
//     const lastname = req.body[last_name];
//     const email = req.body[email];
//     const mobile = req.body[mobile];
//     const companyname = req.body[company_name];
//     const working_email = req.body[workking_email];
//     const pancard = req.body[pan_card];
//     const streetaddress = req.body[street_address];
//     const city = req.body[city];
//     const state = req.body[state];
//     const country = req.body[country];
//     const pincode = req.body[pincode];
//     const image = req.file.filename;



// })




app.post('/checkout', (req, res) => {
    // Create a new order using the Mongoose model and request body
    const size = req.body["size"];
    const firstName = req.body["firstName"];
    const lastName = req.body["lastName"];
    const mobileNumber = req.body["mobileNumber"];
    const email = req.body["email"];
    const street = req.body["street"];
    const city = req.body["city"];
    const state = req.body["state"];
    const pincode = req.body["pincode"];
    const productid = req.body["productid"];
    const productname = req.body["productname"];
    const productprice = req.body["productprice"];

    const order = new Order({
        size: size,
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        email: email,
        street: street,
        city: city,
        state: state,
        pincode: pincode,
        productid: productid,
        productname: productname,
        productprice: productprice
    });
    order.save()
        .then(() => {
            console.log("Data Saved")
        })
        .catch((err) => {
            console.log(err);
        })
    res.redirect("/ordersucces");
});



app.listen(port, () => {
    console.log(`Server Started Successfully on Port ${port}`);
})