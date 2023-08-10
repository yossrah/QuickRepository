import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logoutt from '@mui/icons-material/Logout';
import { Logout } from '../../redux/actions/authActions';
import { useNavigate ,Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
const AccountMenu=({user})=> {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const LogoutHandler=()=>{
        dispatch(Logout(navigate))
      }
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small"
            sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
            <Avatar sx={{ bgcolor: '#1a237e'  ,width: '30px',height:'30px'  }} >{user?.name[0]}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
        PaperProps={{elevation: 0,sx: {overflow: 'visible',filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,'& .MuiAvatar-root': {width: 32,height: 32,ml: -0.5,mr: 1,},
            '&:before': {content: '""',display: 'block',position: 'absolute',
            top: 0,right: 14,width: 10,height: 10,bgcolor: 'background.paper',transform: 'translateY(-50%) rotate(45deg)',zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      {user.isConnected?(
        <>
        <MenuItem >
        <ListItemIcon >
          <AdminPanelSettingsIcon fontSize="small" />
        </ListItemIcon>
        {user? user.role:null}
      </MenuItem>
      <MenuItem onClick={()=>navigate('edit/${user._id}')}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>Settings</MenuItem>
       {!user.isConnected? (<Link className="btn btn-outline-primary" to="/login">Login</Link>):(
        <MenuItem onClick={LogoutHandler}>
        <ListItemIcon>
          <Logoutt fontSize="small" />
          </ListItemIcon>
          Logout</MenuItem>
      )
}
      </>):null} </Menu>   
    </React.Fragment>
  );
}
export default AccountMenu