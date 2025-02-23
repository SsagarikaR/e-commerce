declare global {
  interface user {
    userID: number;
    name: string;
    email: string;
    contactNo: string;
    password?: string;
    token?: string;
    role?:string;
  }

  interface CustomError extends Error {
    statusCode?: number;
    message: string;
  }
  


  interface order {
    orderID: number;
    userId: number;
    totalAmount: number;
    status: string;
    address: string;
  }
  
  interface orderItem {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    productName: string;
    productThumbnail: string;
    productPrice: number;
    brandName: string;
  }
  
  interface OrderDetail extends Order {
    items: OrderItem[];
  }
  
}
export {};
