const { Schema, model } = require('mongoose');
const Book = require('./Book');
const reactionSchema = require('./Reactions');
const bcrypt = require('bcrypt');
// Schema to create username model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //look into Mongoose matching validation, must match valid email
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    booksRead: [Book.schema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  });

  userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  // userSchema.virtual('bookCount').get(function () {
  //   return this.booksRead.length;
  // });
const User = model('User', userSchema);

module.exports = User;