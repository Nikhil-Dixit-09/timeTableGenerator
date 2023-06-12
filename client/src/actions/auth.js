import * as api from '../api/index';
const backtohome=(navigate)=>{
    navigate("/")
}
export const signin=(formData,navigate)=>async(dispatch)=>{
    try{
        const {data}=await api.signin(formData);
        dispatch({type:'AUTH',data});
        console.log(data);
        console.log(data.result);
        backtohome(navigate);
    }catch(error){
        console.log(error);
        
    }
}
export const signup=(formData,navigate)=>async(dispatch)=>{
    try{
        const {data}=await api.signup(formData);
        dispatch({type:'AUTH',data});
        backtohome(navigate);
    }catch(error){
        console.log(error);
    }
}