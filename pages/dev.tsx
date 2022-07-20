import StyledReactJson from '@components/StyledReactJson';

import {Box, Button, Grid, Stack, TextField} from '@mui/material';

import React, {useState} from 'react';

export default function Home() {
  const [data, setData] = useState<object>({});
  const [endpoint, setEndpoint] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
  };

  const handleSendButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!endpoint) {
      setLoading(false);
      return;
    }

    const response = fetch('/api/twitter/' + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': '*',
      },
    })
      .then(res => res.json());

    response.then(res => {
      setLoading(false);
      setData(res);
    });
  };

  return (
    <div>
      <Grid container columnSpacing={1} sx={{height: '90vh'}}>
        <Grid item xs={16} sm={6} maxWidth={{xs: '100%', sm: '60%'}}>
          <Stack spacing={1} flex="1 1 auto">
            <Grid container spacing={1} alignItems="center">
              {/* <Grid item>
                <Button> select </Button>
              </Grid> */}
              <Grid item flexGrow={1}>
                {' '}
                <TextField
                  fullWidth={true}
                  label="API endpoint"
                  onChange={handleEndpointChange}
                  value={endpoint}
                ></TextField>{' '}
              </Grid>
            </Grid>
            {!loading ? (
              <Button onClick={handleSendButton}> SEND </Button>
            ) : (
              <Button disableRipple={true}> SENDING... </Button>
            )}
            <Box color={'white'}></Box>
            <Box display={{xs: 'flex', sm: 'none'}}>
              <StyledReactJson src={data} />
            </Box>
          </Stack>
        </Grid>

        <Grid
          item
          sm={6}
          display={{
            xs: 'none',
            sm: 'flex',
          }}
        >
          <StyledReactJson src={data} />
        </Grid>
      </Grid>
    </div>
  );
}
