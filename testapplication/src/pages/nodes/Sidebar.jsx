import React ,{ useState }from 'react';
import { useDispatch } from 'react-redux';
import { GetActionbycatego } from '../../redux/actions/componentAction';
import FeaturesContainer from './FeaturesContainer';
import SearchItem from '../../components/controls/SearchItem';
import Title from '../../components/Title';


const Sidebar =() => {
  
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
    <aside >
    <div style={{ marginTop: '50px' ,marginLeft:'10px' }}>
    
        <Title title="Select a Trigger" />
        <div className="description">You can drag these nodes to the pane on the right.</div>
      </div>
       <SearchItem placeholder="Search nodes..."></SearchItem>
       <div className='container'>
       </div>
      <div>
      <FeaturesContainer handleID={handleID} id={id}/>
    </div>
    
    </aside>

  );
};
export default Sidebar
