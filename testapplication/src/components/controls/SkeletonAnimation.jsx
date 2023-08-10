import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export default function SkeletonAnimation() {
  return (
    <Box sx={{ width: 200 ,height:110  }}>
    <Skeleton  variant="rectangular" width="100%" height="100%" margin='10px' sx={{ borderRadius: '6px' }} />
    </Box>
      
  );
}