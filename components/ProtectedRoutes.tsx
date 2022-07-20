import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '@contexts/AuthContext';
import {getCookie} from 'cookies-next';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {user, logout} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!getCookie('twitter_access_token') || !getCookie('twitter_token_secret')) {
      logout().then(() => {
        router.push('/');
      });
    } else if (!user) {
      router.push('/');
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
