import axios from "axios"

export const makeUnAuthorizedPostRequest=async (route:string,data:object)=>{
    try{
        const resposne=await axios.post(`http://localhost:3000${route}`,data)
        console.log(resposne);
        return resposne
    }
    catch(error){
        console.log(error);

    }
}

export const makeUnAuthorizedGetRequest=async (route:string)=>{
    try{
        const resposne=await axios.get(`http://localhost:3000${route}`)
        // console.log(resposne);
        return resposne;
    }
    catch(error){
        console.log(error);
    }
}