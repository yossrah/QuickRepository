import React from 'react'
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { GetCategories } from '../../redux/actions/categoryAction';
import { List} from '@mui/material'
import NestedList from '../../components/controls/NestedList';
function FeaturesContainer({handleID,id}) {
    const categories=useSelector((state)=>state.categorie.categories)
    const {components}=useSelector((state)=>state.components)
    const dispatch=useDispatch()
    
    useEffect(() => {
        dispatch(GetCategories()) ;
       }, []);
  return (
    <React.Fragment>
     <div>
   <List>
   {categories.map((item)=>
    <NestedList key={item._id}
                name={item.name} 
                id={item._id} 
                subcategory={item.subCategory}
                components={components}
                handleID={handleID}
    > 
    </NestedList>)
  }
  </List>
   </div>
    </React.Fragment>
  )
}

export default FeaturesContainer
