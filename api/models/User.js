const mongoose = require('mongoose');
const validator = require('validator');


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide your name!'],
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required:[true, 'Please provide your email!'],
      unique: true,
      lowercase:true,
      //validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      minlenght: 6,
      //! Select hata veriyor...
      //select: false,
    }
    //! Su an burasi hata veriyor. bunu token ve authController refactor edildikten sonra uygulayalim.
    ,
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password!'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    } 
    ,
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    role: {
      type: String,
      enum: ['user', 'ratified user', 'developer', 'moderator', 'admin'],
      default: 'user'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);