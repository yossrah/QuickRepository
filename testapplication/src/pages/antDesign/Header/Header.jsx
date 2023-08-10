import React from 'react'
import { Badge, Image, Space } from 'antd'
import EmailIcon from '@mui/icons-material/Email';
import logo from "../../../images/logoo.png"
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountMenu from '../../../components/controls/AccountMenu';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
const theme = createTheme();
function Header({user}) {
  const navigate=useNavigate()
  const location = useLocation();
  console.log('location',location)
  const isSignInPage = location.pathname === '/login';
  const isContact = location.pathname === '/contact';
  return (
    <ThemeProvider theme={theme}>
   
    <Grid item  xs={12} sm={12} md={12} component={Paper}>
    <div className="Header" >
    <Image
    width={150}
    src={logo}>
    </Image>
    
    <Space style={{marginRight:'30px'}}>
    
    {!user?
      <>
      {isContact?<Button variant="outlined" onClick={()=>navigate('/login')}>Login</Button>:<Button variant="outlined" onClick={()=>navigate('/contact')}>contact us</Button>}
      </>:
     <React.Fragment>
     <AccountMenu user={user}/>
    </React.Fragment>
  }
    </Space>
    </div>
    </Grid>
    </ThemeProvider>
  )
}

export default Header
