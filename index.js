// express 연결
const express = require('express');
const app = express();
const port = 5000;

// mongoose 연결
const mongoose = require('mongoose');

//.env로 몽고 커넥트 주소 숨김
const dotenv = require('dotenv');
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
