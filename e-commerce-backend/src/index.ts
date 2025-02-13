import express,{Request,Response} from "express";
import bodyParser from "body-parser";
import "./config/databse";
import authAPIs from "./routes/auth";
import userAPIs from "./routes/users";
import categoriesAPIs from "./routes/categories";
import productAPIs from "./routes/products";
import cartAPIs from "./routes/cart";

import { errorHandler } from "./config/errorHandler";

// import { Users } from "./models/Users";
// import { Categories } from "./models/category";
// import { Produtcs } from "./models/product";
// import { CartItems } from "./models/CartItems";

const app=express();
const port=3000

app.use(errorHandler);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

(async()=>{
    // await Users.sync({alter:true});
    // await Categories.sync({alter:true});
    // await Produtcs.sync({alter:true})
    // await CartItems.sync({alter:true});
})();

app.get("/",async(req:Request,res:Response)=>{
    res.send("App is listening on port 3000");
});

app.use("/auth",authAPIs);
app.use("/users",userAPIs);
app.use("/categories",categoriesAPIs);
app.use("/products",productAPIs);
app.use("/cart",cartAPIs);

app.listen(port,(error)=>{
    if(!error){
        console.log("App is listening on port 3000.")
    }
    else{
        console.log("Error occured during server connection: ",error);
    }
});