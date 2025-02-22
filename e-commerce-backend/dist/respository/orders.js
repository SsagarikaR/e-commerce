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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStatusByIdQuery = exports.updateOrderAddressQuery = exports.updateOrderStatusQuery = exports.deleteOrderQuery = exports.selectOrdersWithProductAndBrand = exports.getUserOrderDetails = exports.selectOrderByUserID = exports.insertOrderItems = exports.insertOrder = void 0;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const insertOrder = (userID, totalAmount, address, t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield databse_1.sequelize.query(`INSERT INTO Orders (userId, totalAmount, status, address) 
      VALUES (:userId, :totalAmount, 'Pending', :address)`, {
            replacements: { userId: userID, totalAmount, address },
            type: sequelize_1.QueryTypes.INSERT,
            transaction: t, // Pass the transaction object here
        });
        return { orderID: result }; // Return orderID or the entire result depending on your table design
    }
    catch (error) {
        console.log('Error inserting order:', error);
        throw new Error('Error while inserting order');
    }
});
exports.insertOrder = insertOrder;
const insertOrderItems = (orderID, productId, quantity, price, t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield databse_1.sequelize.query(`INSERT INTO OrderItems (orderId, productId, quantity, price) 
        VALUES (:orderID, :productId, :quantity, :price)`, {
            replacements: { orderID, productId, quantity, price },
            type: sequelize_1.QueryTypes.INSERT,
            transaction: t,
        });
    }
    catch (error) {
        console.log('Error inserting order item:', error);
        throw new Error('Error while inserting order item');
    }
});
exports.insertOrderItems = insertOrderItems;
const selectOrderByUserID = (userID, t) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield databse_1.sequelize.query(`SELECT * FROM Orders WHERE userId = :userID AND status = 'Pending'`, {
            replacements: { userID },
            type: sequelize_1.QueryTypes.SELECT,
            transaction: t,
        });
    }
    catch (error) {
        console.log('Error selecting order by user ID:', error);
        throw new Error('Error while selecting order by user ID');
    }
});
exports.selectOrderByUserID = selectOrderByUserID;
// First: Get orders (Order[] type)
const getOrders = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
      SELECT orderID, userId, totalAmount, status, address
      FROM Orders
      WHERE userId = :userID 
    `;
    const result = yield databse_1.sequelize.query(query, {
        replacements: { userID },
        type: sequelize_1.QueryTypes.SELECT,
    });
    return result;
});
// Second: Get order items for each order (OrderItem[] type)
const getOrderItems = (orderIDs) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT oi.orderId, oi.productId, oi.quantity, oi.price, p.productName, p.productThumbnail, p.productPrice, b.brandName
    FROM OrderItems oi
    JOIN Products p ON oi.productId = p.productID
    JOIN Brands b ON p.brandID = b.brandID
    WHERE oi.orderId IN (?)
  `;
    const result = yield databse_1.sequelize.query(query, {
        replacements: [orderIDs],
        type: sequelize_1.QueryTypes.SELECT,
    });
    return result;
});
// Combine order and items (OrderDetail[] type)
const getUserOrderDetails = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield getOrders(userID);
    console.log(orders);
    const orderIDs = orders.map((order) => order.orderID);
    console.log(orderIDs, "order id");
    const orderItems = yield getOrderItems(orderIDs);
    // Combine the results
    const orderDetails = orders.map((order) => (Object.assign(Object.assign({}, order), { items: orderItems.filter((item) => item.orderId === order.orderID) })));
    return orderDetails;
});
exports.getUserOrderDetails = getUserOrderDetails;
const selectOrdersWithProductAndBrand = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT 
          o.orderID,
          o.userId,
          o.totalAmount,
          o.status,
          o.address,
          oi.productId,
          oi.quantity,
          oi.price,
          p.productName,
          p.productDescription,
          p.ProductThumbnail,
          p.productPrice,
          b.brandID,
          b.brandName,
          b.brandThumbnail
        FROM Orders o
        JOIN OrderItems oi ON o.orderID = oi.orderId
        JOIN Products p ON oi.productId = p.productID
        JOIN Brands b ON p.brandID = b.brandID
        WHERE o.userId = :userID AND o.status = 'Pending'
      `;
        const result = yield databse_1.sequelize.query(query, {
            replacements: { userID },
            type: sequelize_1.QueryTypes.SELECT,
        });
        console.log(result, "result");
        return result;
    }
    catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error while fetching orders with product and brand details');
    }
});
exports.selectOrdersWithProductAndBrand = selectOrdersWithProductAndBrand;
const deleteOrderQuery = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield databse_1.sequelize.query(`DELETE FROM Orders WHERE orderID = :orderId`, {
            replacements: { orderId },
            type: sequelize_1.QueryTypes.DELETE,
        });
        return result;
    }
    catch (error) {
        console.error('Error deleting order from DB:', error);
        throw new Error('Error while deleting the order');
    }
});
exports.deleteOrderQuery = deleteOrderQuery;
const updateOrderStatusQuery = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield databse_1.sequelize.query(`UPDATE Orders SET status = :status WHERE orderID = :orderId`, {
            replacements: { orderId, status },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        return result;
    }
    catch (error) {
        console.error('Error updating order status in DB:', error);
        throw new Error('Error while updating order status');
    }
});
exports.updateOrderStatusQuery = updateOrderStatusQuery;
const updateOrderAddressQuery = (orderId, productId, newAddress) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield databse_1.sequelize.query(`UPDATE Orders SET address = :newAddress WHERE orderId = :orderId `, {
            replacements: { orderId, productId, newAddress },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        return result;
    }
    catch (error) {
        console.error('Error updating product address in DB:', error);
        throw new Error('Error while updating product address');
    }
});
exports.updateOrderAddressQuery = updateOrderAddressQuery;
// Query to fetch order status
const getOrderStatusByIdQuery = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield databse_1.sequelize.query(`SELECT status FROM Orders WHERE orderID = :orderId`, {
            replacements: { orderId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return (_a = result[0]) === null || _a === void 0 ? void 0 : _a.status; // Return the order status
    }
    catch (error) {
        console.error('Error fetching order status from DB:', error);
        throw new Error('Error fetching order status');
    }
});
exports.getOrderStatusByIdQuery = getOrderStatusByIdQuery;
