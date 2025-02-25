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
exports.getOrderStatusById = exports.updateOrderStatusService = exports.deleteOrderService = exports.updateOrderAddressService = exports.fetchOrdersWithProductAndBrand = exports.createOrderService = void 0;
const databse_1 = require("../../config/databse");
const orders_1 = require("../../respository/orders");
//create a new order   
const createOrderService = (userID, totalAmount, items, address) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield databse_1.sequelize.transaction();
    try {
        const existingOrder = yield (0, orders_1.selectOrderByUserID)(userID, t);
        if (existingOrder.length > 0) {
            return null;
        }
        const result = yield (0, orders_1.insertOrder)(userID, totalAmount, address, t);
        if (result) {
            for (const item of items) {
                yield (0, orders_1.insertOrderItems)(result.orderID, item.productId, item.quantity, item.price, t);
            }
        }
        yield t.commit();
        return result;
    }
    catch (error) {
        // Rollback the transaction in case of any error
        yield t.rollback();
        console.log(error);
        throw new Error('Error while creating order and order items');
    }
});
exports.createOrderService = createOrderService;
const fetchOrdersWithProductAndBrand = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, orders_1.getUserOrderDetails)(userID);
        return orders;
    }
    catch (error) {
        console.error('Error fetching orders with product and brand details:', error);
        throw new Error('Error fetching orders with product and brand details');
    }
});
exports.fetchOrdersWithProductAndBrand = fetchOrdersWithProductAndBrand;
const updateOrderAddressService = (orderId, productId, newAddress) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orders_1.updateOrderAddressQuery)(orderId, productId, newAddress);
        return result;
    }
    catch (error) {
        console.error('Error in service:', error);
        throw new Error('Error while updating product address');
    }
});
exports.updateOrderAddressService = updateOrderAddressService;
const deleteOrderService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orders_1.deleteOrderQuery)(orderId);
        return result;
    }
    catch (error) {
        console.error('Error in service:', error);
        throw new Error('Error while deleting the order');
    }
});
exports.deleteOrderService = deleteOrderService;
const updateOrderStatusService = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orders_1.updateOrderStatusQuery)(orderId, status);
        return result;
    }
    catch (error) {
        console.error('Error in service:', error);
        throw new Error('Error while updating order status');
    }
});
exports.updateOrderStatusService = updateOrderStatusService;
const getOrderStatusById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, orders_1.getOrderStatusByIdQuery)(orderId);
        return result;
    }
    catch (error) {
        console.error('Error fetching order status:', error);
        throw new Error('Error fetching order status');
    }
});
exports.getOrderStatusById = getOrderStatusById;
