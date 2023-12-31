'use strict';

// Load initial Express router
const router = require('express').Router();

// Initialize routes in the router by loading the corresponding modules
// Sample API Endpoint for the template repository
require('./sampleApiRequest')(router);
require('./CreateGuest')(router);
require('./SearchGuest')(router);
require('./RegisterGuest')(router);
require('./UpdateGuest')(router);
require('./GetEvent')(router);
// Add additional API endpoints below

module.exports = router;
