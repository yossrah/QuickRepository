import React ,{ useState }from 'react';
import { useDispatch } from 'react-redux';
import { GetActionbycatego ,GetActions} from '../../redux/actions/componentAction';
import PopularNodes from './PopularNodes';
import CategoryMenu from '../sidemenu/CategoryMenu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
const Trigger=({onClose}) => { //it s like the sidebar it s the container of category and subCtegory in the drawer  
  const dispatch=useDispatch()
    const [id,setIdcateg]=useState()
    const[verify,setVerify]=useState(false)
    const handleID=(newId)=>{
      setIdcateg(newId) 
     dispatch(GetActionbycatego(newId))
    }
    const HandleSearch=()=>{
      setVerify(true)
      dispatch(GetActions())
    }
  return (
    <aside style={{ position: 'Absolute', right: '10px',  }} >
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <Tooltip title="Search">
       <IconButton style={{marginBottom:'40px'}} onClick={()=>HandleSearch()}><SearchIcon/></IconButton>
    </Tooltip>
    <Tooltip title="Close">
       <IconButton style={{marginBottom:'40px'}} onClick={()=>setVerify(false)}><CloseIcon/></IconButton>
    </Tooltip>
    </div>
   <PopularNodes verify={verify}></PopularNodes>
      <div>
    <CategoryMenu/>
    </div>
    </aside>
  );
};
export default Trigger