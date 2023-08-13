'use strict';
const AddGuestToDB = require('./AddGuest').AddGuestToDB;
const FindEmailInDB = require('./SearchGuest').FindEmailInDB;
//i do not know basic engluis
// checks if user email does already exist
// if email exists then it is assumed that the user is already registered
async function FindAndAdd(guestDetails) {
  const { name, email, mobile_number, affiliation } = guestDetails;
  let confirmation;
  // searches if email is already used
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
  // email is not used
  if (confirmation === 1) {
    // create a new document based on the guest model
    return await AddGuestToDB({
      name,
      email,
      mobile_number,
      affiliation
    })
      //catch error
      .catch(() => {
        return {
          message: 'something went wrong while saving guest',
          status: 400
        };
      });
  } else if (confirmation === 0) {
    // returns message that email already exists
    return {
      message: 'email already exists',
      status: 409
    };
  } else {
    // returns error message
    return confirmation;
  }
}

// searches for guests using searchtext
const FindGuestBySearchString = require('./SearchGuest')
  .FindGuestBySearchString;
const GetRegisteredUser = require('./SearchGuest').GetRegisteredUsers;
async function RetrieveGuest(searchText, event_id) {
  if (searchText.length && event_id) {
    try {
      let matchedGuests = await FindGuestBySearchString(searchText).catch(
        error => {
          throw error;
        }
      );
      // there are matches for the search string
      let registeredUsers;
      if (matchedGuests.length) {
        registeredUsers = await GetRegisteredUser(event_id);
      }
      // there are registered users for the give event
      if (registeredUsers && registeredUsers.length) {
        for (let matchedGuest in matchedGuests) {
          const matched = registeredUsers.find(value => {
            return (
              value.guest_id.toString() ===
              matchedGuests[matchedGuest]._id.toString()
            );
          });
          const { _id, email, mobile_number, affiliation } = matchedGuests[
            matchedGuest
          ];
          let newValue = {
            _id,
            email,
            mobile_number,
            affiliation
          };
          if (matched) {
            newValue.is_registered = true;
            matchedGuests[matchedGuest] = newValue;
          } else {
            newValue.is_registered = false;
            matchedGuests[matchedGuest] = newValue;
          }
        }
      } else {
        for (let matchedGuest in matchedGuests) {
          matchedGuests[matchedGuest].is_registered = false;
        }
      }
      return matchedGuests;
    } catch (error) {
      console.log(error);
      return error;
    }
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
