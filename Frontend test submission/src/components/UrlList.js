import React from 'react';
import { Card, CardContent, Typography, Link as MLink, Grid, Chip, Stack } from '@mui/material';
import { format } from 'date-fns';

export default function UrlList({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <Grid container spacing={2}>
      {results.map((r, i) => (
        <Grid key={i} item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Original:
              </Typography>
              <MLink href={r.longUrl} target="_blank" rel="noreferrer">
                {r.longUrl}
              </MLink>

              <Stack direction="row" spacing={2} sx={{ mt: 1, flexWrap: 'wrap' }}>
                <Chip label={`Short: ${r.shortUrl}`} component="a" href={r.shortUrl} clickable />
                {r.createdAt && <Chip label={`Created: ${format(new Date(r.createdAt), 'PPpp')}`} />}
                {r.expiresAt && <Chip color="warning" label={`Expires: ${format(new Date(r.expiresAt), 'PPpp')}`} />}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
