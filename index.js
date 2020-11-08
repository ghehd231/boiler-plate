// express 연결
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');

// x-www-form-urlencoded 분석해 가져오기
app.use(bodyParser.urlencoded({ extended: true }));
// json타입 분석해 가져오기
app.use(bodyParser.json());

const config = require('./config/key');

// mongoose 연결
const mongoose = require('mongoose');

// .env로 몽고 커넥트 주소 숨김-> config/key에서 로컬/배포로 분기
// const dotenv = require('dotenv');
// dotenv.config();

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

// 회원가입 라우터
app.post('/register', (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져오면 DB에 넣어줌
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
