'use strict';
const GuestModel = require('../../models').GuestModel;
// changes the is_registered field in guest document to true
async function PatchGuestInDB(guestID) {
  try {
    // search for the guest document
    const guest = await GuestModel.findById(guestID);
    if (guest) {
      guest.is_registered = true;
      guest.save();
    }
    // return 1 for successful query
    return 1;
  } catch (error) {
    // for debugging
    console.log(error);
    return 0;
  }
}

module.exports = {
  PatchGuestInDB
};
