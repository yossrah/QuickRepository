import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { GetCategories } from '../../redux/actions/categoryAction';
import { GetActionbycatego } from '../../redux/actions/componentAction';
import SubMenu from './SubMenu';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
const CategoryMenu = () => {
  const [openItems, setOpenItems] = React.useState([]);
  const {categories,isLoading} = useSelector((state) => state.categorie);
  const {components} = useSelector((state) => state.components);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategories());
  }, []);

  // const handleClick = (itemId) => {
  //   if (openItems.includes(itemId)) {
  //     setOpenItems(openItems.filter((id) => id !== itemId));
  //   } else {
  //     setOpenItems([...openItems, itemId]);
  //   }
  // };
  const handleClick = (itemId) => {
    if (openItems.includes(itemId)) {
      setOpenItems([]);
    } else {
      setOpenItems([itemId]);
      dispatch(GetActionbycatego(itemId))
      // console.log('subCtegories',subcategories)
    }
  };
  return (
    <>
    {isLoading?
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }} >
      <CircularProgress/></div>:
    <List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 450,
    overflow: 'auto', }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Categories List Items
      </ListSubheader>
    }
  >
    {categories?.map((category) => (
      <React.Fragment key={category._id}>
        <ListItemButton onClick={() => handleClick(category._id)}>
          <ListItemText primary={category.name} />
          {openItems.includes(category._id) ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openItems.includes(category._id)} timeout="auto" unmountOnExit>
         <SubMenu components={components}>
         </SubMenu>
       </Collapse>
      </React.Fragment>
    ))}
  </List>
  }
    
    </>
  );
};

export default CategoryMenu;
