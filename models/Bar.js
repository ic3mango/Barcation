const mongoose = require('mongoose');
const { Schema } = mongoose;

function toFutureDate12Hours(date) {
  const min = 1000 * 60;
  const hour = 60 * min;
  return new Date(date.getTime() + 12 * hour);
}

const barSchema = new Schema({
  yelpId: {
    type: String,
    required: true
  },
  createDate: Date,
  updateDate: Date,
  expireDate: Date,
  patrons: [String]
});

barSchema.pre('save', function(next) {
  this.updateDate = Date.now();
  this.expireDate = toFutureDate12Hours(this.updateDate)// 2 mins in future

  next();
});

barSchema.index({ expireDate: 1 }, { expireAfterSeconds: 0 });

barSchema.on("index", function(error) {
  console.log(error.message);
  console.log('index created');
});



mongoose.model('Bar', barSchema);
