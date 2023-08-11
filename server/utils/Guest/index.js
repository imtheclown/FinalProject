'use strict';
const AddGuestToDB = require('./AddGuest').AddGuestToDB;
const FindEmailInDB = require('./SearchGuest').FindEmailInDB;

// checks if user email does already exists
// if email exists then it is assumed that the user is already registered
async function FindAndAdd(guestDetails) {
  const { name, email, mobile_number, affiliation } = guestDetails;
  let confirmation;
  await FindEmailInDB(email)
    .then(response => {
      if (response.length) {
        confirmation = 0;
      } else {
        confirmation = 1;
      }
    })
    .catch(error => {
      confirmation = error;
    });
  console.log(confirmation);
  if (confirmation === 1) {
    return await AddGuestToDB({
      name,
      email,
      mobile_number,
      affiliation
    }).catch(() => {
      return {
        message: 'something went wrong while saving guest',
        status: 400
      };
    });
  } else if (confirmation === 0) {
    return {
      message: 'email already exists',
      status: 409
    };
  } else {
    return confirmation;
  }
}

// searches for guests using searchtext
const FindGuestBySearchString = require('./SearchGuest')
  .FindGuestBySearchString;
async function RetrieveGuest(searchText) {
  if (searchText.length) {
    return await FindGuestBySearchString(searchText).catch(() => {
      return {
        message: 'something when wrong while searching for guests',
        status: 400
      };
    });
  }
}

const UpdateGuestInDB = require('./GuestUpdate').UpdateGuestInDB;

async function UpdateGuest(updatedGuestDetails) {
  if (updatedGuestDetails) {
    return await UpdateGuestInDB(updatedGuestDetails).catch(() => {
      return {
        message: 'A problem was encountered while updating the guest details',
        status: 400
      };
    });
  }
}

module.exports = {
  FindAndAdd,
  RetrieveGuest,
  UpdateGuest
};
