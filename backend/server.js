const express= require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}));


const dbConnection = require('./util/db_connection');
const userAuth =  require('./routes/userAuth');
const emailRoute = require('./routes/emailRoute');

app.use(userAuth);

app.use(emailRoute);


dbConnection().then(resp =>{

    app.listen(PORT,()=> console.log(`server is successfully running on port ${PORT}`))

}).catch(err => console.log(err,'something went wrong while connecting to db'))


