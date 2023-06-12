import * as api from '../api/index';
export const addEntry=(formData)=>async(dispatch)=>{
    try{
        const {data}=await api.addEntry(formData);
        // console.log(data.data);
        // console.log(data);
        dispatch({type:'SET_USER',payload:data.data});
    }catch(error){
        console.log(error)
    }
}
export const getInfo=(formData)=>async(dispatch)=>{
    try{
        // console.log(formData);
        const {data}=await api.getInfo(formData);
        // console.log(data.data);
        // console.log(data);
        dispatch({type:'SET_USER',payload:data.data});
    }catch(error){
        console.log(error)
    }
}
export const delEntry=(formData)=>async(dispatch)=>{
    try{
        const {data}=await api.delEntry(formData);
        // console.log(data);
        dispatch({type:'SET_USER',payload:data.data});
    }catch(err){
        console.log(err);
    }
}