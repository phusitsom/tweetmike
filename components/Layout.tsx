import Head from 'next/head';
import React, {Fragment} from 'react';

import {useTheme} from 'next-themes';
import {useSession} from 'next-auth/react';

import {ThemeProvider, createTheme} from '@mui/material';

import ResponsiveAppBar from './AppBar';
import ScrollButton from './ScrollButton';

const Layout = ({children}: {children: React.ReactNode}) => {
  const {theme, systemTheme} = useTheme();

  const {status} = useSession();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const muiTheme = createTheme({
    palette: {
      mode: currentTheme as 'light' | 'dark',
    },
    typography: {
      fontFamily: 'Ubuntu',
    }
  });

  return (
    <>
      <Head>
        <title>tweetmike</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={muiTheme}>
        {status !== 'loading' ? (
          <Fragment>
            <ResponsiveAppBar />
            <main className="flex-grow container mx-auto  ">{children}</main>
            <ScrollButton />
          </Fragment>
        ) : (
          <div></div>
        )}
      </ThemeProvider>
    </>
  );
};

export default Layout;
