import React from 'react'
import './Entry.css'
import del from '../../assets/icons8-delete-50.png'
import { useDispatch } from 'react-redux'
import { delEntry } from '../../actions/user'
const Entry = (props) => {
  const dispatch=useDispatch();
  const deleteMe=()=>{
    console.log(props);
    dispatch(delEntry(props));
  }
  return (
    <div className='entry'>
        <div className='info'>Teacher: {props.teacher}</div>
        <div className='info'>Subject: {props.subject}</div>
        <div className='info'>Class: {props.class}</div>
        <div className='info'>Credits: {props.maxi}</div>
        <div className='info room'>Room Number: {props?.room}</div>
        <div className='info del'><img src={del} alt='loading..' onClick={deleteMe}></img></div>
    </div>
  )
}

export default Entry
