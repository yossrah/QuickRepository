/* eslint-disable jsx-a11y/img-redundant-alt */
import React,{ useState, useRef, useCallback,useEffect} from 'react';
import Swipeable from '../../components/swipeable';
import Trigger from '../nodes/Trigger';
import BackdropItem from '../../components/controls/BackdropItem';
import { useSelector } from 'react-redux';
import StartNode from '../../components/StartNode';
import { GetNode,DeleteNode } from '../../redux/actions/nodeActions';
import { useDispatch } from 'react-redux';
import EditNode from '../workflow/EditNode';
import SpeedDialButton from '../../components/controls/SpeedDial';
import { useNavigate } from 'react-router-dom';
import { GetFlow,GetCode } from '../../redux/actions/flowActions';
import Modal from '../../components/controls/Modal';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css'
import './index.css';
import AddFlow from '../workflow/CreateFlow';
import AddNode from '../workflow/CreateNode';
import CustomNode from './CustomNode';
import Details from '../workFlDetails/details';
import CustomNodeWrapper from './CustomNodeWrapper';
import ShareCode from '../codePen/ShareCode';
import CodePen from '../codePen/CodePen';
const nodeTypes = {
  custom: CustomNodeWrapper
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};
let id = 1; //when i create the start i set id to 0
const getId = () => `${id++}`;
const WorkFlow = () => {
  const [openModal, setOpenModal] = useState(false);
  const HandleClose=()=>{
    setOpenModal(false)
  }
  const HandleCode=(id)=>{
    dispatch(GetCode(id))
    setOpenModal(true);
    }
  const [isStartNodeDeleted, setIsStartNodeDeleted] = useState(false);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {isloading}=useSelector(state=>state.nodes)
  const {node}=useSelector(state=>state.nodes)
  const {loading}=useSelector(state=>state.components)
  const {flow,loader,code}=useSelector((state)=>state.flows)
  console.log("floooooooooooooow",flow._id)
  const initialNodes = [
    StartNode ,
  ];
  const [getInitialNodes,setInitialNodes] = useState(initialNodes)
  const HandleShare=()=>{
    setState({ ...state, 'right': true })
  }
  useEffect(() => {
    if(node._id){
        setIsStartNodeDeleted(true);
        setInitialNodes((prevNodes) => prevNodes.filter((node) => node.id !== '0'));
        setInitialNodes((prevNodes)=> [...prevNodes, node])
        setNodes((nds)=> nds.concat(getInitialNodes))
      }
    }, [node._id]);
    console.log('new',getInitialNodes[node.id])
    console.log('noooooooooooooooooooooooooooode',getInitialNodes)
    const HandleDelete=(id)=>{
      // const elm=getInitialNodes[id]
      setNodes((prevNodes) => prevNodes.filter((node) => node._id !==id));
      dispatch(DeleteNode(id))
      console.log('deleted',id)
    }
  //<----------------------------------------------------Drawer----------------------------------->
  const [state, setState] =useState({right: false });
  const [add, setAdd] =useState({right: false });
  const [save, setSave] =useState({right: false });
  const [detail, setdetail] =useState({right: false });
    
  const onClose=()=>{
    setState({ ...state, 'right': false });
  }
  
  const onCloseCreate=()=>{
    setAdd({ ...add, 'right': false });
  }
  const onCloseSave=()=>{
    setSave({ ...save, 'right': false });
  }
  const toggleSave = (anchor, open,) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSave({ ...save, [anchor]: open });
  };
  const [edit, setEdit] =useState({right: false });
  const onCloseEdit=()=>{
    setEdit({ ...edit, 'right': false });
  }

  const [share, setShare] =useState({right: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShare({ ...share, [anchor]: open });
  };
  const onCloseShare=()=>{
    setShare({ ...share, 'right': false });
  }
  const toggleDetail = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setdetail({ ...detail, [anchor]: open });
  };
  const onCloseDetail=()=>{
    setdetail({ ...detail, 'right': false });
  }
  //<----------------------------------------------------Drawer------------------------------------>
