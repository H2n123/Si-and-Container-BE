// routes/logbook.routes.js

const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const logbookController = require('../controllers/logbook.controller');

router.post('/api/logbooks', 
    [authJwt.verifyToken], 
    logbookController.createLogbook);

module.exports = router;
