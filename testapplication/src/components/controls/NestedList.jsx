import React,{useEffect,useState,}  from 'react';
import { useDispatch} from 'react-redux';
import { GetSubCategorybycatego } from '../../redux/actions/subcategActions';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NestedTwo from './NestedTwo';

 function NestedList({id,name,handleID,children,components,subcategory,onClose,image,openItems, handleClick, handleItemClick}) {
    
  const [opensubItems, setOpensubItems] = React.useState([]);

  const handlesubClick = (itemsubId) => {
    if (opensubItems.includes(itemsubId)) {
      setOpensubItems(opensubItems.filter((id) => id !== itemsubId));
    } else {
      setOpensubItems([...opensubItems, itemsubId]);
    }
  };

  const handlesubItemClick = (itemsubId) => {
    setOpensubItems([itemsubId]);
  };
  const handleCategoryClick = () => {
    if (openItems.includes(id)) {
      handleItemClick(id); // Remove category from openItems to close it
    } else {
      handleItemClick(id); // Add category to openItems to open it
    }
  };

    const [openSub,setOpenSub]=useState(false)
    const dispatch=useDispatch()
    // const handleClick = () => {
    //   setOpen(!open);
      
    //   };
    useEffect(()=>{
        dispatch(GetSubCategorybycatego(id))
    },[])
   
     return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <ListItemButton   onClick={handleCategoryClick}
        // onClick={() => handleItemClick(id)}
        >
          <ListItemIcon>
          {image ?
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={`http://localhost:3001/uploads/${image}`} alt="Category Image" 
            style={{ width: '30px', height: '30px' }}/>
         :null }
          </ListItemIcon>
          <ListItemText primary={name} />
          {openItems.includes(id) ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
          <Collapse in={openItems.includes(id)} timeout="auto" unmountOnExit>
                 {subcategory?.map((sub)=>(<NestedTwo
                  openItems={opensubItems}
                  handlesubClick={handlesubClick}
                  handleItemClick={handlesubItemClick}
                  key={sub._id}
                onClick={() => handleClick(sub._id)}
                name={sub.name}
                image={sub.image} 
                id={sub._id} 
                components={components}
                handleID={handleID}
                onClose={()=>onClose()}>
                </NestedTwo>
                ))}
            </Collapse>
      </List>
    );
  }
export default NestedList
