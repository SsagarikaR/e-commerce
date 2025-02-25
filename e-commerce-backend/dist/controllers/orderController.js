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
exports.updateOrderStatusToCancelled = exports.deleteOrder = exports.updateOrderAddress = exports.fetchUserOrders = exports.createOrder = void 0;
const orders_1 = require("../services/db/orders");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire;
    const { totalAmount, items, address } = req.body;
    try {
        // Validate the required fields
        console.log(req.body);
        const result = yield (0, orders_1.createOrderService)(userID, totalAmount, items, address);
        if (!result) {
            return res.status(400).json({ message: 'Error while creating order. Please try again.' });
        }
        res.status(201).json({ message: 'Order created successfully', result });
    }
    catch (error) {
        return next({
            statusCode: 500,
            message: 'Error in creating order, Please try again!',
        });
    }
});
exports.createOrder = createOrder;
const fetchUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.user.identifire; // Assuming the userID comes from the request body.
    try {
        const orders = yield (0, orders_1.fetchOrdersWithProductAndBrand)(userID);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
        res.status(200).json(orders);
    }
    catch (error) {
        return next({
            statusCode: 500,
            message: 'Error fetching orders. Please try again later.',
        });
    }
});
exports.fetchUserOrders = fetchUserOrders;
const updateOrderAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, productId, newAddress } = req.body;
    try {
        if (!orderId || !productId || !newAddress) {
            return next({ statusCode: 400, message: 'Please provide orderId, productId, and newAddress.' });
        }
        // Check if the order status is 'Cancelled'
        const orderStatus = yield (0, orders_1.getOrderStatusById)(orderId);
        if (orderStatus === 'Cancelled') {
            return res.status(400).json({ message: 'You cannot update the address of a cancelled order.' });
        }
        const result = yield (0, orders_1.updateOrderAddressService)(orderId, productId, newAddress);
        if (!result) {
            return res.status(400).json({ message: 'Error updating product address. Please try again.' });
        }
        res.status(200).json({ message: 'Product address updated successfully' });
    }
    catch (error) {
        return next({
            statusCode: 500,
            message: 'Error in updating product address, please try again!',
        });
    }
});
exports.updateOrderAddress = updateOrderAddress;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    try {
        if (!orderId) {
            return next({ statusCode: 400, message: 'Please provide orderId.' });
        }
        const result = yield (0, orders_1.deleteOrderService)(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        return next({
            statusCode: 500,
            message: 'Error in deleting order, please try again!',
        });
    }
});
exports.deleteOrder = deleteOrder;
const updateOrderStatusToCancelled = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    try {
        if (!orderId) {
            return next({ statusCode: 400, message: 'Please provide orderId.' });
        }
        const result = yield (0, orders_1.updateOrderStatusService)(orderId, 'Cancelled');
        if (!result) {
            return res.status(400).json({ message: 'Error updating order status. Please try again.' });
        }
        res.status(200).json({ message: 'Order status updated to Cancelled' });
    }
    catch (error) {
        return next({
            statusCode: 500,
            message: 'Error in updating order status, please try again!',
        });
    }
});
exports.updateOrderStatusToCancelled = updateOrderStatusToCancelled;
