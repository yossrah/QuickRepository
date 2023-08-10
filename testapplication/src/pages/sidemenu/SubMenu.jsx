import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import 'reactflow/dist/style.css';
const SubMenu=()=> {

    const onDragStart = (event, component) => {
        event.dataTransfer.setData('application/reactflow',  JSON.stringify(component));
        event.dataTransfer.effectAllowed = 'move';
      };
  const {components}=useSelector((state)=>state.components)
  const {loading}=useSelector((state)=>state.components)
  // const [openItems, setOpenItems] = React.useState([]);
  // const handleClick = (itemId) => {
  //   if (openItems.includes(itemId)) {
  //     setOpenItems([]);
  //   } else {
  //     setOpenItems([itemId]);
  //     //  dispatch(GetActionbycatego(itemId))
  //     console.log('components',components)
  //   }
  // };
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
           List Nodes
        </ListSubheader>
      }
    >
    
        <React.Fragment>
          {loading? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }} >
          <CircularProgress/></div>:<>
          <List  component="div" disablePadding>
          {components?.map((component)=>(
            <div className="dndnode"
            onDragStart={(event) => 
       onDragStart(event, component,'default')} 
        draggable  sx={{ pl: 3 }} >
         <ListItemIcon>
         {component.icon ?
           // eslint-disable-next-line jsx-a11y/img-redundant-alt
           <img src={`http://localhost:3001/uploads/${component.icon}`} alt="Category Image" 
           style={{ width: '20px', height: '20px' }}/>
          :null }
          </ListItemIcon>
          <ListItemText primary={component.name}  />
       </div>
     ))}
   </List>
      </>}
     </React.Fragment> )
 </List>
  );
}

export default SubMenu
