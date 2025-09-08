const { v4: uuidv4 } = require('uuid');
const urlStore = require('../models/urlStore');

function createShortURL(req, res) {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || !/^https?:\/\//.test(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  let code = shortcode || uuidv4().slice(0, 6);
  if (urlStore[code]) {
    return res.status(409).json({ error: 'Shortcode already exists' });
  }

  const expiryDate = new Date(Date.now() + validity * 60000).toISOString();

  urlStore[code] = {
    url,
    createdAt: new Date().toISOString(),
    expiry: expiryDate,
    clicks: [],
  };

  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiryDate,
  });
}

function getShortURLStats(req, res) {
  const code = req.params.shortcode;
  const record = urlStore[code];

  if (!record) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  res.json({
    url: record.url,
    createdAt: record.createdAt,
    expiry: record.expiry,
    totalClicks: record.clicks.length,
    clicks: record.clicks,
  });
}

function redirectToURL(req, res) {
  const code = req.params.shortcode;
  const record = urlStore[code];

  if (!record) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (new Date() > new Date(record.expiry)) {
    return res.status(410).json({ error: 'Link expired' });
  }

  record.clicks.push({
    timestamp: new Date().toISOString(),
    referrer: req.get('Referrer') || null,
    ip: req.ip,
  });

  res.redirect(record.url);
}

module.exports = { createShortURL, getShortURLStats, redirectToURL };