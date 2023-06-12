import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useLocation } from 'react-router-dom'
import './AppBar.css'
const AppBar = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
        // console.log(user)
      }, [location])
      const gotohome = () => {
        navigate("/");
      }
      const logout = () => {
        dispatch({ type: 'LOGOUT' })
        dispatch({type:'LOG_OUT'})
        setUser(null)
        gotohome();
      }
  return (
    <div className='appbar'>
      <div className='name'>
            Time Table Generator
        </div>

        <div className='who'>
            {
              user!=null &&
              <div className='user'>
                <div className='nameApp'>
                  {user?.result?.institute}
                </div>
                <div className='logout'>
                  <button onClick={logout}>
                    Logout
                  </button>
                </div>
                
              </div>
              
            }
            {
              user==null && 
              <button onClick={() => navigate("/auth")}>
                Login/Register
              </button>
            }
            
        </div>
    </div>
  )
}

export default AppBar
