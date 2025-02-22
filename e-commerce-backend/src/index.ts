import express,{Request,Response} from "express";
import bodyParser from "body-parser";
import "./config/databse";
import authAPIs from "./routes/auth";
import userAPIs from "./routes/users";
import categoriesAPIs from "./routes/categories";
import productAPIs from "./routes/products";
import cartAPIs from "./routes/carts";
import adminAPIs from "./routes/admins";
import brandAPIs from "./routes/brands"
import wishListAPIs from "./routes/wishLists";
import reviewAPIs from "./routes/reviews";
import prefernceAPIs from "./routes/prefernces"
import orderAPIs from "./routes/orders";
import cors from "cors";
import swaggerDocs  from "./config/swaggerConfig";
import errorHandler from "./middlewear/errorHandler";
import rateLimit from "express-rate-limit";

// import { Users } from "./models/users";
// import { Categories } from "./models/category";
// import { Produtcs } from "./models/product";
// import { CartItems } from "./models/cartItem";
// import { Brands } from "./models/brand";
// import { Admins } from "./models/admin";
// import { WishLists } from "./models/wishList";
// import { Reviews } from "./models/Review";
// import { Preferences } from "./models/preference";

const app=express();
const port=3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
swaggerDocs(app);

(async()=>{
    // await Users.sync({alter:true});
    // await Categories.sync({alter:true});
    //  await Produtcs.sync({alter:true})
    // await Brands.sync({alter:true});
    // await CartItems.sync({alter:true});
    // await Admins.sync({force:true});
    // await WishLists.sync({force:true});
    // await Reviews.sync({force:true});
    // await Preferences.sync({force:true})
})();

//Rate limiting middleware
const limiter=rateLimit({
    windowMs:15 * 60 * 1000,//15 minutes
    max:100 , //maximum 100 requests per window
})

app.get("/",async(req:Request,res:Response)=>{
    res.send("App is listening on port 3000");
});

app.use("/auth",authAPIs);
app.use("/",userAPIs);
app.use("/categories",categoriesAPIs);
app.use("/products",productAPIs);
app.use("/cart",cartAPIs);
app.use("/admins",adminAPIs);
app.use("/brands",brandAPIs)
app.use("/wishlist",wishListAPIs);
app.use("/reviews",reviewAPIs);
app.use("/prefernces",prefernceAPIs);
app.use("/orders",orderAPIs);

app.use(errorHandler);
app.use(limiter);

app.listen(port,(error)=>{
    if(!error){
        console.log("App is listening on port 3000.")
    }
    else{
        console.log("Error occured during server connection: ",error);
    }
});