'use strict';

const UpdateGuest = require('../../utils/Guest').UpdateGuest;
async function UpdateGuestController(req, res, next) {
  if (req.body) {
    const body = req.body;
    if (
      body.name &&
      body.email &&
      body.mobile_number &&
      body.affiliation &&
      body.guest_id
    ) {
      await UpdateGuest(body).then(response => {
        if (response && response.status && response.message) {
          return ReturnResponse(req, next, response.message, response.status);
        }
      });
    } else {
      return ReturnResponse(req, next, 'missing query parameters', 400);
    }
  } else {
    return ReturnResponse(req, next, 'missing request body', 400);
  }
}

function ReturnResponse(req, next, message, status) {
  req.responseData = {
    statusCode: status,
    body: {
      message,
      status
    }
  };
  return next();
}

module.exports = { UpdateGuestController };