const HandleAdd=(newNode)=>{
  setAdd({ ...add, right: true });
    }
    const HandleEdit = (nodeList,node) => {//to verify if node saved
      setEdit({ ...edit,  right: true  });
      console.log("Clicked node _id:", node._id);
    };
 const [nodeList,setNodeList] = useState([]) //for saving list nodes for the workfflow
 const [dragnode, setNode]=useState({}) //for save the newnode
 const reactFlowWrapper = useRef(null);
 const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes);
 const [edges, setEdges, onEdgesChange] = useEdgesState([]);
 const [reactFlowInstance, setReactFlowInstance] = useState(null);
 const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
 const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type || !event.clientX || !event.clientY) {
        return;
      }
      const position = reactFlowInstance.project({//take coordinates
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
       const component = JSON.parse(type);//parse the component or action to get data
       const newNode = {
        id: getId(),
        position:position,
        code:component.code,
        icon:component.icon,
        param:component.param,
        actionId:component._id,
        data:component,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type:component.type,
      };
      HandleAdd(newNode); //when drag open the drawer to save the node
      setNodes((nds) => nds.concat(newNode)); //concat the new node to the listnodes
      setNode(newNode)
      console.log('newNode',newNode)
       // Remove the "Start" node from the nodes list
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== '0'));
    },
   
    //
  );
  const handleNodeCreation = (newNodeId) => {
    if (!nodeList.includes(newNodeId)) {
      setNodeList((prevNodeList) => [...prevNodeList, newNodeId]);
      dispatch(GetNode(newNodeId));
    }
  };
  const generateCode = (id) => {
    // setCode({ ...newcode, right: true });
    dispatch(GetCode(id))
    // navigate('/layoutAnt/editor')
    navigate('/layoutAnt/editorcode')
    // You can perform further operations with the node codes, such as joining them together or processing them as needed.
  };
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={isStartNodeDeleted ? nodes.filter((node) => node.id !== '0') : nodes}//save the workflow getInitialNodes?getInitialNodes:
            node={node}
            edges={edges}
            dragnode={dragnode}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            defaultEdgeOptions={defaultEdgeOptions}
           >
           <Background color='#b0dcdd'>
             </Background>
             <SpeedDialButton handleSave={toggleSave('right', true)} 
             handleNavigate={()=>HandleCode(flow._id)} handleShare={HandleShare}
             handleDetails={toggleDetail('right', true)}></SpeedDialButton>
            <MiniMap/>
            <Controls />
          </ReactFlow>
        </div>
       </ReactFlowProvider>
    <Swipeable key='right'
    open={state['right']} 
    anchor='right'
    onClose={onClose}>
    </Swipeable>
    <Swipeable key='right'
    open={add['right']} 
    anchor='right'
    onClose={onCloseCreate}
    >
    <AddNode 
    onClose={()=>onCloseCreate() }
     dragnode={dragnode} handleNodeCreation={handleNodeCreation} nodeList={nodeList} 
     ></AddNode>
     

    </Swipeable>
    <Swipeable key='right'
    open={edit['right']} 
    anchor='right'
    onClose={onCloseEdit}>
    <EditNode id={id} 
    onClose={onCloseEdit} 
    dragnode={dragnode} 
    handleNodeCreation={handleNodeCreation} 
    nodeList={nodeList}></EditNode>
    </Swipeable>
    <Swipeable key='right'
    open={save['right']} 
    anchor='right'
    onClose={onCloseSave}>
    <AddFlow onClose={()=>onCloseSave()}
      nodeList={nodeList}
      edgeList={edges}
      handleWorkflow={GetFlow}
     ></AddFlow>
    </Swipeable>
    <Modal title={"Code"} id={flow._id} openPopup={openModal} setOpenPopup={setOpenModal}>
       <CodePen id={flow._id} HandleClose={HandleClose}/>
    </Modal>
    <Swipeable key='right'
     open={state['right']} 
     anchor='right'
     onClose={onClose}>
    <ShareCode onClose={onClose} codeValue={code}/>
    </Swipeable>
    <Swipeable key='right'
     open={detail['right']} 
     anchor='right'
     onClose={onCloseDetail}>
     <Details onClose={onCloseDetail}/>
    </Swipeable>
    <Trigger></Trigger>
    <BackdropItem open={isloading}></BackdropItem>
    <BackdropItem open={loading}></BackdropItem>
    <BackdropItem open={loader}></BackdropItem>
    
    </div>
    
  );
};




export default WorkFlow;
