
const express = require('express');
const router = express.Router();

const getHandler = require('../handlers/getHandler');

router.get('/list', getHandler.getPost);

module.exports = router;
