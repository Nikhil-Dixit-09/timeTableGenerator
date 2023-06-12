import React from 'react'
import './app.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Appbar from './components/AppBar/AppBar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth.jsx'
const App=()=>{
    
    return(
        <>
           <BrowserRouter>
            <Appbar/>
            <Routes>
                <Route path="/" exact Component={Home}/>
                <Route path="/auth" exact Component={Auth}/>
            </Routes>
           
            </BrowserRouter>
        </>
        
    )
}
export default App;