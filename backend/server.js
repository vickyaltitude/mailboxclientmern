const express= require('express');
const app = express();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const dbConnection = require('./util/db_connection');


dbConnection().then(resp =>{

    app.listen(PORT,()=> console.log(`server is successfully running on port ${PORT}`))

}).catch(err => console.log(err,'something went wrong while connecting to db'))


