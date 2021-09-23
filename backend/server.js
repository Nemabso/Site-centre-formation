
var express = require('express')
var bodyParser = require('body-parser') 
var cors = require('cors')
const mongoose = require('mongoose')
var app = express() 
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mtoudalachi:Mtoudalachi123@cluster0.rtxdd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectDB=require("./DB/connection")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
const userapi = require('./routes/userapi');
dotenv.config();

// parse application/json
app.use(bodyParser.json()) 
 

//Connnection to Database
/*mongoose.connect(process.env.DB_URL,
  { useUnifiedTopology: true,useUnifiedTopology: true },
  () => console.log('Connected to DB!')
  );
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

//Middleware
app.use(express.json());
app.use(cors())
app.use('/',userapi);


//app.use('/',userapi);

connectDB();
app.get('/', function (req, res) {
    res.send('Hello World mohamsadsffdgf!')
  })

  app.get('/hey', function (req, res) {
    res.send('Hello World!')
  })
  

app.listen(5000, function () {
    console.log('Listening on port 5000...')
  })