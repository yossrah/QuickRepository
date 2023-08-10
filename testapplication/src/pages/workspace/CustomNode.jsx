/* eslint-disable jsx-a11y/img-redundant-alt */
import { IconButton } from '@mui/material';
import React, { memo } from 'react';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import EditNode from '../workflow/EditNode';
import Swipeable from '../../components/swipeable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch,useSelector } from 'react-redux';
import { DeleteNode ,GetNode} from '../../redux/actions/nodeActions';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useNodeId, useStore,useUpdateNodeInternals  } from 'reactflow';
import zIndex from '@mui/material/styles/zIndex';
const Node = styled.div`
  /* padding: 10px 10px; */
  border-radius: 5px;
  font-size: 10px;
  text-align: center;
  background-color: white;
  background: ${(props) => props.theme.nodeBg};
  color: ${(props) => props.theme.nodeColor};
  border: 1px solid ${(props) => (props.selected ? props.theme.primary : 'gray')};
  box-shadow: ${(props) => (props.clicked ? '0 0 5px rgba(0, 0, 0, 0.3)' : 'none')};
  position: relative;
  .react-flow__handle {
    background: ${(props) => props.theme.primary};
    width: 8px;
    height: 10px;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: gray;
  }
`;

function CustomNode({ nodeList,data,selected,code,id, ...otherProps }
  // { data, selected ,_id,deleteNode}
  ) {
     //<----------------------------------------------------Drawer----------------------------------->
  const [edit, setEdit] =useState({right: false });
 const onCloseEdit=()=>{
    setEdit({ ...edit, 'right': false });
  }
  const toggleEdit = (anchor, open,size) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
     setEdit({ ...edit, [anchor]: open });
  };
  //<----------------------------------------------------Drawer------------------------------------>
  
    const updateNodeInternals = useUpdateNodeInternals();
    const [isVisible, setIsVisible] = useState(true);
    const size = useStore((s) => {
      const node = s.nodeInternals.get(id);
        return node._id
      });
  const dispatch=useDispatch()
  const nodeId = useNodeId();
  const {node}=useSelector((state)=>state.nodes)
  const getNode=(_id)=>{
    dispatch(GetNode(_id))
    console.log('NODE',node)
    console.log('NODELIST',nodeList)
   }
  
  const HandleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Node has been deleted.',
          'success'
        )
        dispatch(DeleteNode(id))
        updateNodeInternals(size)
        setIsVisible(false); // Masquer le nœud après la suppression
      }
    })
    
    console.log('data',id);
   
  };
  if (!isVisible) {
    return null; // Retourne null si le nœud est supprimé pour le masquer de l'interface
  }
  return (
     
    <>
          <div >
            <div  >
              <IconButton color='error' style={{ padding: '6px', width: '7px', height: '7px',zIndex:"99999"}}>
              <DeleteIcon onClick={()=>HandleDelete(size)}  style={{ fontSize: '9px',zIndex:'99999'  }}></DeleteIcon>
              </IconButton>
              <IconButton color='secondary' style={{ padding: '6px', width: '7px', height: '7px',zIndex:'99999' }}>
              <EditIcon style={{ fontSize: '9px', }} onClick={toggleEdit('right', true,size)}></EditIcon></IconButton>
            </div>
          </div>
          <Node selected={selected} onClick={()=>HandleDelete(data)}>
          <div  style={{ width: '65px', height: '65px' }}>
            <div >
              <div >
               <img src={`http://localhost:3001/uploads/${data.icon}`} alt="Category Image" 
                 style={{ width: '20px', height: '20px',marginTop:'10px' }}/> 
              <br /> 
             
                <div>
                  <div >{data.name}</div>
                  {size && <div></div>}
                </div>
              </div>
              <Handle type="target" position={Position.Left} />
              <Handle type="source" position={Position.Right} />
            </div>
          </div>
          </Node>
          <Swipeable key='right'
           open={edit['right']} 
           anchor='right' >
          <EditNode size={size} onClose={onCloseEdit}/>
    </Swipeable>
        </>
    
  );
}
export default memo(CustomNode);




