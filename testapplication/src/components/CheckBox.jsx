import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const CheckBox=({value,label,style})=> {
  return (
    
              <FormControlLabel
      control={<Checkbox value={value} color="primary" style={{ margin: '14px 0' }} />}
      label={label}
      style={style}
    />
  )
}


export default CheckBox
