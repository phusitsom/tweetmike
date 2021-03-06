import {Box, Button, Stack, Typography} from '@mui/material';

import {useAuth} from '@contexts/AuthContext';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import React from 'react';

const Index: NextPage = () => {
  const router = useRouter();
  const {login, user} = useAuth();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await login();
      router.push('/playground');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Stack spacing={4}>
          <Typography variant="h2" align="center" fontFamily={'Ubuntu'}>
            tweetmike
          </Typography>
          {user ? (
            <Button onClick={() => router.push('playground')}>
              go to playground
            </Button>
          ) : (
            <Button onClick={handleLogin}> sign in with twitter </Button>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default Index;
