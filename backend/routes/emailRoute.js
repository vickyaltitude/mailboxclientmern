const express = require("express")
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserEmails = require('../model/emails');

router.post('/postemail',(req,res)=>{

    const userDetails = jwt.verify(req.body.userDetails,process.env.JWT_TOKEN_SECRET);
    console.log(userDetails);
    
    console.log(req.body)
     const newEmail = new UserEmails({
        senderEmail: userDetails.userName,
        recipientEmail: req.body.mail.email,
        emailSubject: req.body.mail.subject,
        emailBody: req.body.mail.message
    })
    newEmail.save().then(resp =>{

        res.json({msg: 'email sent successfully'})
         
    }).catch(err =>{
        console.log(err)
        res.json({msg: 'db failure while inserting email'})
    })
   

})


router.get('/getemail',(req,res)=>{
     const userToken = req.headers.authorization;
     const userDetails = jwt.verify(userToken,process.env.JWT_TOKEN_SECRET);
     console.log(userDetails)
     UserEmails.find({recipientEmail: userDetails.userName}).then(resp =>{
        res.json({msg:'email fetch successful',data: resp})


    }).catch(err =>{
        console.log(err)
        res.json({msg: 'error while fetching user'})

    })


     })


     router.post('/reademail',(req,res)=>{
      
         UserEmails.findOneAndUpdate({_id: req.body.emailId},{$set:{emailOpened: true}},{new:true}).then(resp =>{
            
            res.json({msg:'mail read set success'})

         }).catch(err =>{ 
            
            console.log(err)
            res.json({msg:'mail read set failed'})
        })
        
     })
     
     
module.exports = router;