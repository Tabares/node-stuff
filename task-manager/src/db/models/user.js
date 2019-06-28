const mongoose = require('mongoose');
const validator = require('validator');
const bcryp = require('bcryptjs');
const jwt = require('jsonWebToken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 7,
      validate(value) {
        if (value.length <= 6) {
          throw new Error('The length of password must be greater thant 6');
        } else if (value.toLowerCase().includes('password')) {
          throw new Error('The password is using the word password');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar
  return userObject;
};

userSchema.pre('remove', async function(req, res, next) {
  const user = this;
  Task.deleteMany({ owner: user._id });
  next();
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.getPublicProfile = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
  user.tokens = user.tokens.concat({ token });
  console.log(user);
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcryp.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to match login');
  }

  return user;
};

userSchema.pre('save', async function(next) {
  const user = this;
  // console.log(user);
  // console.log('just before save hh', user.isModified('password'));
  if (user.isModified('password')) {
    user.password = await bcryp.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
