import React from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import UrlStats from '../components/UrlStats';
import { fetchStats } from '../api';
import { useLogger } from '../logging/LoggerProvider';

export default function StatsPage() {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const log = useLogger();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      log('STATS_FETCH');
      const data = await fetchStats();
      setItems(data);
      log('STATS_SUCCESS', { count: data.length });
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to fetch statistics.');
      log('STATS_ERROR', { message: e.message });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []); // initial load

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>URL Shortener Statistics</Typography>

      <Button variant="outlined" onClick={load} disabled={loading} sx={{ mb: 2 }}>
        {loading ? <CircularProgress size={22} /> : 'Refresh'}
      </Button>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <UrlStats items={items} />
    </Box>
  );
}
