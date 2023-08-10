import React,{ useState } from 'react'
import ButtonSubmit from '../../components/ButtonSubmit'
import AddIcon from '@mui/icons-material/Add';
import AddComponent from '../components/AddComponent';
import Swipeable from '../../components/swipeable';
import { useSelector} from 'react-redux';
import SearchField from '../../components/controls/SearchField';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
const btStyle={ margin:'0px 0',backgroundColor:'primary'}
const PopularNodes=({verify,setVerify})=> {
  const onDragStart = (event, component) => {
        event.dataTransfer.setData('application/reactflow',  JSON.stringify(component));
        event.dataTransfer.effectAllowed = 'move';
      };
  //<----------------------------------------------------Drawer----------------------------------->
  const [state, setState] =useState({right: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const onClose=()=>{
    setState({ ...state, 'right': false });
  }
  
  //<----------------------------------------------------Drawer------------------------------------>
  const [searchTerm, setSearchTerm] = useState('');
  const {components,loading}=useSelector((state)=>state.components)
  const filteredcomponents = components.filter((component) =>
  (component.name || '').toLowerCase().includes(searchTerm.toLowerCase())
);
// console.log('compppppppppppppppppppppp',components)
  return (
    <React.Fragment>
    {verify?<>
    <SearchField value={searchTerm} onChangeHandler={(e) => setSearchTerm(e.target.value)}style={{ marginTop: '20px' }}/>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 450,overflow: 'auto', }}
      component="nav" aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
           List Nodes 
        </ListSubheader>
      }>
    <>
          {loading?<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }} >
          <CircularProgress/></div>:<>
          <List  component="div" disablePadding>
          {filteredcomponents?.map((component)=>(
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
      </>)
      </List>
    ) </>:null}
    <ButtonSubmit type="submit" variant="contained" title="New node" style={btStyle} startIcon={<AddIcon/>}
    onClick={toggleDrawer('right', true)}>
    </ButtonSubmit>
           <Swipeable key='right' open={state['right']} anchor='right'onClose={onClose}>
             <AddComponent onClose={onClose}></AddComponent>
           </Swipeable>
    </React.Fragment>
  )
}

export default PopularNodes
