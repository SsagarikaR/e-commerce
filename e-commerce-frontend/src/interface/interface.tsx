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
 export interface forCartItem {
  cartItemID:number
  categoryName:string
  productDescription:string
  totalPrice:number
  productID: number;
  productName: string;
  productPrice: number;
  productThumbnail: string;
  quantity: number;
}
 
export interface forCategoryModalProp {
  setToggleModal:(value:boolean)=>void,
  setListChange:(value:boolean)=>void,
  listChange:boolean,
  editCategory:forCategories
}
export interface forProductModalProp{
  setToggleModal:(value:boolean)=>void,
  setListChange:(value:boolean)=>void,
  listChange:boolean,
  editProduct:forProductbyName
  
}

export interface forProductListProp{
  data:forProductbyName[],
  setListChange:(value:boolean)=>void,
  listChange:boolean,
  setEditProduct:(value:forProductbyName)=>void
  setToggleModal:(value:boolean)=>void
}

export interface forCategoriesProp{
  data:forCategories[],
  setListChange:(value:boolean)=>void,
  listChange:boolean
  setEditCategory:(value:forCategories)=>void
  setToggleModal:(value:boolean)=>void
}

export  interface FormData {
  full_name: string;
  contact: string;
  password: string;
}

export interface forSideBarProp{
  setPage:(value:string)=>void
  page:string
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
