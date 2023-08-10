import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
const Listitem=({item,nav,onClick})=> {
  return (
    <ListItem key={item.name} disablePadding>
                <ListItemButton onClick={onClick}>
                  <ListItemIcon>
                    {item.icon?item.icon:null}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
    </ListItem>
  )
}

export default Listitem
