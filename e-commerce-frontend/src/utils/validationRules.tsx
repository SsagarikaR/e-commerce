import { forValidations } from "../interface/interface";

export const validations:forValidations = {
    full_name: {
      require: {
        logic: (val:string) => {
          return val.trim() === "";
        },
        message: "Name can't be empty",
      },
      short: {
        logic: (val:string) => {
          return val.length < 3;
        },
        message: "Name is too short",
      },
    },
    email: {
      require: {
        logic: (val:string) => {
          return val.trim() === "";
        },
        message: "Email can't be empty",
      },
      wrong_format: {
        logic: (val:string) => {
          const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return !(email_regex.test(val));
        },
        message: "Email format is invalid",
      },
    },
    contact: {
      require: {
        logic: (val:string) => {
          return val.trim() === "";
        },
        message: "Contact no. can't be empty",
      },
      not_number: {
        logic: (val:string) => {
          return isNaN(Number(val));
        },
        message: "Contact no. should be a number",
      },
      short: {
        logic: (val:string) => {
          return val.length < 10;
        },
        message: "Contact no. is too short",
      },
      long:{
        logic: (val:string) => {
          return val.length > 10;
        },
        message: "Contact no. is too long",
      },
      wrong_format: {
        logic: (val:string) => {
          const phone_regex = /^\d{10}$/;
          return !(phone_regex.test(val));
        },
        message: "Contact no. format is invalid",
      },
    },
    // password: {
    //   require: {
    //     logic: (val:string) => {
    //       return val.trim() === "";
    //     },
    //     message: "Password can't be empty",
    //   },
    //   wrong_format: {
    //     logic: (val:string) => {
    //       const password_regexx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    //       return !(password_regexx.test(val));
    //     },
    //     message:
    //       "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
    //   },
    // },
  };