import React from 'react'
import './Fixed.css'
import del from '../../assets/icons8-delete-50.png'
import { useDispatch } from 'react-redux'
import { delFixed } from '../../actions/user'
const Fixed = (props) => {
    const dispatch=useDispatch();
    const deleteMe=()=>{
        console.log(props);
        dispatch(delFixed(props));
    }
  return (
    <div>
        <div className='entry'>
        <div className='info'>Day: {props.day}</div>
        <div className='info'>Class: {props.class}</div>
        <div className='info'>Subject: {props.subject}</div>
        <div className='info'>Teacher: {props.teacher}</div>
        <div className='info room'>Room Number: {props?.room}</div>
        <div className='info room'>Time Slot: {props?.timeslot}</div>
        <div className='info del'><img src={del} alt='loading..'onClick={deleteMe}></img></div>
    </div>
    </div>
  )
}

export default Fixed
