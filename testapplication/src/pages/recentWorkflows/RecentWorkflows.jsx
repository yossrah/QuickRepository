import React,{ useEffect }  from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetRecentFlows } from '../../redux/actions/flowActions.js';
import SkeletonAnimation from '../../components/controls/SkeletonAnimation.jsx';
import CardFlow from '../../components/controls/CardFlow.tsx'
import Flux from '../../images/flux6.png'
import Flex from '../../images/flux8.png'
import Flix from '../../images/flux1.png'
import Flox from '../../images/flux2.png'
import Flax from '../../images/flux9.png'
function RecentWorkflows() {
 const images=[Flux,Flix,Flox,Flax,Flex]
    const dispatch=useDispatch()
    const {flows,loader}=useSelector((state)=>state.flows)
    const navigate=useNavigate()
    useEffect(() => {
        dispatch(GetRecentFlows());
       }, []);
       console.log('flows',flows)
       const HandleNavigate=(_id)=>{
        navigate(`/layout/editflow/${_id}`)
       }
  return (
    <React.Fragment>
    {loader?(
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={{ width: '200px', height: '80px', borderRadius: '10px', margin: '10px', flex: '1 0 auto' }}>
          <SkeletonAnimation />
        </div>
      ))}
    </div>
    )  :<>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', padding: '20px'  }}>
      {flows?.map((flow,index)=><CardFlow key={flow._id} title={flow.name} image={images[index]} 
       HandleNavigate={()=>HandleNavigate(flow._id)} style={{ marginLeft: index === 0 ? '-10px' : '0' }} ></CardFlow>)}
      </div>
      </>
      }
    
    </React.Fragment>
    
  )
}

export default RecentWorkflows
