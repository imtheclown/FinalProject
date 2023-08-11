'use strict';

module.exports = (mongoose, Schema) => {
  const EventSchema = new Schema({
    name: String
  });
  return mongoose.model('event', EventSchema);
};
