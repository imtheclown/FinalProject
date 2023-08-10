'use strict';
//checks if email provides is already used

const GuestModel = require('../../models/index').GuestModel;

function FindEmailInDB(email) {
  return new Promise((resolve, reject) => {
    try {
      GuestModel.find({ email }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

function FindGuestBySearchString(searchString) {
  const regExp = new RegExp(searchString, 'ig');
  return new Promise((resolve, reject) => {
    try {
      GuestModel.find({ name: regExp }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  FindEmailInDB,
  FindGuestBySearchString
};
