import React from 'react'
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { GetCategories } from '../../redux/actions/categoryAction';
import { List} from '@mui/material'
import NestedList from '../../components/controls/NestedList';
function FeaturesContainer({handleID,id,onClose}) {
  const [openItems, setOpenItems] = React.useState([]);

  const handleClick = (itemId) => {
    if (openItems.includes(itemId)) {
      setOpenItems([]);
    } else {
      setOpenItems([itemId]);
    }
  };

  const handleItemClick = (itemId) => {
    setOpenItems([itemId]);
  };
    const categories=useSelector((state)=>state.categorie.categories)
    const {components}=useSelector((state)=>state.components)
    const dispatch=useDispatch()
    
    useEffect(() => {
        dispatch(GetCategories()) ;
       }, []);
       console.log('categories',categories)
       console.log('components',components)
  return (
    <React.Fragment>
     <div>
   <List>
   {categories.map((item)=>
    <NestedList key={item._id}
                name={item.name}
                image={item.image} 
                id={item._id} 
                subcategory={item.subCategory}
                components={components}
                handleID={handleID}
                openItems={openItems}
                handleClick={handleClick}
                handleItemClick={handleItemClick}
                // onClose={()=>onClose()}
    > 
    </NestedList>)
  }
  </List>
   </div>
    </React.Fragment>
  )
}

export default FeaturesContainer
