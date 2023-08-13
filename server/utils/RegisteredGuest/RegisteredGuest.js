'use strict';
const RegisteredUserModel = require('../../models').RegisteredGuestModel;

async function AddRegisteredUserToDB(registeredUserDetails) {
  try {
    // create a new document based on registeredusermodel
    await RegisteredUserModel.create(registeredUserDetails).catch(error => {
      throw error;
    });
    // return success messsage
    return {
      message: 'successfully registered guest',
      status: 200
    };
    //   catch error and return a error message
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
