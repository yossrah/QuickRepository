import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const InputField=({name,label,onChangeHandler,errors,value,type,autoFocus,variant})=> {
  const [showPassword, setShowPassword] = useState(false); // State variable for showing/hiding the password

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
   <TextField 
            margin="normal"
            required 
            fullWidth 
            id="standard-basic" 
            label={label}
            name={name}
           value={value}
            autoComplete={value}
            onChange={onChangeHandler}
            errors={errors}
            variant={variant}
            type={showPassword ? 'text' : type} // Show/hide the password based on the state
      
            autoFocus={autoFocus}
            placeholder={label}
            helperText={errors|| ''}
            InputProps={
              type === 'password'
                ? {
                    endAdornment: (
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }
                : {}
            }
            />
  )
}

export default InputField
