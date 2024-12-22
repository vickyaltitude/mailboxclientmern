const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const Users = require('../model/userModel');
const generateToken = require('../util/jwt');

router.post('/usersignup',(req,res)=>{
    const userEmail = req.body.email;
    const userPassword = req.body.confirmPassword;

    bcrypt.hash(userPassword,10,(err,hash)=>{
         if(err){
            console.log(err,'error while hashing password');
            return
         }
         const newUser = new Users({
            email: userEmail,
            password: hash
         })

         newUser.save().then(resp =>{
            console.log(resp)
            res.json({msg:'user inserted successfully'});
         }).catch(err => {
            console.log(err)
            res.json({msg:'Error while inserting user into db'});
         })
    })
    
})

router.post('/userlogin',(req,res)=>{
     const userDetails = req.body;
   
     Users.find({email: userDetails.userEmail}).then(resp =>{
           console.log(resp)
           if (resp) {

            bcrypt.compare(userDetails.password.toString(),resp[0].password,(err,result)=>{
        
                if(err){
                    res.status(500).json({msg: 'Something went wrong!!'})
                }
                if(result == true){
                    res.json({msg: 'User login successfull',userId: generateToken.encryptuserid(resp[0]._id.toString(),resp[0].email)})
                }
                else{
                    res.status(401).json({msg: 'Password entered is incorrect!'})
                }
            })
           
        } else {
         
            res.status(404).json({msg: 'User Email not found!'})
        }

     }).catch(err =>{
        console.log(err)
        res.status(404).json({msg: 'database error for finding user'})
     })

})


module.exports = router;