const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  twitterId: String,
  twitterName: String,
  history: [String]
});

mongoose.model('User', userSchema);
