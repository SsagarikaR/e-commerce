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
const carts_1 = __importDefault(require("./routes/carts"));
const admins_1 = __importDefault(require("./routes/admins"));
const brands_1 = __importDefault(require("./routes/brands"));
const wishLists_1 = __importDefault(require("./routes/wishLists"));
const reviews_1 = __importDefault(require("./routes/reviews"));
const prefernces_1 = __importDefault(require("./routes/prefernces"));
const orders_1 = __importDefault(require("./routes/orders"));
const cors_1 = __importDefault(require("cors"));
const swaggerConfig_1 = __importDefault(require("./config/swaggerConfig"));
const errorHandler_1 = __importDefault(require("./middlewear/errorHandler"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
(0, swaggerConfig_1.default)(app);
//Rate limiting middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("App is listening on port 3000");
}));
app.use("/auth", auth_1.default);
app.use("/", users_1.default);
app.use("/categories", categories_1.default);
app.use("/products", products_1.default);
app.use("/cart", carts_1.default);
app.use("/admins", admins_1.default);
app.use("/brands", brands_1.default);
app.use("/wishlist", wishLists_1.default);
app.use("/reviews", reviews_1.default);
app.use("/prefernces", prefernces_1.default);
app.use("/orders", orders_1.default);
app.use(errorHandler_1.default);
app.use(limiter);
app.listen(port, (error) => {
    if (!error) {
        console.log("App is listening on port 3000.");
    }
    else {
        console.log("Error occured during server connection: ", error);
    }
});
exports.default = app;
