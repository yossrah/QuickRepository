import React from 'react'
import Stack from '@mui/material/Stack';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { IconButton } from '@mui/material';
import { StyledTableRow ,StyledTableCell} from './Styles';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';

const RowTable=({_id,name,lastname,phone,author,email,date,subcategorieId,isActive,roleId,index,image,onClick,handleDelete,handleUpdate,handlePush,handlePull})=> {
  // console.log(`Image URL: http://localhost:3001/uploads/${image}`);
  return (
    <React.Fragment>
    <StyledTableRow style={{ width: '50px' }} key={_id}>
            <StyledTableCell  component="th" scope="row">
            {index + 1}
          </StyledTableCell>
              <StyledTableCell  align="right">{name}</StyledTableCell>
              {lastname? <StyledTableCell  align="right">{lastname}</StyledTableCell>:null }
              {author?<StyledTableCell  align="right">
              <Stack direction="row" spacing={2} alignItems="center" >
               <Chip icon={<FaceIcon />} label={author}/>
                </Stack>
              </StyledTableCell>:null }
              {email?<StyledTableCell  align="right">
              <Chip label={email} style={{color:"#1a237e",borderColor:"#1a237e"}} variant="outlined" ></Chip> 
             </StyledTableCell>:null }
              {phone?<StyledTableCell align="right">{phone}</StyledTableCell>:null}
              {isActive ?<StyledTableCell align="right">
             {isActive==="Active"? <Chip label="Active" style={{color:"#1a237e",borderColor:"#1a237e"}} variant="outlined" />:
             <Chip label="Inactive"  variant="outlined" style={{ color: "#d50000", borderColor: "#d50000" }} />}</StyledTableCell>:null}
              {roleId ? <StyledTableCell align="right">{roleId }</StyledTableCell>:null }
              {date ? <StyledTableCell align="right">{date }</StyledTableCell>:null }
              {image ?
                <StyledTableCell align="right"><img src={`/uploads/${image}`} alt="Category" style={{ width: '30px', height: '30px' }}/>
              </StyledTableCell>:null }
              {subcategorieId ? <StyledTableCell align="right">{subcategorieId}</StyledTableCell>: null }
              <StyledTableCell align="right">
              <Stack direction="row" spacing={2}>
              {handleDelete?<IconButton  color='error' onClick={handleDelete} ><DeleteIcon /></IconButton>:null}
              {handleUpdate?<IconButton color='primary' onClick={handleUpdate} ><EditIcon/> </IconButton>:null}
              {handlePush?<IconButton color='secondary' onClick={handlePush}><PlaylistAddCircleIcon /></IconButton>:null}
              {handlePull?<IconButton color='secondary' onClick={handlePull}><PlaylistRemoveIcon /></IconButton>:null}
            </Stack>
              </StyledTableCell>
             </StyledTableRow>
    </React.Fragment>
  )
}
export default RowTable
