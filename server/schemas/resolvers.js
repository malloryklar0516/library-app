// add resolvers for book and user

const { User, Book} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //removing all users
    // user: async () => {
    //     return User.find().populate("booksRead");
    //   },

    // single user also removing this.
    // userbyUsername: async (parent, { username }) => {
    //     return User.findOne({ username }).populate("booksRead");
    //   },

    //I believe this should work to authenticate a single user who is signed on
    //then present the booksread by that particular user

    //   async (args, context) => commented this out as I dont think there are any args in this case?
    me: async (_,__,context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    //all books
    books: async () => {
      return await Book.find({});
    },

    //single book
    bookbyID: async (parent, { _id }) => {
      return Book.findOne({ _id });
    },
  },

  Mutation: {
    //mutation to add a user/login
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    //mutation to add a reaction
    //starting to consider removing the reactionBody with emojis for now
    //coded best I could as if it is there tho
    // addReaction: async (parent, { bookID, reactionBody, rating, username }, context) => {
    //   if (context.user) {
    //     const book = await Book.findOneAndUpdate(
    //       { _id: bookID },
    //       {
    //         $push: { reactions: { reactionBody, rating,username } },
    //       },
    //       { runValidators: true, new: true }
    //     );

    //     // await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { reaction: reaction._id } });

    //     return book;
    //   }
    //   throw AuthenticationError;
    // },
    addBook: async (parent, args, context) => {
      if (context.user) {
        console.log("hit")
        const book = await Book.create({
          bookName: args.bookName,
          bookAuthor: args.bookAuthor,
          reaction: args.reaction,
          username: context.user.username
        });
        console.log("book", book)
        const user = await User.findOneAndUpdate(
          { _id: args.userid },
          { $push: { booksRead: book } },
          { runValidators: true, new: true }
        );
        return book;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
