import React from 'react'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar } from '@mui/material';
import { StyledTableCell } from './Styles';
const TableHeading=(props)=> {
  return (
    <>
    <TableHead>
    <TableRow>
    <StyledTableCell>
    <Avatar style={{ height: '30px', width: '30px' }}>
        {props.avatar}
       </Avatar>
    </StyledTableCell>
      {props.name?<StyledTableCell>{props.name}</StyledTableCell>:null}
      {props.lastname?<StyledTableCell>{props.lastname}</StyledTableCell>:null}
      {props.email?<StyledTableCell>{props.email}</StyledTableCell>:null}
      {props.phone?<StyledTableCell>{props.phone}</StyledTableCell>:null}
      {props.status?<StyledTableCell>{props.status}</StyledTableCell>:null}
      {props.role?<StyledTableCell>{props.role}</StyledTableCell>:null}
      {props.date?<StyledTableCell>{props.date}</StyledTableCell>:null}
      {props.category?<StyledTableCell>Category</StyledTableCell>:null}
      {props.icon?<StyledTableCell>icon</StyledTableCell>:null}
      
      
      
      <StyledTableCell align="right">Actions</StyledTableCell>
    </TableRow>
  </TableHead> 
    </>
  )
}

export default TableHeading
