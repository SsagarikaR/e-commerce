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


const app=express();
const port=3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
swaggerDocs(app);


//Rate limiting middleware
const limiter=rateLimit({
    windowMs:15 * 60 * 1000,
    max:100 ,
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

export default app;