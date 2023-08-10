const SearchForGuest = require('../../controllers/GuestController')
  .SearchForGuest;

module.exports = router => {
  router.get('/guest/search', SearchForGuest);
};
