const express = require('express');
const { createShortURL, getShortURLStats, redirectToURL } = require('../controllers/shorturlController');

const router = express.Router();

router.post('/shorturls', createShortURL);
router.get('/shorturls/:shortcode', getShortURLStats);
router.get('/:shortcode', redirectToURL);

module.exports = router;