'use strict';

module.exports = (mongoose, Schema) => {
  const GuestSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile_number: { type: String, required: true },
    affiliation: { type: String, required: true },
    is_registered: { type: Boolean, default: false }
  });
  return mongoose.model('Guest', GuestSchema);
};
