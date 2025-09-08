import React from 'react';
import { Box, Grid, TextField, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { isValidUrl, isPositiveInteger, isValidShortcode } from '../utils/validation';

export default function UrlShortenerForm({ rows, setRows }) {

  const update = (idx, field, value) => {
    const next = rows.map((r, i) => i === idx ? { ...r, [field]: value } : r);
    setRows(next);
  };

  const addRow = () => {
    if (rows.length >= 5) return;
    setRows([...rows, { longUrl: '', validityMinutes: '', preferredCode: '' }]);
  };

  const removeRow = (idx) => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  React.useEffect(() => {
    if (rows.length === 0) addRow();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {rows.map((row, idx) => {
          const urlError = row.longUrl ? !isValidUrl(row.longUrl) : false;
          const valError = row.validityMinutes !== '' && !isPositiveInteger(row.validityMinutes);
          const codeError = row.preferredCode && !isValidShortcode(row.preferredCode);
          return (
            <React.Fragment key={idx}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Original Long URL"
                  value={row.longUrl}
                  onChange={(e) => update(idx, 'longUrl', e.target.value)}
                  error={urlError}
                  helperText={urlError ? 'Enter a valid URL (https://...)' : ' '}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={2.5}>
                <TextField
                  label="Validity (minutes, optional)"
                  value={row.validityMinutes}
                  onChange={(e) => update(idx, 'validityMinutes', e.target.value)}
                  error={valError}
                  helperText={valError ? 'Must be a positive integer' : ' '}
                  fullWidth
                />
              </Grid>
              <Grid item xs={10} md={2.5}>
                <TextField
                  label="Preferred Shortcode (optional)"
                  value={row.preferredCode}
                  onChange={(e) => update(idx, 'preferredCode', e.target.value)}
                  error={codeError}
                  helperText={codeError ? '3-20 chars: letters, numbers, _ or -' : ' '}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} md={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Remove row">
                  <span>
                    <IconButton onClick={() => removeRow(idx)} disabled={rows.length === 1} aria-label="remove row">
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <button className="mui-button" onClick={addRow} disabled={rows.length >= 5}>Add URL</button>
      </Box>
    </Box>
  );
}
