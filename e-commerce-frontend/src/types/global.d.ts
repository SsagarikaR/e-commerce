import React from "react";

declare global {

  interface InputProps {
    field: string;
    id: string;
    type: string;
    value: string;
    setValue: (value: string) => void;
    error: string;
    setError: (value: string) => void;
  }

  interface validations {
    [key: string]: {
      [key: string]: {
        logic: (val: string) => boolean;
        message: string;
      };
    };
  }



  interface wishList{
    wishListID:number;
    productID:number;
    userID:number;
  }

  interface wishListDetails extends wishList{
    productName:string;
    productPrice:string;
    productThumbnail:string;
    brandID:number;
    brandThumbnail:string
  }

  interface prefernce{
  brandName:string
  brandThumbnail:string
  preferenceID:number
  productDescription:string
  productThumbnail:string;
  productID:number
  productName:string
  productPrice:number
  userID:string
  }

  interface wishListProp {
    item:wishListDetails
    setToggleWishList:React.Dispatch<React.SetStateAction<boolean>>
  }

  interface modalInputProp{
    id:string;
    value:string|number;
    setValue:(value:string)=>void;
    field:string
     error:string;
    setError:  React.Dispatch<React.SetStateAction<string>>;
  }

  interface productProp {
    product: product;
    setModalOpen: (value: boolean) => void;
  }
  
  interface user {
    userID: number;
    name: string;
    email: string;
    contactNo: string;
    password?: string;
    token?: string;
    role?:string
  }

  interface review extends user{
    reviewID:number;
    productID:number;
    rating:number;
    description:rating
  }
  interface ratingProp{
    productID:number;
    rating:number;
  }

  interface categories {
    categoryID: number;
    categoryName: string;
    categoryThumbnail?: string;
  }

  interface brand{
    brandID: number;
    brandName: string;
    brandThumbnail: string;
  }

  interface orderDetails {
    orderID: number;
    userId: number;
    totalAmount: number;
    status: string;
    address: string;
    items: product[];
  }

  interface product extends categories,brand{
    productName: string;
    productPrice: number;
    productID: number;
    productThumbnail: string;
    productDescription: string;
    stock:number;
    rating:number;
    totalCount:number;
    quantity?:number
  }

  interface cartItem {
    cartItemID: number;
    categoryName: string;
    productDescription: string;
    totalPrice: number;
    productID: number;
    productName: string;
    productPrice: number;
    productThumbnail: string;
    quantity: number;
    brandID:number;
    brandThumbnail:string;
  }

  interface deleteModalProp{
    page:string;
    deleteID:number;
    listChange:boolean;
    setListChange:React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete:React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface categoryModalProp {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    setListChange: React.Dispatch<React.SetStateAction<boolean>>;
    editCategory: forCategories;
  }

  interface brandModalProp {
    setToggleModal:  React.Dispatch<React.SetStateAction<boolean>>;
    setListChange:  React.Dispatch<React.SetStateAction<boolean>>;
    editBrand: forBrand;
   
  }

  interface productModalProp {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    setListChange: React.Dispatch<React.SetStateAction<boolean>>;
    editProduct: forProductbyName;
  }

  interface customerListProp{
    data:forUser[];
    setListChange: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface productListProp {
    data: forProductbyName[];
    setDeleteProductID:(value:number)=>void
    setEditProduct: (value: forProductbyName) => void;
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage:number 
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>;
  }

  interface categoriesProp {
    data: forCategories[];
    setDeleteCatgeoryID:(value:number)=>void;
    setEditCategory: (value: forCategories) => void;
    setToggleModal:  React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface brandListProp {
    data: forBrand[];
    setDeleteBrandID:(value:number)=>void
    setEditBrand: (value: forBrand) => void;
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface formData {
    full_name: string;
    contact: string;
    password: string;
  }

  interface forSideBarProp {
    setPage: (value: string) => void;
    page: string;
  }

  interface cartContextType {
    cart: forCartItem[];
    addToCart: (productID: number) => void;
    removeFromCart: (cartItemID: number) => void;
    updateQuantity: (cartItemID: number, quantity: number) => void;
    fetchCart: () => void;
  }

  interface cloudinaryWidget {
    open: () => void;
    close: () => void;
  }


  interface cloudinary {
    createUploadWidget: (
      options: {
          cloudName: string;
          uploadPreset: string;
          sources: string[];
          clientAllowedFormats: string[];
          maxFileSize: number;
      },
      callback: (error: Error | null, result: { event: string, info: { secure_url: string, original_filename: string } }) => void
  ) => CloudinaryWidget;
}

interface Window {
  cloudinary: Cloudinary;
}

}
export {};
