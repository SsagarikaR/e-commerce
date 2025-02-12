import express,{Request,Response} from "express";
import bodyParser from "body-parser";
import "./config/databse"
import { Users } from "./models/Users";
import { Categories } from "./models/Categories";
import { Produtcs } from "./models/Products";
import { CartItems } from "./models/CartItems";

const app=express();
const port=3000

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
})

app.listen(port,(error)=>{
    if(!error){
        console.log("App is listening on port 3000.")
    }
    else{
        console.log("Error occured during server connection: ",error);
    }
})