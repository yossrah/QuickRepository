import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import { GetActionsByName } from '../../redux/actions/componentAction';
import { useDispatch,useSelector  } from 'react-redux';
import { useState } from 'react';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
 
function SearchItem({placeholder}) {
  const {componentsname}=useSelector((state)=>state.components)
  const dispatch=useDispatch()
  const [input, setInput] = useState('');
  const onChangeHandler=(e)=>{
    setInput(e.target.value)
 }
 const handleSubmit = (event) => {
  dispatch(GetActionsByName(input));
  console.log('input',input)
};
console.log('components',componentsname)
console.log('input',input)
  return (
    <React.Fragment>
   
    <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={placeholder}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChangeHandler}
            />
           
          </Search>
          <Button onClick={()=>handleSubmit()}>search</Button>
    </React.Fragment>
  )
}

export default SearchItem
