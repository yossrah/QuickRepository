import * as React from 'react';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
function LayoutList({item,children}) {
    const navigate=useNavigate()
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
     
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((sub)=>(<ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              {sub.icon}
            </ListItemIcon>
            <ListItemText primary={sub.name} onClick={()=>navigate(sub.nav)} />
          </ListItemButton>))}
          </List>
      </Collapse>
    </List>
  );
}

export default LayoutList
