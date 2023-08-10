import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { SearchIconWrapper,StyledInputBase,Search } from '../Styles';

export default function SearchField({onChangeHandler,value,style,placeholder}) {
  return (
       <Search style={{backgroundColor:'#e0f2f1',border:0.5}}>
            <SearchIconWrapper >
              <SearchIcon color='primary'/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={placeholder}
              inputProps={{ 'aria-label': 'search' }}
              value={value}
              
              onChange={onChangeHandler}
            />
          </Search>
  );
}