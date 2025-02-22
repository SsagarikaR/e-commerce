import { Request, Response, NextFunction } from 'express';
import { createOrderService ,
    fetchOrdersWithProductAndBrand,
    updateOrderAddressService,
    deleteOrderService,
    updateOrderStatusService,
    getOrderStatusById} from '../services/db/orders';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;
  const { totalAmount, items, address } = req.body;

  try {
    // Validate the required fields
    if (!address || !totalAmount || !items || items.length === 0) {
      return next({ statusCode: 400, message: "Please provide all required fields (address, totalAmount, items)." });
    }

    const result = await createOrderService(userID, totalAmount, items, address);

    if (!result) {
      return res.status(400).json({ message: 'Error while creating order. Please try again.' });
    }

    res.status(201).json({ message: 'Order created successfully', result });
  } catch (error) {
    return next({
      statusCode: 500,
      message: 'Error in creating order, Please try again!',
    });
  }
};


export const fetchUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.body.user.identifire; // Assuming the userID comes from the request body.
  
    try {
      const orders = await fetchOrdersWithProductAndBrand(userID);
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user.' });
      }
  
      res.status(200).json({ orders });
    } catch (error) {
      return next({
        statusCode: 500,
        message: 'Error fetching orders. Please try again later.',
      });
    }
  };


  export const updateOrderAddress = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId, productId, newAddress } = req.body;
  
    try {
      if (!orderId || !productId || !newAddress) {
        return next({ statusCode: 400, message: 'Please provide orderId, productId, and newAddress.' });
      }
  
      // Check if the order status is 'Cancelled'
      const orderStatus = await getOrderStatusById(orderId);
  
      if (orderStatus === 'Cancelled') {
        return res.status(400).json({ message: 'You cannot update the address of a cancelled order.' });
      }
  
      const result = await updateOrderAddressService(orderId, productId, newAddress);
  
      if (!result) {
        return res.status(400).json({ message: 'Error updating product address. Please try again.' });
      }
  
      res.status(200).json({ message: 'Product address updated successfully' });
    } catch (error) {
      return next({
        statusCode: 500,
        message: 'Error in updating product address, please try again!',
      });
    }
  };
  




  export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.body;
  
    try {
      if (!orderId) {
        return next({ statusCode: 400, message: 'Please provide orderId.' });
      }
  
      const result = await deleteOrderService(orderId);
  
      res.status(200).json({ message: 'Order deleted successfully' });

    } catch (error) {
      return next({
        statusCode: 500,
        message: 'Error in deleting order, please try again!',
      });
    }
  };




  export const updateOrderStatusToCancelled = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.body;
  
    try {
      if (!orderId) {
        return next({ statusCode: 400, message: 'Please provide orderId.' });
      }
  
      const result = await updateOrderStatusService(orderId, 'Cancelled');
  
      if (!result) {
        return res.status(400).json({ message: 'Error updating order status. Please try again.' });
      }
  
      res.status(200).json({ message: 'Order status updated to Cancelled' });
    } catch (error) {
      return next({
        statusCode: 500,
        message: 'Error in updating order status, please try again!',
      });
    }
  };