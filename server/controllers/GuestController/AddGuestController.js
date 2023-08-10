'use strict';
const { FindAndAdd } = require('../../utils/Guest');
async function AddGuestController(req, res, next) {
  if (req.body) {
    const body = req.body;
    if (body.name && body.email && body.mobile_number && body.affiliation) {
      await FindAndAdd({
        name: body.name,
        email: body.email,
        mobile_number: body.mobile_number,
        affiliation: body.affiliation
      }).then(response => {
        const { message, status } = response;
        ReturnResponseData(req, next, message, status);
      });
    } else {
      ReturnResponseData(req, next, 'missing query parameters', 400);
    }
  } else {
    ReturnResponseData(req, res, 'There is info found', 400);
  }
}

module.exports = { AddGuestController };

function ReturnResponseData(req, next, message, status) {
  req.responseData = {
    statusCode: status,
    body: {
      message,
      status
    }
  };
  return next();
}
