'use strict';
const UpdateGuestController = require('../../controllers/GuestController')
  .UpdateGuestController;

module.exports = router => {
  router.patch('/guest/update', UpdateGuestController);
};
