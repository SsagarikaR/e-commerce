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

  interface forValidations {
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
    brandThmbnail:string
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

  interface forModalInputProp{
    id:string;
    value:string|number;
    setValue:(value:string)=>void;
    field:string
  }

  interface forProductProp {
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

  interface forCategories {
    categoryID: number;
    categoryName: string;
    categoryThumbnail?: string;
  }

  interface forBrand{
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

  interface product extends forCategories,forBrand{
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

  interface forCartItem {
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

  interface forDeleteModalProp{
    page:string;
    deleteID:number;
    listChange:boolean;
    setListChange:React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete:React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface forCategoryModalProp {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    setListChange: React.Dispatch<React.SetStateAction<boolean>>;
    editCategory: forCategories;
  }

  interface forBrandModalProp {
    setToggleModal:  React.Dispatch<React.SetStateAction<boolean>>;
    setListChange:  React.Dispatch<React.SetStateAction<boolean>>;
    editBrand: forBrand;
  }

  interface forProductModalProp {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    setListChange: React.Dispatch<React.SetStateAction<boolean>>;
    editProduct: forProductbyName;
  }

  interface forCustomerListProp{
    data:forUser[];
    setListChange: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface forProductListProp {
    data: forProductbyName[];
    setDeleteProductID:(value:number)=>void
    setEditProduct: (value: forProductbyName) => void;
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface forCategoriesProp {
    data: forCategories[];
    setDeleteCatgeoryID:(value:number)=>void;
    setEditCategory: (value: forCategories) => void;
    setToggleModal:  React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface forBrandListProp {
    data: forBrand[];
    setDeleteBrandID:(value:number)=>void
    setEditBrand: (value: forBrand) => void;
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface FormData {
    full_name: string;
    contact: string;
    password: string;
  }

  interface forSideBarProp {
    setPage: (value: string) => void;
    page: string;
  }

  interface CartContextType {
    cart: forCartItem[];
    addToCart: (productID: number) => void;
    removeFromCart: (cartItemID: number) => void;
    updateQuantity: (cartItemID: number, quantity: number) => void;
    fetchCart: () => void;
  }

  interface CloudinaryWidget {
    open: () => void;
    close: () => void;
  }


  interface Cloudinary {
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
