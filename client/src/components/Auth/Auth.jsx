import React from 'react'
import { useState } from 'react';
import {signin,signup} from '../../actions/auth'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.css'
const initialState = { institute:'', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const switchMode = () => {
        // setForm(initialState);
        setIsSignup(!isSignup);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if(isSignup){
            dispatch(signup(form,navigate));
          }else{
            dispatch(signin(form,navigate));
          }
    }
    return (
        <div>

            <form className='myForm' action="" autoComplete='off' onSubmit={handleSubmit}>
                <div className='flex'>
                   
                        {
                            isSignup && (
                                <>
                                    <h6>Institute Name</h6>
                                    <input placeholder='Enter Institute Name' className='input' type="text" label='First Name' name='institute' onChange={handleChange} />
                                    
                                </>
                            )
                        }
                        <h6>Email</h6>
                        <input placeholder='Enter Email Address' className='input' type="email" label='Email Address' name='email' onChange={handleChange} />
                        <h6>Password</h6>
                        <input placeholder='Enter Password' className='input' type="password" label='Password' name='password' onChange={handleChange} />
                    </div>
                   
                        {
                            isSignup && (
                                <>
                                    <h6>Confirm Password</h6>
                                    <input placeholder='Confirm Password' className='input' type="password" label='Repeat Password' name='confirmPassword' onChange={handleChange} />
                             
                                </>
                            )
                        }
                        <div className='submitbutton'>
                            <button type='submit'>
                                {isSignup ? 'SignUp' : 'SignIn'}
                            </button>
                        </div>
                        
            </form>
            <button onClick={switchMode} className='lower'>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
            </button>


        </div>
    )
}

export default Auth