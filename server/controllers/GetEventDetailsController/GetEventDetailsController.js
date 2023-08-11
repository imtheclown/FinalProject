'use strict';
const GetEventDetailsFromDB = require('../../utils/Event')
  .GetEventDetailsFromDB;

async function GetEventDetails(req, res, next) {
  if (!req.query || !Object.keys(req.query).length) {
    req.responseData = {
      statusCode: 400,
      body: {
        status: 400,
        message: 'name of the event is not provided'
      }
    };
    return next();
  } else {
    if (req.query.event_name) {
      await GetEventDetailsFromDB(req.query.event_name).then(response => {
        if (response && response.data && response.status) {
          const { data, status } = response;
          req.responseData = {
            statusCode: status,
            body: {
              data,
              status
            }
          };
          return next();
        }
        console.log(response);
      });
    } else {
      req.responseData = {
        statusCode: 400,
        body: {
          message: 'incomplete query parameters',
          status: 400
        }
      };
      return next();
    }
  }
}

module.exports = { GetEventDetails };
