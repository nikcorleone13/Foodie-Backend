const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const {makeConnection}  = require('./connecttion/dbConnection')
const PORT = process.env.PORT
require('./services/restoServices')
const restoRoutes = require('./routes/routes')

makeConnection();

app.use(bodyParser.json());
bodyParser.json();

app.use(express.json());
app.use('/',restoRoutes);
app.get("/",(req,res) =>{
    res.send("Welcome to Assignment-12- Zomato Like APIs")
})

app.listen(PORT, () => {
    console.log(`Server is running for User-Management on port ${PORT}`);
  });
