import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000',
  timeout: 8000
});

export async function createShortUrls(items) {
  // items: [{ longUrl, validityMinutes?, preferredCode? }, ...]
  const responses = await Promise.all(items.map(async (it) => {
    const { data } = await client.post('/shorten', {
      longUrl: it.longUrl,
      validityMinutes: it.validityMinutes || undefined,
      preferredCode: it.preferredCode || undefined
    });
    // normalize result
    return {
      code: data.code || data.shortCode || data.id,
      shortUrl: data.shortUrl || data.shortURL || data.url,
      longUrl: data.longUrl || it.longUrl,
      createdAt: data.createdAt || data.created_at || new Date().toISOString(),
      expiresAt: data.expiresAt || data.expiry || null
    };
  }));

  return responses;
}

export async function fetchStats() {
  const { data } = await client.get('/stats');
  // Expect array; normalize fields
  const list = Array.isArray(data) ? data : (data.items || []);
  return list.map(item => ({
    code: item.code || item.shortCode || item.id,
    shortUrl: item.shortUrl || item.shortURL || item.url,
    longUrl: item.longUrl || item.originalUrl,
    createdAt: item.createdAt || item.created_at,
    expiresAt: item.expiresAt || item.expiry,
    clicks: item.clicks ?? (item.totalClicks ?? 0),
    clickDetails: item.clickDetails || item.clicksDetailed || []
  }));
}
