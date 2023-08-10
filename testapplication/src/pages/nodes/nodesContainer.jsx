import React ,{ useState }from 'react';
import { useDispatch } from 'react-redux';
import { GetActionbycatego } from '../../redux/actions/componentAction';

import SearchItem from '../../components/controls/SearchItem';
import PopularNodes from './PopularNodes';
import NodesList from './NodesList';
import Trigger from './Trigger';
const NodesContainer =() => {
  
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
    const dispatch=useDispatch()
    const [id,setIdSubcateg]=useState()
    const handleID=(newId)=>{
      setIdSubcateg(newId)
     dispatch(GetActionbycatego(newId))
    }
 
  return (
    <React.Fragment>
    <aside>
    <div style={{ marginTop: '50px' ,marginLeft:'10px' }}>
    <h6>Drag nodes</h6>
    </div>
      <SearchItem placeholder="Search nodes..."></SearchItem>
    </aside>
    </React.Fragment>
  );
};
export default NodesContainer
