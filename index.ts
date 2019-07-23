const express = require('express')
const app = express()
require('dotenv').config()
import GetPods from './src/controllers/GetPods';

const PORT = `${process.env.PORT}`;

app.listen(PORT,()=> console.log("Server is Running."));

app.get('/', async function (req, res) {
  let result = await GetPods.getPods();
  console.log("result",result);
  res.send(result);
})

app.get('/getpods', function (req, res) {
  res.send('About, World!')
})