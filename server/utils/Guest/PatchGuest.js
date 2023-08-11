'use strict';
const GuestModel = require('../../models').GuestModel;
async function PatchGuestInDB(guestID) {
  try {
    const guest = await GuestModel.findById(guestID);
    if (guest) {
      guest.is_registered = true;
      guest.save();
    }
    return 1;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  PatchGuestInDB
};
