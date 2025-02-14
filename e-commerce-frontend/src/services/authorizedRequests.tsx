import axios from "axios";
const port="http://localhost:3000"
import Cookies from "js-cookie";

const token=Cookies.get("token");

export const makeAuthorizedGetRequest=async (route:string)=>{   
    try{
        const response=await axios.get(`${port}${route}`, {headers: {Authorization: `Bearer ${token}`  }
        });
        console.log(response)
        return response;
    }
    catch(error){
        console.log(error);
    }
}
