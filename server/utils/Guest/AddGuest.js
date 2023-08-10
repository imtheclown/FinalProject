'use strict';

const GuestModel = require('../../models').GuestModel;

function AddGuestToDB(guestDetails) {
  return new Promise((resolve, reject) => {
    try {
      GuestModel.create(guestDetails, () => {
        resolve({
          message: 'guest successfully added to the database',
          status: 200
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function AddGuest(guestDetails) {
  return await AddGuestToDB(guestDetails);
}

module.exports = {
  AddGuest,
  AddGuestToDB
};
