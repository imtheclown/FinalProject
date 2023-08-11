'use strict';

module.exports = (mongoose, Schema) => {
  const RegisteredGuestSchema = new Schema({
    guest_id: { type: mongoose.Types.ObjectId, ref: 'Guest' },
    terminal: Number,
    event_id: String
  });
  return mongoose.model('RegisteredGuest', RegisteredGuestSchema);
};
