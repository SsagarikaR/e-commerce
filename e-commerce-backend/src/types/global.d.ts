declare global {
  interface forUser {
    userID: number;
    name: string;
    email: string;
    contactNo: string;
    password?: string;
    token?: string;
  }

  interface CustomError extends Error {
    statusCode?: number;
    message: string;
  }
  
}
export {};
