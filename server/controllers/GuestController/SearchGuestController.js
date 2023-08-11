'use strict';
const RetrieveGuest = require('../../utils/Guest').RetrieveGuest;

async function SearchForGuest(req, res, next) {
  if (!req.query || !Object.keys(req.query).length || !req.query.searchtext) {
    req.responseData = {
      statusCode: 400,
      body: {
        message: 'search string is empty'
      }
    };
    return next();
  } else {
    await RetrieveGuest(req.query.searchtext)
      .then(response => {
        if (response && response.message && response.status) {
          req.responseData = {
            statusCode: response.status,
            body: {
              message: response.message,
              status: response.status
            }
          };
        } else {
          req.responseData = {
            statusCode: 200,
            body: {
              data: response,
              status: 200
            }
          };
        }
        return next();
      })
      .catch(error => {
        req.responseData = {
          statusCode: 400,
          body: {
            error: error
          }
        };
        return next();
      });
  }
}

module.exports = {
  SearchForGuest
};
