'use strict';
const EventModel = require('../../models').EventModel;
const port = require('../../config').port;
async function GetEventDetailsFromDB(eventName) {
  try {
    // get the event details
    const result = await EventModel.findOne({
      name: eventName
    })
      .then(response => {
        // execute if event is found
        if (response) {
          // deconstruct response
          const { name, _id } = response;
          // generate url for images
          const { mobile_url, desktop_url } = GenerateURL(eventName);
          // return data
          return {
            status: 200,
            data: {
              name,
              _id,
              mobile_url,
              desktop_url
            }
          };
          //   execute if event is not found
        } else {
          return {
            status: 404,
            data: []
          };
        }
      })
      // throw error if findone method encountered some error
      .catch(error => {
        console.log(error);
        throw error;
      });
    // return result
    return result;
    //   catches error
  } catch (error) {
    // for debugging
    console.log(error);
    // return response if query failed
    return {
      status: 400,
      message: 'Error Finding the event'
    };
  }
}
// create url for the images
function GenerateURL(eventname) {
  return {
    mobile_url: new URL(
      `http://localhost:${port}/static/${eventname.toLowerCase()}/${eventname.toLowerCase()}-mobile.jpg`
    ),
    desktop_url: new URL(
      `http://localhost:5000/static/${eventname.toLowerCase()}/${eventname.toLowerCase()}-desktop.jpg`
    )
  };
}
module.exports = {
  GetEventDetailsFromDB
};
