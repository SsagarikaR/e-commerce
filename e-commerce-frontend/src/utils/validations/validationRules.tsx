export const validations: validations = {
  //auth validation
  full_name: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Name can't be empty",
    },
    short: {
      logic: (val: string) => {
        return val.length < 3;
      },
      message: "Name is too short",
    },
  },
  email: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Email can't be empty",
    },
    wrong_format: {
      logic: (val: string) => {
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !email_regex.test(val);
      },
      message: "Email format is invalid",
    },
  },
  contact: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Contact no. can't be empty",
    },
    not_number: {
      logic: (val: string) => {
        return isNaN(Number(val));
      },
      message: "Contact no. should be a number",
    },
    short: {
      logic: (val: string) => {
        return val.length < 10;
      },
      message: "Contact no. is too short",
    },
    long: {
      logic: (val: string) => {
        return val.length > 10;
      },
      message: "Contact no. is too long",
    },
    wrong_format: {
      logic: (val: string) => {
        const phone_regex = /^\d{10}$/;
        return !phone_regex.test(val);
      },
      message: "Contact no. format is invalid",
    },
  },
  password: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Password can't be empty",
    },
    wrong_format: {
      logic: (val: string) => {
        const password_regexx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        return !password_regexx.test(val);
      },
      message:
        "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
    },
  },





  //Add brand modal input validation
  brand_name: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Brand name can't be empty",
    },
    short: {
      logic: (val: string) => {
        return val.length < 3;
      },
      message: "Brand name is too short",
    },
    long: {
      logic: (val: string) => {
        return val.length > 50;
      },
      message: "Brand name is too long (max 50 characters)",
    },
    invalid_chars: {
      logic: (val: string) => {
        const invalidChars = /[^a-zA-Z\s]/;
        return invalidChars.test(val);
      },
      message: "Brand name can only contain letters and spaces",
    },
  },
  brand_thumbnail: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Brand thumbnail can't be empty",
    },
    url_format: {
      logic: (val: string) => {
        const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
        return !urlRegex.test(val);
      },
      message: "Brand thumbnail must be a valid URL",
    },
  },





  //Add categories modal input validation
  category_name: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Category name can't be empty",
    },
    short: {
      logic: (val: string) => {
        return val.length < 3;
      },
      message: "Category name is too short",
    },
    long: {
      logic: (val: string) => {
        return val.length > 50;
      },
      message: "Category name is too long (max 50 characters)",
    },
    invalid_chars: {
      logic: (val: string) => {
        const invalidChars = /[^a-zA-Z\s]/;
        return invalidChars.test(val);
      },
      message: "Category name can only contain letters and spaces",
    },
  },
  category_thumbnail: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Category thumbnail can't be empty",
    },
    url_format: {
      logic: (val: string) => {
        const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
        return !urlRegex.test(val);
      },
      message: "Category thumbnail must be a valid URL",
    },
  },




  // Add product modal input validation
  product_name: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Product name can't be empty",
    },
    short: {
      logic: (val: string) => {
        return val.length < 3;
      },
      message: "Product name is too short",
    },
    long: {
      logic: (val: string) => {
        return val.length > 100;
      },
      message: "Product name is too long (max 100 characters)",
    },
    invalid_chars: {
      logic: (val: string) => {
        const invalidChars = /[^a-zA-Z0-9\s]/;
        return invalidChars.test(val);
      },
      message: "Product name can only contain letters, numbers, and spaces",
    },
  },
  product_price: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Product price can't be empty",
    },
    not_number: {
      logic: (val: string) => {
        return isNaN(Number(val));
      },
      message: "Product price must be a number",
    },
    negative: {
      logic: (val: string) => {
        return Number(val) <= 0;
      },
      message: "Product price must be greater than zero",
    },
  },
  stock: {
    require: {
      logic: (val: string) => {
        return val.trim() === "";
      },
      message: "Stock can't be empty",
    },
    not_number: {
      logic: (val: string) => {
        return isNaN(Number(val));
      },
      message: "Stock must be a number",
    },
    negative: {
      logic: (val: string) => {
        return Number(val) < 0;
      },
      message: "Stock can't be negative",
    },
  },
};
