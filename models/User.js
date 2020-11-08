const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // saltRound를 10자리로 생성

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', function(next) {
  //save 하기전에 (route의 user.save 전에)
  var user = this;
  // 비밀번호 변경시에만 암호화 실행
  if (user.isModified('password')) {
    // 비밀번호 암호화 시킨다
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err); // next를 하게 되면 index.js로 넘어감
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
