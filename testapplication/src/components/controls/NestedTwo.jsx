import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import 'reactflow/dist/style.css';
import { GetActionbycatego } from '../../redux/actions/componentAction';
import { useDispatch,useSelector} from 'react-redux';
 function NestedTwo({id,name,handleID,children,subcategory,image,openItems, handlesubClick, handleItemClick}) {//components
 const onDragStart = (event, component) => {
    event.dataTransfer.setData('application/reactflow',  JSON.stringify(component));
    event.dataTransfer.effectAllowed = 'move';
  };
    const {components}=useSelector((state)=>state.components)
    const [open, setOpen] = React.useState(false);
    const dispatch=useDispatch()
    const handleClick = (id) => {
      dispatch(GetActionbycatego(id))
      handleID(id)
      handlesubClick(id)
      setOpen(!open);
      };
      
     console.log('actionsby Subcateg',components)
    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={()=>handleClick(id)}>
        <ListItemIcon>
        {image ?
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={`http://localhost:3001/uploads/${image}`} alt="Category Image" 
          style={{ width: '25px', height: '25px' }}/>
         :null }
          </ListItemIcon>
          <ListItemText primary={name} />
          {openItems.includes(id) ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openItems.includes(id)} timeout="auto" unmountOnExit>
        <List  component="div" disablePadding>
           {components.map((c)=>(
           <div className="dndnode"
           onDragStart={(event) => 
            onDragStart(event, c,'default')} 
             draggable  sx={{ pl: 3 }} >
              <ListItemIcon>
              {c.icon ?
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={`http://localhost:3001/uploads/${c.icon}`} alt="Category Image" 
                style={{ width: '20px', height: '20px' }}/>
               :null }
               </ListItemIcon>
               <ListItemText primary={c.name}  />
            </div>
    ))}
    </List>
  </Collapse>
      </List>
    );
  }
export default NestedTwo
