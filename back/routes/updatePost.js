const express = require('express');
const router = express.Router();
const updateHandler = require('../handlers/updateHandler');

router.put('/update', updateHandler.updatePost);

module.exports = router;