'use strict';
const GuestModel = require('../../models').GuestModel;
async function UpdateGuestInDB(updatedDetails) {
  try {
    const {
      name,
      email,
      mobile_number,
      affiliation,
      guest_id
    } = updatedDetails;
    const result = await GuestModel.updateOne(
      { _id: guest_id },
      {
        name: name,
        email: email,
        mobile_number: mobile_number,
        affiliation: affiliation
      },
      error => {
        if (error) {
          throw error;
        } else {
          return 1;
        }
      }
    );
    if (result) {
      return {
        message: 'guest successfully updated',
        status: 200
      };
    } else {
      return {
        message: 'guest details is not found',
        status: 404
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: 'failed to update the guest details',
      status: 400
    };
  }
}

module.exports = {
  UpdateGuestInDB
};
