import React from 'react'
import { useState } from 'react'
import './Home.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getInfo } from '../../actions/user'
import Form from '../Form/Form'
import Entry from '../Entry/Entry'
// import $ from 'jquery'

const Home = () => {
  const location = useLocation();
  const dispatch=useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // console.log(user);
  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('profile')))
      // console.log(user)
    }, [location])
    const [arr,setArr]=useState([0]);
    const addEntry=(e)=>{
      e.preventDefault();
      var n=arr.length;
      setArr([...arr,n]);
      // console.log(arr);
    }
   
    
    useEffect(()=>{
      if(user!==null){
        // console.log('userrrr')
        var form={};
        form.email=user?.result?.email;
        // console.log(form);
        dispatch(getInfo(form));
        
      }
     
    },[user]);
      
   
    const myUser=useSelector((state)=>state.user);
   
    console.log(myUser);
    function generateRandomArray(n) {
      const array = [];
      
      // Initialize the array with values from 0 to n-1
      for (let i = 0; i < n; i++) {
        array[i] = i;
      }
      
      // Shuffle the array using Fisher-Yates algorithm
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      
      return array;
    }
   
    let myMap=new Map();
    let which=new Map();
    let labs=new Map();
    let list=[];
    for(let i=0;i<myUser.entries.length;i++){
      let teacher=myUser.entries[i].teacher;
      let subject=myUser.entries[i].subject;
      let clas=myUser.entries[i].class;
      let maxi=myUser.entries[i].maxi;
      let room=myUser.entries[i].room;
      let see=subject.slice(-3);
      if(see==='LAB'){
        if(labs.has(clas)){
          let v=labs.get(clas);
          v.push([subject,teacher,room]);
          labs.set(clas,v);
        }else{
          let v=[[subject,teacher,room]];
          labs.set(clas,v);
        }
        continue;
      }
      // console.log(teacher,subject,clas,maxi);
      if(myMap.has(clas)){
        let v=myMap.get(clas);
        let p=[teacher,subject,maxi,room];
        v.push(p);
        myMap.set(clas,v);
      }else{
        let v=[[teacher,subject,maxi,room]];
        myMap.set(clas,v);
        list.push(clas);
      }
    }
    list.sort();
    for(var i=0;i<list.length;i++){
      which.set(i,list[i]);
    }
    console.log(which);
    console.log(myMap);
    console.log(labs);
    var monday= new Array(which.size);
  for (let i = 0; i < monday.length; i++) {
      monday[i] = [];
  }
  // var h = 0;
  // var s = "GeeksforGeeks";
  
  // Loop to initialize 2D array elements.
  for (let i = 0; i < which.size; i++) {
      for (let j = 0; j < 8; j++) {
  
          monday[i][j] ='null';
      }
  }
  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  console.log(monday);
  
  let hori=new Map();
  for(let i=0;i<which.size;i++){
    let see=which.get(i);
    console.log(see);
    let horis=new Map();
    hori.set(see,horis);
  }
  for(let j=1;j<=6;j++){
    let vis=new Map();
    let rooms=new Map();
    for(let i=0;i<which.size;i++){
      if(monday[i][j]!=='null'){
        continue;
      }
      let l;
      if(labs.has(which.get(i))){
        l=labs.get(which.get(i));
      }
      
      if(labs.has(which.get(i))&&j===5&&l.length!==0){
        
        console.log(l);
        let ind1=randomNumber(0,l.length-1);
        console.log(ind1);

        let arr=generateRandomArray(l.length);
        let see=-1;
        for(let k=0;k<arr.length;k++){
          // console.log(l);
          let r=l[k][2];
          if(rooms.has(r)){
            continue;
          }else{
            ind1=k;
            monday[i][j]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            monday[i][j+1]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            rooms.set(l[ind1][2],1);
            l.splice(ind1,1);
            labs.set(which.get(i),l);
            see=1;
            break;
          }
        }

        if(see===1){
          continue;
        }
        
        
      }
      let v=myMap.get(which.get(i));
      // console.log(v);
      if(v.length===0){
        continue;
      }
      let n=v.length;
      let horizon=hori.get(which.get(i));
      let ind=randomNumber(0,n-1);
      let obj=v[ind];
      let teach=obj[0];
      let full=teach+','+obj[1];
      let room=obj[3];
      // console.log(teach);
      if(vis.has(teach)||horizon.has(full)||rooms.has(room)){
        for(let k=0;k<n;k++){
          let see=v[k];
          let t=see[0];
          let f=t+','+see[1];
          let r=see[3];
          if(vis.has(t)||horizon.has(f)||rooms.has(r)){

          }else{
            vis.set(t,1);
            let s=t+','+see[1]+','+see[3];
            let abc=t+','+see[1];
            rooms.set(see[3],1);
            horizon.set(abc,1);
            hori.set(which.get(i),horizon);
            monday[i][j]=s;
            v[k][2]=v[k][2]-1;
            if(v[k][2]===0){
              v.splice(k,1);
            }
            myMap.set(which.get(i),v);
            break;
          }
        }
      }else{
        vis.set(teach,1);
        let a=teach+','+obj[1]+','+obj[3];
        let abcd=teach+','+obj[1];
        rooms.set(obj[3],1);
        horizon.set(abcd,1);
        hori.set(which.get(i),horizon);
        monday[i][j]=a;

        v[ind][2]=v[ind][2]-1;
        if(v[ind][2]===0){
          v.splice(ind,1);
        }
        myMap.set(which.get(i),v);
      }
    }
    console.log(rooms);
  }
  // console.log(myMap);
  console.log(monday);
  hori.clear();
  for(let i=0;i<which.size;i++){
    let see=which.get(i);
    // console.log(see);
    let horis=new Map();
    hori.set(see,horis);
  }
  
  var tue= new Array(which.size);
  for (let i = 0; i < tue.length; i++) {
      tue[i] = [];
  }
  // var h = 0;
  // var s = "GeeksforGeeks";
  
  // Loop to initialize 2D array elements.
  for (let i = 0; i < which.size; i++) {
      for (let j = 0; j < 8; j++) {
  
          tue[i][j] ='null';
      }
  }
  // console.log(tue);
  for(let j=1;j<=6;j++){
    let vis=new Map();
    let rooms=new Map();
    for(let i=0;i<which.size;i++){
      if(tue[i][j]!=='null'){
        continue;
      }
      let l;
      if(labs.has(which.get(i))){
        l=labs.get(which.get(i));
      }
      
      if(labs.has(which.get(i))&&j===5&&l.length!==0){
        
        // console.log(l);
        let ind1=randomNumber(0,l.length-1);
        // console.log(ind1);

        let arr=generateRandomArray(l.length);
        let see=-1;
        for(let k=0;k<arr.length;k++){
          // console.log(l);
          let r=l[k][2];
          if(rooms.has(r)){
            continue;
          }else{
            ind1=k;
            tue[i][j]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            tue[i][j+1]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            rooms.set(l[ind1][2],1);
            l.splice(ind1,1);
            labs.set(which.get(i),l);
            see=1;
            break;
          }
        }

        if(see===1){
          continue;
        }
        
        
      }
      let v=myMap.get(which.get(i));
      // console.log(v);
      if(v.length===0){
        continue;
      }
      let n=v.length;
      let horizon=hori.get(which.get(i));
      let ind=randomNumber(0,n-1);
      let obj=v[ind];
      let teach=obj[0];
      let full=teach+','+obj[1];
      let room=obj[3];
      // console.log(teach);
      if(vis.has(teach)||horizon.has(full)||rooms.has(room)){
        for(let k=0;k<n;k++){
          let see=v[k];
          let t=see[0];
          let f=t+','+see[1];
          let r=see[3];
          if(vis.has(t)||horizon.has(f)||rooms.has(r)){

          }else{
            vis.set(t,1);
            let s=t+','+see[1]+','+see[3];
            let abc=t+','+see[1];
            rooms.set(see[3],1);
            horizon.set(abc,1);
            hori.set(which.get(i),horizon);
            tue[i][j]=s;
            v[k][2]=v[k][2]-1;
            if(v[k][2]===0){
              v.splice(k,1);
            }
            myMap.set(which.get(i),v);
            break;
          }
        }
      }else{
        vis.set(teach,1);
        let a=teach+','+obj[1]+','+obj[3];
        let abcd=teach+','+obj[1];
        rooms.set(obj[3],1);
        horizon.set(abcd,1);
        hori.set(which.get(i),horizon);
        tue[i][j]=a;

        v[ind][2]=v[ind][2]-1;
        if(v[ind][2]===0){
          v.splice(ind,1);
        }
        myMap.set(which.get(i),v);
      }
    }
    
  }
  console.log(tue);
  hori.clear();
  for(let i=0;i<which.size;i++){
    let see=which.get(i);
    // console.log(see);
    let horis=new Map();
    hori.set(see,horis);
  }
  
  var wed= new Array(which.size);
  for (let i = 0; i < wed.length; i++) {
      wed[i] = [];
  }
  // var h = 0;
  // var s = "GeeksforGeeks";
  
  // Loop to initialize 2D array elements.
  for (let i = 0; i < which.size; i++) {
      for (let j = 0; j < 8; j++) {
  
          wed[i][j] ='null';
      }
  }
  // console.log(wed);
  for(let j=1;j<=6;j++){
    let vis=new Map();
    let rooms=new Map();
    for(let i=0;i<which.size;i++){
      if(wed[i][j]!=='null'){
        continue;
      }
      let l;
      if(labs.has(which.get(i))){
        l=labs.get(which.get(i));
      }
      
      if(labs.has(which.get(i))&&j===5&&l.length!==0){
        
        // console.log(l);
        let ind1=randomNumber(0,l.length-1);
        // console.log(ind1);

        let arr=generateRandomArray(l.length);
        let see=-1;
        for(let k=0;k<arr.length;k++){
          // console.log(l);
          let r=l[k][2];
          if(rooms.has(r)){
            continue;
          }else{
            ind1=k;
            wed[i][j]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            wed[i][j+1]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            rooms.set(l[ind1][2],1);
            l.splice(ind1,1);
            labs.set(which.get(i),l);
            see=1;
            break;
          }
        }

        if(see===1){
          continue;
        }
        
        
      }
      let v=myMap.get(which.get(i));
      // console.log(v);
      if(v.length===0){
        continue;
      }
      let n=v.length;
      let horizon=hori.get(which.get(i));
      let ind=randomNumber(0,n-1);
      let obj=v[ind];
      let teach=obj[0];
      let full=teach+','+obj[1];
      let room=obj[3];
      // console.log(teach);
      if(vis.has(teach)||horizon.has(full)||rooms.has(room)){
        for(let k=0;k<n;k++){
          let see=v[k];
          let t=see[0];
          let f=t+','+see[1];
          let r=see[3];
          if(vis.has(t)||horizon.has(f)||rooms.has(r)){

          }else{
            vis.set(t,1);
            let s=t+','+see[1]+','+see[3];
            let abc=t+','+see[1];
            rooms.set(see[3],1);
            horizon.set(abc,1);
            hori.set(which.get(i),horizon);
            wed[i][j]=s;
            v[k][2]=v[k][2]-1;
            if(v[k][2]===0){
              v.splice(k,1);
            }
            myMap.set(which.get(i),v);
            break;
          }
        }
      }else{
        vis.set(teach,1);
        let a=teach+','+obj[1]+','+obj[3];
        let abcd=teach+','+obj[1];
        rooms.set(obj[3],1);
        horizon.set(abcd,1);
        hori.set(which.get(i),horizon);
        wed[i][j]=a;

        v[ind][2]=v[ind][2]-1;
        if(v[ind][2]===0){
          v.splice(ind,1);
        }
        myMap.set(which.get(i),v);
      }
    }
    
  }
  console.log(wed);
  // console.log(myMap);

  hori.clear();
  for(let i=0;i<which.size;i++){
    let see=which.get(i);
    // console.log(see);
    let horis=new Map();
    hori.set(see,horis);
  }
  
  var thurs= new Array(which.size);
  for (let i = 0; i < thurs.length; i++) {
      thurs[i] = [];
  }
  // var h = 0;
  // var s = "GeeksforGeeks";
  
  // Loop to initialize 2D array elements.
  for (let i = 0; i < which.size; i++) {
      for (let j = 0; j < 8; j++) {
  
          thurs[i][j] ='null';
      }
  }
  // console.log(wed);
  for(let j=1;j<=6;j++){
    let vis=new Map();
    let rooms=new Map();
    for(let i=0;i<which.size;i++){
      if(thurs[i][j]!=='null'){
        continue;
      }
      let l;
      if(labs.has(which.get(i))){
        l=labs.get(which.get(i));
      }
      
      if(labs.has(which.get(i))&&j===5&&l.length!==0){
        
        // console.log(l);
        let ind1=randomNumber(0,l.length-1);
        // console.log(ind1);

        let arr=generateRandomArray(l.length);
        let see=-1;
        for(let k=0;k<arr.length;k++){
          // console.log(l);
          let r=l[k][2];
          if(rooms.has(r)){
            continue;
          }else{
            ind1=k;
            thurs[i][j]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            thurs[i][j+1]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            rooms.set(l[ind1][2],1);
            l.splice(ind1,1);
            labs.set(which.get(i),l);
            see=1;
            break;
          }
        }

        if(see===1){
          continue;
        }
        
        
      }
      let v=myMap.get(which.get(i));
      // console.log(v);
      if(v.length===0){
        continue;
      }
      let n=v.length;
      let horizon=hori.get(which.get(i));
      let ind=randomNumber(0,n-1);
      let obj=v[ind];
      let teach=obj[0];
      let full=teach+','+obj[1];
      let room=obj[3];
      // console.log(teach);
      if(vis.has(teach)||horizon.has(full)||rooms.has(room)){
        for(let k=0;k<n;k++){
          let see=v[k];
          let t=see[0];
          let f=t+','+see[1];
          let r=see[3];
          if(vis.has(t)||horizon.has(f)||rooms.has(r)){

          }else{
            vis.set(t,1);
            let s=t+','+see[1]+','+see[3];
            let abc=t+','+see[1];
            rooms.set(see[3],1);
            horizon.set(abc,1);
            hori.set(which.get(i),horizon);
            thurs[i][j]=s;
            v[k][2]=v[k][2]-1;
            if(v[k][2]===0){
              v.splice(k,1);
            }
            myMap.set(which.get(i),v);
            break;
          }
        }
      }else{
        vis.set(teach,1);
        let a=teach+','+obj[1]+','+obj[3];
        let abcd=teach+','+obj[1];
        rooms.set(obj[3],1);
        horizon.set(abcd,1);
        hori.set(which.get(i),horizon);
        thurs[i][j]=a;

        v[ind][2]=v[ind][2]-1;
        if(v[ind][2]===0){
          v.splice(ind,1);
        }
        myMap.set(which.get(i),v);
      }
    }
    
  }
  console.log(thurs);
  // console.log(myMap);


  hori.clear();
  for(let i=0;i<which.size;i++){
    let see=which.get(i);
    // console.log(see);
    let horis=new Map();
    hori.set(see,horis);
  }
  
  var fri= new Array(which.size);
  for (let i = 0; i < fri.length; i++) {
      fri[i] = [];
  }
  // var h = 0;
  // var s = "GeeksforGeeks";
  
  // Loop to initialize 2D array elements.
  for (let i = 0; i < which.size; i++) {
      for (let j = 0; j < 8; j++) {
  
          fri[i][j] ='null';
      }
  }
  // console.log(wed);
  for(let j=1;j<=6;j++){
    let vis=new Map();
    let rooms=new Map();
    for(let i=0;i<which.size;i++){
      if(fri[i][j]!=='null'){
        continue;
      }
      let l;
      if(labs.has(which.get(i))){
        l=labs.get(which.get(i));
      }
      
      if(labs.has(which.get(i))&&j===5&&l.length!==0){
        
        // console.log(l);
        let ind1=randomNumber(0,l.length-1);
        // console.log(ind1);

        let arr=generateRandomArray(l.length);
        let see=-1;
        for(let k=0;k<arr.length;k++){
          // console.log(l);
          let r=l[k][2];
          if(rooms.has(r)){
            continue;
          }else{
            ind1=k;
            fri[i][j]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            fri[i][j+1]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
            rooms.set(l[ind1][2],1);
            l.splice(ind1,1);
            labs.set(which.get(i),l);
            see=1;
            break;
          }
        }

        if(see===1){
          continue;
        }
        
        
      }
      let v=myMap.get(which.get(i));
      // console.log(v);
      if(v.length===0){
        continue;
      }
      let n=v.length;
      let horizon=hori.get(which.get(i));
      let ind=randomNumber(0,n-1);
      let obj=v[ind];
      let teach=obj[0];
      let full=teach+','+obj[1];
      let room=obj[3];
      // console.log(teach);
      if(vis.has(teach)||rooms.has(room)){
        for(let k=0;k<n;k++){
          let see=v[k];
          let t=see[0];
          let f=t+','+see[1];
          let r=see[3];
          if(vis.has(t)||rooms.has(r)){

          }else{
            vis.set(t,1);
            let s=t+','+see[1]+','+see[3];
            let abc=t+','+see[1];
            rooms.set(see[3],1);
            horizon.set(abc,1);
            hori.set(which.get(i),horizon);
            fri[i][j]=s;
            v[k][2]=v[k][2]-1;
            if(v[k][2]===0){
              v.splice(k,1);
            }
            myMap.set(which.get(i),v);
            break;
          }
        }
      }else{
        vis.set(teach,1);
        let a=teach+','+obj[1]+','+obj[3];
        let abcd=teach+','+obj[1];
        rooms.set(obj[3],1);
        horizon.set(abcd,1);
        hori.set(which.get(i),horizon);
        fri[i][j]=a;

        v[ind][2]=v[ind][2]-1;
        if(v[ind][2]===0){
          v.splice(ind,1);
        }
        myMap.set(which.get(i),v);
      }
    }
    
  }
  console.log(fri);
  console.log(myMap);
  console.log(labs);

  return (
    <div id='content'>
        {
          (user!==null&&myUser.length!==0)  &&
          myUser.entries.map((entry)=>(
            <div>
                <Entry teacher={entry.teacher} subject={entry.subject} class={entry.class} maxi={entry.maxi} room={entry?.room} email={user?.result?.email}/>
            </div>
        ))
        }
        {
          user!==null &&
          arr.map((index)=>(
            <div>
                <Form key={index} />
            </div>
        ))
        }
        {
          user!==null &&
          <button>Generate</button>
        }
    </div>
  )
}

export default Home
