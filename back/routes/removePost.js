const express = require('express');
const router = express.Router();
const removeHandler = require('../handlers/removeHandler');

router.delete('/remove', removeHandler.removePost);

module.exports = router;