"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./config/databse");
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const categories_1 = __importDefault(require("./routes/categories"));
const products_1 = __importDefault(require("./routes/products"));
const cart_1 = __importDefault(require("./routes/cart"));
const cors_1 = __importDefault(require("cors"));
const swaggerConfig_1 = __importDefault(require("./config/swaggerConfig"));
const errorHandler_1 = require("./middlewear/errorHandler");
// import { Users } from "./models/Users";
// import { Categories } from "./models/category";
// import { Produtcs } from "./models/product";
// import { CartItems } from "./models/cartItem";
// import { brands } from "./models/brand";
const app = (0, express_1.default)();
const port = 3000;
app.use(errorHandler_1.errorHandler);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
(0, swaggerConfig_1.default)(app);
(() => __awaiter(void 0, void 0, void 0, function* () {
    // await Users.sync({alter:true});
    // await Categories.sync({alter:true});
    // await brands.sync({force:true});
    // await Produtcs.sync({alter:true})
    // await CartItems.sync({alter:true});
}))();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("App is listening on port 3000");
}));
app.use("/auth", auth_1.default);
app.use("/", users_1.default);
app.use("/categories", categories_1.default);
app.use("/products", products_1.default);
app.use("/cart", cart_1.default);
// app.use("/brands",brandAPIs)
app.listen(port, (error) => {
    if (!error) {
        console.log("App is listening on port 3000.");
    }
    else {
        console.log("Error occured during server connection: ", error);
    }
});
