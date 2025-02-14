export interface InputProps {
    field: string;
    id: string;
    type: string,
    value: string;
    setValue: (value:string)=>void;
    error: string;
    setError: (value:string)=>void;
}

export interface forValidations {
    [key: string]: {
        [key:string]: {
        logic: (val: string) => boolean;
        message: string;
      };
    };
  }

export  interface forUser{
    userID:number,
    name:string,
    email:string,
    contactNo:string,
    role:string,
    password?:string,
    token?:string
}

export interface forCategories{
  categoryID:number
  categoryName:string
  categoryThumbnail:string

}

export interface forProductbyName{
  ProductThumbnail:string,
  categoryID:number 
  categoryName:string
  categoryThumbnail?:string
  productDescription:string
  productID:number
  productName:string
  productPrice:number
}

// export interface forProduct{
//   productID: number,
//   productName: string,
//   productDescription: string
//   productThumbnail: string
//   productPrice: number,
//   categoryID: number,
//   categoryName:string
// }
