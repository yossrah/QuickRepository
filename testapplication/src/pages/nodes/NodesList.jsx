import React from 'react'
import { useSelector } from 'react-redux'
import { List,ListItemIcon,ListItemText } from '@mui/material'
function NodesList() {
    const onDragStart = (event, component) => {
        event.dataTransfer.setData('application/reactflow',  JSON.stringify(component));
        event.dataTransfer.effectAllowed = 'move';
      };
    const {componentsname}=useSelector((state)=>state.components)
  return (
    <React.Fragment>
    
    <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <List component="div" disablePadding>
           {componentsname.length === 0 ? (
            <div className="no-action-text">
              No such action
            </div>
          ) : (componentsname?.map((c)=>(
           <div className="dndnode"
           onDragStart={(event) => 
          onDragStart(event, c,'default')} 
          draggable  sx={{ pl: 3 }} >
              <ListItemIcon>
               </ListItemIcon>
               <ListItemText primary={c.name}  />
            </div>)
    ))}
    </List>
      </List>
      </React.Fragment>
  )
}

export default NodesList
