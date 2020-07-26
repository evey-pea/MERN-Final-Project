import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Spinner = () => {
  return (
    <Box
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
