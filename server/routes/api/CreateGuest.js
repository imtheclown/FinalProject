const AddGuestController = require('../../controllers/GuestController')
  .AddGuestController;

module.exports = router => {
  router.post('/guest/create', AddGuestController);
};
