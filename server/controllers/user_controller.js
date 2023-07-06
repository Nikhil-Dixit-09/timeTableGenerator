const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const { default: mongoose } = require('mongoose');
module.exports.signin=async function(req,res){
    // console.log(req.body);
    try{
        const existingUser=await User.findOne({email:req.body.email});
        if(!existingUser){
            return res.staus(404).json({message:"User does not exist"})
        }
        const isPasswordCorrect=await bcrypt.compare(req.body.password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},'seproject',{expiresIn:"1h"});
        return res.status(200).json({result:existingUser,token})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}
module.exports.signup=async function(req,res){
    // console.log(req.body);
    try{
        const existingUser=await User.findOne({email: req.body.email});
        if(existingUser) return res.status(400).json({message:"User already exists"});
        if(req.body.password!=req.body.confirmPassword){
            return res.status(400).json({message:"Passwords don't match"});
        }
        const hashedPassword=await bcrypt.hash(req.body.password,12);
        const result=await User.create({email:req.body.email,password:hashedPassword,institute:req.body.institute});
        const token=jwt.sign({email:result.email,id:result._id},'timetable',{expiresIn:"1h"});  
        // console.log(result);
        return res.status(200).json({result,token}); 
    }catch(err){
        console.log(err);
    }
}
module.exports.addEntry=async function(req,res){
    try{
        // console.log(req.body);
        // console.log('eneeeee')
        const user=await User.findOne({email:req.body.email});
        var obj={};
        obj.teacher=req.body.teacher;
        obj.subject=req.body.subject;
        obj.class=req.body.class;
        obj.maxi=req.body.maxi;
        obj.room=req.body.room;
        user.entries.push(obj);
        user.save();
        return res.status(200).json({data:user});
    }catch(err){
        console.log(err);
    }
}
module.exports.getInfo=async function(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        // console.log('hiiiiii')
        return res.status(200).json({data:user});
    }catch(err){
        console.log(err);
    }
}
module.exports.delEntry=async function(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        let obj={};
        obj.teacher=req.body.teacher;
        obj.subject=req.body.subject;
        obj.class=req.body.class;
        obj.maxi=req.body.maxi;

        for(let i=0;i<user.entries.length;i++){
            if(user.entries[i].teacher==obj.teacher&&user.entries[i].subject==obj.subject&&user.entries[i].class==obj.class&&user.entries[i].maxi==obj.maxi){
                user.entries.splice(i,1);
                break;
            }
        }   
        // console.log(user.entries);
        user.save();
        return res.status(200).json({data:user});
    }catch(err){
        console.log(err);
    }
}
module.exports.addFixed=async function(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        var obj={};
        obj.day=req.body.day;
        obj.teacher=req.body.teacher;
        obj.subject=req.body.subject;
        obj.class=req.body.class;
        obj.room=req.body.room;
        obj.timeslot=req.body.timeslot;
        user.fixed.push(obj);
        user.save();
        return res.status(200).json({data:user});

    }catch(err){
        console.log(err);
    }
}
module.exports.delFixed=async function(req,res){
    try{
        console.log('hii','aaaaaaaaaa');
        const user=await User.findOne({email:req.body.email});
        var obj={};
        obj.day=req.body.day;
        obj.teacher=req.body.teacher;
        obj.subject=req.body.subject;
        obj.class=req.body.class;
        obj.room=req.body.room;
        obj.timeslot=req.body.timeslot;
        for(let i=0;i<user.fixed.length;i++){
            if(user.fixed[i].teacher==obj.teacher&&user.fixed[i].subject==obj.subject&&user.fixed[i].class==obj.class&&user.fixed[i].day==obj.day&&user.fixed[i].timeslot==obj.timeslot&&user.fixed[i].room==obj.room){
                user.fixed.splice(i,1);
                break;
            }
        }   
        // console.log(user.entries);
        user.save();
        return res.status(200).json({data:user});
    }catch(err){
        console.log(err);
    }
}
module.exports.addPairing=async function(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        var obj={};
        obj.teacher=req.body.teacher;
        obj.subject=req.body.subject;
        obj.class1=req.body.class1;
        obj.class2=req.body.class2;
        obj.class3=req.body.class3;
        user.pairing.push(obj);
        user.save();
        return res.status(200).json({data:user});
    }catch(err){
        console.log(err);
    }
}
module.exports.delPairing=async function(req,res){
    try{
        
        const user=await User.findOne({email:req.body.email});
        var obj={};
        obj.teacher=req.body.teacher;
        obj.subject=req.body.subject;
        obj.class1=req.body.class1;
        obj.class2=req.body.class2;
        obj.class3=req.body.class3;
        for(let i=0;i<user.pairing.length;i++){
            if(user.pairing[i].teacher==obj.teacher&&user.pairing[i].subject==obj.subject&&user.pairing[i].class1==obj.class1&&user.pairing[i].class2==obj.class2&&user.pairing[i].class3==obj.class3){
                user.pairing.splice(i,1);
                break;
            }
        }   
        // console.log(user.entries);
        user.save();
        return res.status(200).json({data:user});
    }catch(err){
        console.log(err);
    }
}