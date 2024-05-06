// const { Schema, Types } = require('mongoose');

// // // regex for emojireaction
// // const thumbsUpRegex = /👍/;
// // const thumbsDownRegex = /👎/;

// const reactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId(),
//     },
//     reactionBody: {
//       type: String, 
//       required: true,
//       // validate: {
//       //   validator: function (value) {
//       //       return thumbsUpRegex.test(value) || thumbsDownRegex.test(value);
//       //         },
//       //   message: 'Invalid emoji input.',
//       // }
//     },
//     rating:{
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5,
//     },
//     username: {
//         type: String,
//         required: true,
//       },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//     id: false,
//   }
// );

// module.exports = reactionSchema;