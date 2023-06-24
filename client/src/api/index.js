import axios from 'axios';
const API=axios.create({baseURL:'http://localhost:8000'});
API.interceptors.request.use((req)=>{
    // var tok=JSON.parse(localStorage.getItem('profile')).token;
    // console.log(tok);
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});
export const signin=(formData)=>API.post(`/user/signin`,formData);
export const signup=(formData)=>API.post(`/user/signup`,formData);
export const addEntry=(formData)=>API.post(`/user/addEntry`,formData);
export const getInfo=(formData)=>API.post(`/user/getInfo`,formData);
export const delEntry=(formData)=>API.post('/user/delEntry',formData);
export const addFixed=(formData)=>API.post('/user/addFixed',formData);
export const delFixed=(formData)=>API.post('/user/delFixed',formData);