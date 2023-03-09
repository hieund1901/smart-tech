import { Box } from '@mui/material'
import React, { Children } from 'react'
import Header from '../Header/Header'

export default function PageContainer(props:any) {
  return (
    <Box>
        <Header/>
        {props.Children}
    </Box>
  )
}
