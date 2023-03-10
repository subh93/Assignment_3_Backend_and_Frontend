const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const dotenv = require('dotenv');
const path = require('path')
const bodyParser = require('body-parser');
const AD = require('./routes/AllData');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use('/v1/api', AD);

app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", function(req,res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

db().then(()=>{
app.listen(process.env.PORT, async() => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
})
