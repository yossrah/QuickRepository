import React from 'react'
import Avatar from '@mui/material/Avatar';
const avatarStyle={
    backgroundColor:'#1e81b0'
}
const AvatarUI=({icon})=> {
  return (
    <Avatar style={avatarStyle} sx={{ m: 1 }}>
    {icon}
    </Avatar>
  )
}

export default AvatarUI
