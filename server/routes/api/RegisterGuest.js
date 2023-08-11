'use strict';

const RegisteredGuestController = require('../../controllers/RegisteredGuest')
  .RegisterGuestController;
module.exports = router => {
  router.post('/guest/register', RegisteredGuestController);
};
