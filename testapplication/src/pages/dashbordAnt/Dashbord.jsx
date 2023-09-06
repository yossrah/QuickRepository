import React ,{ useEffect } from 'react'
import { Typography,Space, } from 'antd'
import { GetNumberFlows } from '../../redux/actions/flowActions';
import { GetNumberActions } from '../../redux/actions/componentAction';
import { GetNumberUsers } from '../../redux/actions/userAction';
import { GetNumberPosts } from '../../redux/actions/contactAction';
import { useDispatch ,useSelector} from 'react-redux';
import DashbordCard from '../../components/controls/DashbordCard'
import RecentWorkflows from '../recentWorkflows/RecentWorkflows'
import {PartitionOutlined,SubnodeOutlined ,TeamOutlined,CommentOutlined} from '@ant-design/icons';
import Forum from '../forums/Forum';
import { GetNumberCategories } from '../../redux/actions/categoryAction';

const DashbordPage=()=> {
  const typostyle={marginTop: '25px',color:'#1a237e' }
  const dispatch=useDispatch()
  const {message,isLoading}=useSelector((state)=>state.contact)
  const {flow,loader}=useSelector((state)=>state.flows)
  const {component}=useSelector((state)=>state.components)
  const isloading=useSelector((state)=>state.components.loading)
  const {profile,loading}=useSelector((state)=>state.users)
  const {category} = useSelector((state)=>state.categorie)
  const load= useSelector((state)=>state.categorie.isLoading)
  const List=[
    {value:flow,loading:loader,title:" Total Workflows",icon:<PartitionOutlined 
    style={{color:'#e65100',backgroundColor:'#ffe0b2',borderRadius:20,fontSize:24, padding:8}}/>},
    {value:component,loading:isloading,title:" Total Actions",
    icon:<SubnodeOutlined  style={{color:'#00e676',backgroundColor:'#b9f6ca',borderRadius:20,fontSize:24,padding:8}}/>},
    {value:profile,loading:loading,title:" Total Users",
    icon:<TeamOutlined style={{ color:'#aa00ff',backgroundColor:'#ea80fc',borderRadius:20,fontSize:24,padding:8}}/>},
    {value:message,loading:isLoading,title:" Total Interactions",
    icon:<CommentOutlined style={{color:'#1a237e',backgroundColor:'#82b1ff',borderRadius:20,fontSize:24, padding:8}}/>},
    {value:category,loading:load,title:" Total categories",icon:<PartitionOutlined 
    style={{color:'#e65100',backgroundColor:'#ffe0b2',borderRadius:20,fontSize:24, padding:8}}/>},
    
  ]
  useEffect(() => {
    dispatch(GetNumberFlows())
      dispatch(GetNumberActions())
      dispatch(GetNumberUsers())
      dispatch(GetNumberPosts())
      dispatch(GetNumberCategories())
   }, []);
  return (
    <React.Fragment>
    <div style={{marginTop:'40px',marginLeft:'50px'}}>
      <Typography.Title level={3} style={typostyle}>Dashbord</Typography.Title>
      <Space direction='horizontal'>
      {List?.map((item)=>
      <div style={{ marginRight: '30px' }}>
        <DashbordCard title={item.title} value={item.value}
        isloading={item.loading}
         icon={item.icon}>
        </DashbordCard>
        </div>
      )}
        </Space>
        <Typography.Title style={typostyle} level={3} >Recent workflows</Typography.Title>
      <Space direction='horizontal'>
       <RecentWorkflows></RecentWorkflows>
      </Space>
      <Typography.Title style={typostyle}  level={3}>QuickTest community</Typography.Title>
      <Space direction='horizontal'>
      <Forum></Forum>
      </Space>
      </div>
      </React.Fragment>
  )
}

export default DashbordPage
