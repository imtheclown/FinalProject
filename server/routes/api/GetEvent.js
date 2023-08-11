'use strict';
const GetEventDetails = require('../../controllers/GetEventDetailsController')
  .GetEventDetails;

module.exports = router => {
  router.get('/event/search', GetEventDetails);
};
