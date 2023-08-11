'use strict';
const RegisteredUserModel = require('../../models').RegisteredGuestModel;
const PatchGuestInDB = require('../Guest/PatchGuest').PatchGuestInDB;

async function AddRegisteredUserToDB(registeredUserDetails) {
  try {
    await RegisteredUserModel.create(registeredUserDetails).catch(error => {
      throw error;
    });
    const { guest_id } = registeredUserDetails;
    await PatchGuestInDB(guest_id).catch(error => {
      throw error;
    });
    return {
      message: 'successfully registered guest',
      status: 200
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'a problem is encountered while registering the guest',
      status: 400
    };
  }
}
module.exports = {
  AddRegisteredUserToDB
};
