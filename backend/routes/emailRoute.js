const express = require("express")
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/postemail',(req,res)=>{
    
    console.log(req.body)
    res.json({msg: 'checking'})

})

module.exports = router;