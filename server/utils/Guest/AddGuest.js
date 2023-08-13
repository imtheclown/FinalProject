'use strict';

const GuestModel = require('../../models').GuestModel;

function AddGuestToDB(guestDetails) {
  return new Promise((resolve, reject) => {
    try {
      // create a new document based on guest model
      GuestModel.create(guestDetails, () => {
        // resolve if successful
        resolve({
          message: 'guest successfully added to the database',
          status: 200
        });
      });
      //   reject if some error is encountered
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  AddGuestToDB
};
