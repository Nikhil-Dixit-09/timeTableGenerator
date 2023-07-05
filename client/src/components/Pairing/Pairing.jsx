import React from 'react'
import './Pairing.css'
import del from '../../assets/icons8-delete-50.png'
import { useDispatch } from 'react-redux'
import { delPairing } from '../../actions/user'
const Pairing = (props) => {
    const dispatch=useDispatch();
    const deleteMe=()=>{
        console.log(props);
        dispatch(delPairing(props));
    }
  return (
    <div>
      <div className='entry'>
        <div className='info'>Teacher: {props?.teacher}</div>
        <div className='info'>Subject: {props?.subject}</div>
        <div className='info'>Class1: {props?.class1}</div>
        <div className='info'>Class2: {props?.class2}</div>
        <div className='info del'><img src={del} alt='loading..'onClick={deleteMe}></img></div>
    </div>
    </div>
  )
}

export default Pairing
