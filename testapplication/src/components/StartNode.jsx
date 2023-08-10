import React from 'react'
import AddIcon from '@mui/icons-material/Add';
const StartNode={
    dragHandle: '.custom-drag-handle',
    id: '0',
    data: {
     label: 
     <React.Fragment>
     <AddIcon />
     <br/>
      First move
     </React.Fragment>,
    },
    // type:'custom',
    position: { x: 50, y: 10 },
    style: {
     background: '#ffffff',
     border: '1px dashed #000000',
      width: 70,
      height: 70,
     borderRadius: '0%',
     },
    sourcePosition: 'right', 
    targetPosition: 'left',
 }

export default StartNode
