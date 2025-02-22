declare global {
  interface forUser {
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
  
  interface order{
    ordersID:number;
    userId:number;
    totalAmount:number;
    status: string;
    address: string;
  }
}
export {};
