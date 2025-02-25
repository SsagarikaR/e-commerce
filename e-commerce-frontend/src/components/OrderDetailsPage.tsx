import  { useEffect, useState } from 'react';
import editIcon from "../assets/edit.png"
import useToast from '../utils/useToast';
import { makeAuthorizedGetRequest, makeAuthorizedPatchRequest } from '../services/authorizedRequests';
import EditAddressModal from '../subComponents.tsx/EditAddressModal';
import Container from '../containers/Container';


const OrderDetailsPage = () => {
  const [orders, setOrders] = useState<orderDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const { success, error } = useToast;

  const getUserOrders = async () => {
    const response = await makeAuthorizedGetRequest("/orders");
    if (response?.data) {
      setOrders(response.data);
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

  const handleEditAddress = (orderId: number, currentAddress: string) => {
    setSelectedOrderId(orderId);
    setSelectedAddress(currentAddress);
    setIsModalOpen(true);
  };

  const handleSaveAddress = (newAddress: string) => {
    if (selectedOrderId !== null) {
      const updatedOrders = orders.map(order =>
        order.orderID === selectedOrderId
          ? { ...order, address: newAddress }
          : order
      );
      setOrders(updatedOrders);
      setIsModalOpen(false);
    }
  };

  return (
    <Container>
    <div className="">
        <div className='container  mx-auto p-6  min-h-screen min-w-screen text-center'>
      <h2 className="text-3xl font-semibold mb-8 text-gray-800  dark:text-white">Order Details</h2>
      {loading ? (
        <div className="text-center text-lg text-gray-600  dark:text-white">Loading...</div>
      ) : (
        <div className="space-y-8 ">
          {orders.length === 0 ? (
            <p className="text-lg text-gray-600 dark:text-white">No orders found</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderID}
                className={` p-6 rounded-xl w-4/5 mx-auto shadow-lg m-y-2 bg-white ${order.status === 'Cancelled' ? 'opacity-80' : 'opacity-100'} `}
              >
                <div className={`relative`}>
                  <p className="text-lg text-gray-600 mt-2">
                    Status: <span className={`font-semibold ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>{order.status}</span>
                  </p>
                  
                  {/* Group Items */}
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold text-gray-800">Items</h4>
                    <div className="grid grid-cols-1  gap-6 ">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item) => (
                          <div
                            key={item.productID}
                            className=" p-4 rounded-lg shadow-lg flex items-center"
                          >
                            <img
                              src={item.productThumbnail}
                              alt={item.productName}
                              className="w-24 h-24 object-cover rounded-lg shadow-lg"
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

                  {/* Address Section */}
                  <div className="mt-6 flex gap-x-4 items-center">
                    <p className="text-md text-gray-600">Address: {order.address}</p>
                    {order.status !== 'Cancelled' && (
                    <img
                      src={editIcon}
                      className="text-blue-500 hover:underline w-5 h-5 cursor-pointer"
                      onClick={() => handleEditAddress(order.orderID, order.address)}
                    />
                  )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-6 justify-center">
                    {order.status !== 'Cancelled' && (
                      <button
                        className="px-6 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition duration-300"
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

      {/* Edit Address Modal */}
      <EditAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        currentAddress={selectedAddress}
      />
    </div>
    </Container>
  );
};

export default OrderDetailsPage;
