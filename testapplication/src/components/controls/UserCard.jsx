import * as React from 'react';
import Box from '@mui/joy/Box';
import { useSelector } from 'react-redux';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
export default function UserCard({mssg,HandleDelete}) {
  const {user}=useSelector((state)=>state.auth)
  return (
    <div style={{ width: '100%' }}>
    <Card
      variant="outlined"
      sx={{
        // width: '100%',
        // to make the card resizable
        overflow: 'auto',
        resize: 'horizontal',
        marginBottom: '20px',
        width: '1150px', // Largeur fixe de la carte
        
      }}
    >
      <Box
        sx={{
          // display: 'flex',
          // justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
      <Avatar sx={{ bgcolor: '#004db7'  ,//'#311b92'
           width: '30px',
           height:'30px'  }} >
           {mssg?.from ? mssg.from[0] : ''}
           </Avatar>
           <div>{mssg?.from}</div>
      </Box>
      <CardContent>
        <Typography level="h5" fontWeight="lg">
         Topic : {mssg?.subject}
        </Typography>
        <p >
         Comment :{mssg?.text}
        </p>
        <caption>Posted at: {mssg?.createdAt}</caption>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        { user.email===mssg.from?
          <IconButton onClick={()=>HandleDelete(mssg._id)} variant="outlined" color="neutral" >
        <DeleteIcon color='error'></DeleteIcon>
        </IconButton>:null}

      </CardActions>
    </Card></div>
  );
}