import { Box, Container, Grid, Link, Typography, Button } from '@mui/material'
import { useAuth } from 'context/AuthContext'
import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {

  const { user, credential, logout } = useAuth()

  return (
    <div className={styles.container}>
      {
        credential ? (
          <p> has credential </p>
        ) : ( 
          <p> no credential </p>)
      }
      <Button onClick={logout}> Sign Out</Button>
      </div>
  )
}

export default Home
