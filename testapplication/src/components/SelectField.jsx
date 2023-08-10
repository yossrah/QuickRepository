import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
const SelectField=({roles,title,value,name,label,onChangeHandler,all})=> {
  return (
    <React.Fragment>
    <FormControl  variant="standard" sx={{ m: 2, width: 200 }}>
    {title? <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>:null }
    <Select
      value={value}
       id="demo-simple-select"
       name={name}
      label={label}
       onChange={onChangeHandler}
       
      >
      {all ? <MenuItem value="All">All </MenuItem>:null}
      {
       roles.map((role) => (
       <MenuItem  key={role._id} value={role._id}>{role.nom} {role.name}</MenuItem>
      ))
    }
     </Select>
    </FormControl>
    </React.Fragment>
  )
}

export default SelectField
