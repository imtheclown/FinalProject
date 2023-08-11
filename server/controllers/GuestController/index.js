'use strict';

const AddGuestController = require('./AddGuestController').AddGuestController;
const SearchForGuest = require('./SearchGuestController').SearchForGuest;
const UpdateGuestController = require('./UpdateGuestController')
  .UpdateGuestController;

module.exports = {
  AddGuestController,
  SearchForGuest,
  UpdateGuestController
};
