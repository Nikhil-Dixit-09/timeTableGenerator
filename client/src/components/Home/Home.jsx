import React from 'react'
import { useState } from 'react'
import './Home.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addFixed, getInfo } from '../../actions/user'
import Form from '../Form/Form'
import Fixed from '../Fixed/Fixed'
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
    const [fixed,setFixed]=useState({
      day:'Monday',
      class:'',
      subject:'',
      teacher:'',
      room:'',
      timeslot:'09-10AM',
      email:user?.result?.email
    });
    const handleFixed=(e)=>{
      e.preventDefault();
      console.log(fixed);
      dispatch(addFixed(fixed));
    }
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
      //the myMap will hold the dependencies of classes particular class should have
      let which=new Map();
      //since we will be dealing with the indices of the 2d matrix, there should be a mapping from the indice to the class
      let labs=new Map();
      //since labs are of 2 hours we need a special track of them
      let list=[];
      //list is the list of all the classes, and we will sort it so that there is no irregularity based on the data entered by the user
      for(let i=0;i<myUser.entries.length;i++){
        let teacher=myUser.entries[i].teacher;
        //accessing the teacher from the entries
        let subject=myUser.entries[i].subject;
        //accessing the subject from the entries
        let clas=myUser.entries[i].class;
        //accessing the class from the enetries
        let maxi=myUser.entries[i].maxi;
        //accessing the maxi from the entries
        let room=myUser.entries[i].room;
        //accessing the room from the entries
        let see=subject.slice(-3);
        //checking if it is a lab or not
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
        //inserting the class dependencies
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
        //inserting the class dependecies
      }
      list.sort();
      for(var i=0;i<list.length;i++){
        which.set(i,list[i]);
      }
      console.log(which);
      console.log(myMap);
      console.log(labs);
      var monday= new Array(which.size);
      //now we will initialize a day monday
    for (let i = 0; i < monday.length; i++) {
        monday[i] = [];
    }
    //which will have 8 columns for sure which are the class timmings and rows would depend on the number of classes 
    
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
    //hori is a map which will have a mapping of which classes took place that day, because we don't want that all the classes
    //of a particular subject should be held on a particular day. As it will be boredom for the students to study the same subject.
    for(let i=0;i<which.size;i++){
      let see=which.get(i);
      console.log(see);
      let horis=new Map();
      hori.set(see,horis);
    }
    //doing the initial configuration as instead of classes we will be using the row indice to speed up the process
    for(let j=1;j<=6;j++){
      let vis=new Map();
      //vis is a vertical map, since the teacher who is taking class at a class should not be present in other days
      let rooms=new Map();
      //rooms is a map which will take care of the rooms where the classes is going on, room which is already alloted in a 
      //particular time slot should not be alloted to any other class that day
      for(let i=0;i<which.size;i++){
        if(monday[i][j]!=='null'){
          continue;
        }
        //we will move on if some class is already allocated
        let l;
        if(labs.has(which.get(i))){
          l=labs.get(which.get(i));
        }
        //since in general the labs are held after lunch, we are doing so but can be changed if the user wants it to be held
        //somewhere else
        
        if(labs.has(which.get(i))&&j===5&&l.length!==0){
          
          console.log(l);
          let ind1=randomNumber(0,l.length-1);
          console.log(ind1);
          //for random ness we are generating the random arr so that we can generate multiple time tables 
          let arr=generateRandomArray(l.length);
          let see=-1;
          for(let k=0;k<arr.length;k++){
            
            let r=l[k][2];
            if(rooms.has(r)){
              continue;
            }else{
              ind1=k;
              //we will allocate a value to the monday as shown.
              monday[i][j]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
              monday[i][j+1]=l[ind1][1]+','+l[ind1][0]+','+l[ind1][2];
              //and since the lab is of two hours we are also setting it up the one after it
              rooms.set(l[ind1][2],1);
              //we are setting up the room alloted
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
      //here we are fetching the dependencies of the class which we encoded in a indice
      
      if(v.length===0){
        continue;
      }
      //if there are no indices left, continue
      let n=v.length;
      let horizon=hori.get(which.get(i));
      //horizon is the map or the classes which have already took place for that particular class on which we are
      let ind=randomNumber(0,n-1);
      //let's take a random value and try to insert it.
      let obj=v[ind];
      //see the teacher, subject
      let teach=obj[0];
      let full=teach+','+obj[1];
      let room=obj[3];
      
      //vis.has(teach), that means the teacher is already present somewhere
      //if horizon has the combo of teacher+subject, that means the subject is already held that day so move on
      //if rooms.has(room) the room is right now available as some class is already alloted to it
      if(vis.has(teach)||horizon.has(full)||rooms.has(room)){
        for(let k=0;k<n;k++){
          //now let's try to allocate any other class, we are not generating random values again since it may get trapped into
          //an infinite loop, and we want to be aware of the uncaught runtime errors
          let see=v[k];
          let t=see[0];
          let f=t+','+see[1];
          let r=see[3];
          //checking the same condition
          if(vis.has(t)||horizon.has(f)||rooms.has(r)){

          }else{
            //we can set the teacher 
            vis.set(t,1);
            let s=t+','+see[1]+','+see[3];
            //s will be alloted to the monday[i][j]
            let abc=t+','+see[1];
            //let us set the room allocated
            rooms.set(see[3],1);
            //let us set the horizon map that is the combo of teacher+subject, we are not setting up the s,
            //as if for example KVA,ADA has taken place, than KVA,ADA will not occur but KVA,COA can occur on the same day
            horizon.set(abc,1);
            hori.set(which.get(i),horizon);
            monday[i][j]=s;
            v[k][2]=v[k][2]-1;
            //let reduce the classes which we have to take the classes, if it is 0 remove it from the mymap which consist of the 
            //dependencies to be done, for a particular class or classes left
            if(v[k][2]===0){
              v.splice(k,1);
            }
            //again setting up the mymap after updating the dependency
            myMap.set(which.get(i),v);
            break;
          }
        }
      }else{
        //doing the same thing which we done before
        vis.set(teach,1);
        //setting up the teacher
        let a=teach+','+obj[1]+','+obj[3];
        //value to be allocated to the monday[i][j]
        let abcd=teach+','+obj[1];
        //setting up the room
        rooms.set(obj[3],1);
        //setting the horizon map
        horizon.set(abcd,1);
        //updating the hori map
        hori.set(which.get(i),horizon);
        monday[i][j]=a;

        v[ind][2]=v[ind][2]-1;
        //removing dependecy if classes over
        if(v[ind][2]===0){
          v.splice(ind,1);
        }
        myMap.set(which.get(i),v);
      }
    }
    
  }
  //we will repeat this type of algo, for other days but labs, mymap which consist of the dependencies will be global to us
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
  
  const rowsmon = monday.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td>{which.get(rowIndex)}</td>
      {row.map((cell, cellIndex) => (
        cell === 'null' ? (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{}</td>
        ) : (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{cell}</td>
        )
      ))}
    </tr>
  ));
  const rowstue = tue.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td>{which.get(rowIndex)}</td>
      {row.map((cell, cellIndex) => (
        cell === 'null' ? (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{}</td>
        ) : (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{cell}</td>
        )
      ))}
    </tr>
  ));
  const rowswed = wed.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td>{which.get(rowIndex)}</td>
      {row.map((cell, cellIndex) => (
        cell === 'null' ? (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{}</td>
        ) : (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{cell}</td>
        )
      ))}
    </tr>
  ));
  const rowsthurs = thurs.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td>{which.get(rowIndex)}</td>
      {row.map((cell, cellIndex) => (
        cell === 'null' ? (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{}</td>
        ) : (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{cell}</td>
        )
      ))}
    </tr>
  ));
  const rowsfri = fri.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td>{which.get(rowIndex)}</td>
      {row.map((cell, cellIndex) => (
        cell === 'null' ? (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{}</td>
        ) : (
          <td key={cellIndex} style={{ minWidth: '125px' }}>{cell}</td>
        )
      ))}
    </tr>
  ));
  const timeSlotsRow = [
    '',
    '09-10 AM',
    '10-11 AM',
    '11-12 PM',
    '12-01 PM',
    '02-03 PM',
    '03-04 PM',
    '04-05 PM',
    '05-06 PM',
  ];
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

        <div>Make it customizable!!</div>
        {
          (user!==null&&myUser.length!==0)  &&
          myUser.fixed.map((entry)=>(
            <div>
                <Fixed teacher={entry.teacher} subject={entry.subject} class={entry.class}  room={entry?.room} email={user?.result?.email} timeslot={entry.timeslot} day={entry?.day}/>
            </div>
        ))
        }
        <form onSubmit={handleFixed}>
            <div className='containe'>

            <div className='in'>Day: </div>
            <select onChange={(e)=>setFixed({...fixed,day:e.target.value})}>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
             
            </select>
          

            <div className='in'>Class: </div>
            <input className='inpt' type='text' onChange={(e)=>setFixed({...fixed,class:e.target.value})}></input>

            <div className='in'>Subject: </div>
            <input className='inpt' type='text' onChange={(e)=>setFixed({...fixed,subject:e.target.value})}></input>

            <div className='in'>Teacher:  </div>
            <input className='inpt' type='text'onChange={(e)=>setFixed({...fixed,teacher:e.target.value})} ></input>

            <div className='in'>Room Number: </div>
            <input className='inpt' type='text'onChange={(e)=>setFixed({...fixed,room:e.target.value})}></input>

            <div className='in'>Time Slot: </div>
            <select onChange={(e)=>setFixed({...fixed,timeslot:e.target.value})}>
              <option value="09-10AM">09-10AM</option>
              <option value="10-11AM">10-11AM</option>
              <option value="11-12PM">11-12PM</option>
              <option value="12-01PM">12-01PM</option>
              <option value="02-03PM">02-03PM</option>
              <option value="03-04PM">03-04PM</option>
              <option value="04-05PM">04-05PM</option>
            </select>
            <div>
                <button type='submit'>Add Entry</button>
            </div>
            </div>
            
        </form>
    <div className='day'>Monday</div>
    <table>
      <tbody>
        <tr>
          {timeSlotsRow.map((timeSlot, index) => (
            <th key={index}>{timeSlot}</th>
          ))}
        </tr>
        {rowsmon}
      </tbody>
    </table>
    <div className='day'>Tuesday</div>
    <table>
      <tbody>
        <tr>
          {timeSlotsRow.map((timeSlot, index) => (
            <th key={index}>{timeSlot}</th>
          ))}
        </tr>
        {rowstue}
      </tbody>
    </table>
    <div className='day'>Wednesday</div>
    <table>
      <tbody>
        <tr>
          {timeSlotsRow.map((timeSlot, index) => (
            <th key={index}>{timeSlot}</th>
          ))}
        </tr>
        {rowswed}
      </tbody>
    </table>
    <div className='day'>Thursday</div>
    <table>
      <tbody>
        <tr>
          {timeSlotsRow.map((timeSlot, index) => (
            <th key={index}>{timeSlot}</th>
          ))}
        </tr>
        {rowsthurs}
      </tbody>
    </table>
    <div className='day'>Friday</div>
    <table>
      <tbody>
        <tr>
          {timeSlotsRow.map((timeSlot, index) => (
            <th key={index}>{timeSlot}</th>
          ))}
        </tr>
        {rowsfri}
      </tbody>
    </table>
    </div>
  )
}

export default Home
