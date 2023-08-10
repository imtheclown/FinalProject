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
        req.responseData = {
          statusCode: 200,
          body: {
            data: response
          }
        };
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
