const { Schema, model } = require("mongoose");
// const reactionSchema = require("./Reactions");

// Schema to create a book model
const bookSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    bookAuthor: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      // the user that added this book
      type: String,
      // required: true,
    },
    reaction:{
      type:String,
    required:true,},

    publicImageURL: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

const Book = model("Book",bookSchema)

module.exports = Book
