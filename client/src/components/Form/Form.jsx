import React from 'react'
import { useState } from 'react'
import './Form.css'
import { useDispatch } from 'react-redux';
import { addEntry } from '../../actions/user';
const Form = () => {
    const dispatch=useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [formData,setData]=useState({
        teacher:'',
        subject:'',
        class:'',
        maxi:0,
        room:'',
        email:user?.result?.email
    });
    
    // console.log(user);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        dispatch(addEntry(formData));
    }
  return (
    <div className='form'>
        <form onSubmit={handleSubmit}>
            <div className='container'>

            <div className='inp'>Teacher: </div>
            <input className='input' type='text' onChange={(e)=>setData({...formData,teacher:e.target.value})}></input>

            <div className='inp'>Subject: </div>
            <input className='input' type='text' onChange={(e)=>setData({...formData,subject:e.target.value})}></input>

            <div className='inp'>Class: </div>
            <input className='input' type='text' onChange={(e)=>setData({...formData,class:e.target.value})}></input>

            <div className='inp'>Credits:  </div>
            <input className='input' type='number' onChange={(e)=>setData({...formData,maxi:e.target.value})}></input>

            <div className='inp'>Room Number: </div>
            <input className='input' type='text' onChange={(e)=>setData({...formData,room:e.target.value})}></input>
            <div>
                <button type='submit'>Add Entry</button>
            </div>
            </div>
            
        </form>
        
    </div>
  )
}

export default Form
