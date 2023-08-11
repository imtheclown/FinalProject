'use strict';
const AddRegisteredGuestToDB = require('../../utils/RegisteredGuest')
  .AddRegisteredUserToDB;
async function AddRegisteredGuestController(req, res, next) {
  if (req.body) {
    if (req.body.guest_id && req.body.terminal && req.body.event_id) {
      const { guest_id, terminal, event_id } = req.body;
      const result = await AddRegisteredGuestToDB({
        guest_id,
        terminal,
        event_id
      });
      req.responseData = {
        statusCode: 200,
        body: result
      };
      return next();
    }
  }
  req.responseData = {
    status: 400,
    body: {
      message: 'data provided is insufficient',
      status: 400
    }
  };
}

module.exports = {
  AddRegisteredGuestController
};
