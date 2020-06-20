//call expprss js framwork
const express  = require('express');
const router = express.Router();

const apiVersion1 = require('./versionOne/routeVersion1.1');

// set version router
router.use('/v1.1' , apiVersion1);

module.exports = router;
