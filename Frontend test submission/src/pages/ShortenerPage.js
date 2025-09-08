import React from 'react';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';
import UrlShortenerForm from '../components/UrlShortenerForm';
import UrlList from '../components/UrlList';
import { createShortUrls } from '../api';
import { isValidUrl, isPositiveInteger, isValidShortcode } from '../utils/validation';
import { useLogger } from '../logging/LoggerProvider';

export default function ShortenerPage() {
  const [rows, setRows] = React.useState([{ longUrl: '', validityMinutes: '', preferredCode: '' }]);
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const log = useLogger();

  const validateAll = () => {
    const ok = rows.length > 0 && rows.length <= 5 && rows.every(r =>
      r.longUrl && isValidUrl(r.longUrl) &&
      isPositiveInteger(r.validityMinutes) &&
      isValidShortcode(r.preferredCode)
    );
    if (!ok) setError('Please fix validation errors before submitting.');
    else setError('');
    return ok;
  };

  const onSubmit = async () => {
    if (!validateAll()) {
      log('SHORTEN_SUBMIT_INVALID', { rowsCount: rows.length });
      return;
    }
    setLoading(true);
    try {
      log('SHORTEN_SUBMIT', { rows });
      const payload = rows.map(r => ({
        longUrl: r.longUrl.trim(),
        validityMinutes: r.validityMinutes === '' ? undefined : Number(r.validityMinutes),
        preferredCode: r.preferredCode || undefined
      }));
      const res = await createShortUrls(payload);
      setResults(res);
      log('SHORTEN_SUCCESS', { count: res.length });
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to shorten URLs.');
      log('SHORTEN_ERROR', { message: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>URL Shortener</Typography>
      <Typography sx={{ mb: 2 }}>
        Add up to 5 URLs at once. Optionally set a validity period (minutes) and a preferred shortcode.
      </Typography>

      <UrlShortenerForm rows={rows} setRows={setRows} />

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      <Button variant="contained" onClick={onSubmit} disabled={loading}>
        {loading ? <CircularProgress size={22} /> : 'Create Short Links'}
      </Button>

      <Box sx={{ mt: 4 }}>
        <UrlList results={results} />
      </Box>
    </Box>
  );
}
