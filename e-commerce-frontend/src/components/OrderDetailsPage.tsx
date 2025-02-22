import { useEffect, useState } from 'react';
import useToast from '../utils/useToast';
import { makeAuthorizedGetRequest, makeAuthorizedPatchRequest } from '../services/authorizedRequests';

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState<orderDetails[]>([]); // Default state is an empty array
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast;

  const getUserOrders = async () => {
    const response = await makeAuthorizedGetRequest("/orders"); // Fetch orders from the backend
    if (response?.data) {
      setOrders(response.data); // Set state only if it's an array
      setLoading(false);
    } else {
      error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  const handleCancelOrder = async (orderId: number) => {
    const response = await makeAuthorizedPatchRequest("/orders/status", {
      orderId,
      status: "cancelled"
    });
    if (response?.data) {
      success('Order cancelled successfully');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderID === orderId ? { ...order, status: 'Cancelled' } : order
        )
      );
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen min-w-screen text-center">
      <h2 className="text-4xl font-semibold mb-8 text-gray-800">Order Details</h2>
      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : (
        <div className="space-y-8">
          {orders.length === 0 ? (
            <p className='text-lg text-gray-600'>No orders found</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderID}
                className={`border p-6 rounded-xl shadow-md ${order.status === 'Cancelled' ? 'bg-gray-200' : 'bg-white'}`}
              >
                <div className={`relative ${order.status === 'Cancelled' ? 'blur-sm' : ''}`}>
                  <h3 className="text-2xl font-semibold text-gray-800">Order #{order.orderID}</h3>
                  <p className="text-lg text-gray-600 mt-2">Status: <span className={`font-semibold ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>{order.status}</span></p>
                  <p className="text-sm text-gray-600 mt-1">Address: {order.address}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Amount: ₹{order.totalAmount}</p>

                  {/* Group Items */}
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold text-gray-800">Items:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item) => (
                          <div
                            key={item.productID}
                            className="border p-4 rounded-lg shadow-lg flex items-center"
                          >
                            <img
                              src={item.productThumbnail}
                              alt={item.productName}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="ml-4">
                              <p className="text-lg font-semibold text-gray-800">{item.productName}</p>
                              <p className="text-sm text-gray-600">Price: ₹{item.productPrice}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">No items in this order</p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-6 justify-center">
                    {order.status !== 'Cancelled' && (
                      <button
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => handleCancelOrder(order.orderID)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
