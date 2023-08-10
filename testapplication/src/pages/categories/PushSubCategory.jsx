import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PushSubCategory } from '../../redux/actions/categoryAction';
import { GetSubCategories } from '../../redux/actions/subcategActions';

import Box from '@mui/material/Box';
import {Grid,Paper}from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonSubmit from '../../components/ButtonSubmit';
import SelectField from '../../components/SelectField';
const theme = createTheme();
const btStyle={ margin:'0px 0',backgroundColor:'#1e81b0'}
const PushSubCategorie = ({id}) => {
//   const {id}=useParams()
const {subcategories}=useSelector(state=>state.souscategories)
  const dispatch = useDispatch();
  const [subCategory, setSubCategory] = useState('');

  const { isLoading, error } = useSelector((state) => state.categorie);
  useEffect(() => {
   dispatch(GetSubCategories()) }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(PushSubCategory(id, subCategory));
  };
  const onChangeHandler=(e)=>{
    setSubCategory(e.target.value)
 }
  return (


    <React.Fragment>
    <ThemeProvider theme={theme}>
    <Grid  container component="main" sx={{ height: '40vh',width:'40vh' }} >
    <Grid item xs={12} sm={8} md={12} component={Paper}  square>
    <Box
          sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}
          >
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Box sx={{ minWidth: 120 }}>
          <h5>push sub_category</h5>
         <SelectField roles={subcategories} title={"Sub Category"} name={"subCategory"} onChangeHandler={onChangeHandler}label={"Sub-Category"}> </SelectField>
        </Box>
        <ButtonSubmit type="submit" style={btStyle} variant="contained" title=" Push Sub-category"/>
      </Box>
      </Box>
      </Grid>
     </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default PushSubCategorie;