import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, Divider, Box } from '@mui/material';
import { format } from 'date-fns';

export default function UrlStats({ items }) {
  if (!items || items.length === 0) {
    return <Typography color="text.secondary">No stats yet.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {items.map((it, idx) => (
        <Grid key={idx} item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{it.shortUrl}</Typography>
              <Typography variant="body2" color="text.secondary">{it.longUrl}</Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {it.createdAt && <Chip label={`Created: ${format(new Date(it.createdAt), 'PPpp')}`} />}
                {it.expiresAt && <Chip color="warning" label={`Expires: ${format(new Date(it.expiresAt), 'PPpp')}`} />}
                <Chip color="primary" label={`Total Clicks: ${it.clicks ?? 0}`} />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1">Click Details</Typography>
              {(!it.clickDetails || it.clickDetails.length === 0) && (
                <Typography color="text.secondary">No click data yet.</Typography>
              )}
              {it.clickDetails && it.clickDetails.map((c, i) => (
                <Box key={i} sx={{ my: 1 }}>
                  <Chip label={format(new Date(c.timestamp), 'PPpp')} sx={{ mr: 1 }} />
                  {c.source && <Chip label={`Source: ${c.source}`} sx={{ mr: 1 }} />}
                  {c.referrer && <Chip label={`Referrer: ${c.referrer}`} sx={{ mr: 1 }} />}
                  {c.ip && <Chip label={`IP: ${c.ip}`} sx={{ mr: 1 }} />}
                  {c.location && <Chip label={`Location: ${c.location}`} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
