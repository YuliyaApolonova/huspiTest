
const express = require('express');
const router = express.Router();
const addHandler = require('../handlers/addHandler');

router.post('/add', addHandler.addPost);

module.exports = router;