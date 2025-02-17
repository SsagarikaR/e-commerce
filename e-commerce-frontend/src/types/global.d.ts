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

  interface forProductProp {
    product: forProductbyName;
    setModalOpen: (value: boolean) => void;
  }
  interface forUser {
    userID: number;
    name: string;
    email: string;
    contactNo: string;
    role: string;
    password?: string;
    token?: string;
  }

  interface forCategories {
    categoryID: number;
    categoryName: string;
    categoryThumbnail: string;
  }

  interface forProductbyName {
    ProductThumbnail: string;
    categoryID: number;
    categoryName: string;
    categoryThumbnail?: string;
    productDescription: string;
    productID: number;
    productName: string;
    productPrice: number;
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
  }

  interface forCategoryModalProp {
    setToggleModal: (value: boolean) => void;
    setListChange: (value: boolean) => void;
    listChange: boolean;
    editCategory: forCategories;
  }
  interface forProductModalProp {
    setToggleModal: (value: boolean) => void;
    setListChange: (value: boolean) => void;
    listChange: boolean;
    editProduct: forProductbyName;
  }

  interface forProductListProp {
    data: forProductbyName[];
    setDeleteProductID:(value:number)=>void
    setEditProduct: (value: forProductbyName) => void;
    setToggleModal: (value: boolean) => void;
    setIsDelete:(value:boolean)=>void
  }

  interface forCategoriesProp {
    data: forCategories[];
    setDeleteCatgeoryID:(value:number)=>void
    setEditCategory: (value: forCategories) => void;
    setToggleModal: (value: boolean) => void;
    setIsDelete:(value:boolean)=>void
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
    // Add any other methods or properties based on the Cloudinary documentation you need
}

// global.d.ts or custom.d.ts
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
