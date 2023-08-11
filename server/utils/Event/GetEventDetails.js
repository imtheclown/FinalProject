'use strict';
const EventModel = require('../../models').EventModel;
const port = require('../../config').port;
async function GetEventDetailsFromDB(eventName) {
  try {
    const result = await EventModel.findOne({
      name: eventName
    })
      .then(response => {
        if (response) {
          const { name, _id } = response;
          const { mobile_url, desktop_url } = GenerateURL(eventName);
          return {
            status: 200,
            data: {
              name,
              _id,
              mobile_url,
              desktop_url
            }
          };
        } else {
          return {
            status: 404,
            data: []
          };
        }
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
    return result;
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: 'Error Finding the event'
    };
  }
}

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
