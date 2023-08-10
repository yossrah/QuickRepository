import React,{ useState, useRef, useCallback,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetFlow, GetCode } from '../../redux/actions/flowActions';
import Trigger from '../nodes/Trigger';
import BackdropItem from '../../components/controls/BackdropItem';
import Swipeable from '../../components/swipeable';
import { useNavigate } from 'react-router-dom';
import ShareCode from '../codePen/ShareCode';
import Details from '../workFlDetails/details';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,Position
} from 'reactflow';
import SpeedDialButton from '../../components/controls/SpeedDial';
import CodePen from '../codePen/CodePen';
import 'reactflow/dist/style.css';
import '../nodes/index.css'
import AddNode from '../workflow/CreateNode';
import { GetNode } from '../../redux/actions/nodeActions';
import AddFlow from '../workflow/CreateFlow';
import { UpdateFlow } from '../../redux/actions/flowActions';
import DownloadButton from '../../components/controls/DownloadButton';
import CustomNode from './CustomNode';
import Modal from '../../components/controls/Modal';
const nodeTypes = {
  custom: CustomNode,
  
};
let id = 1;
const getId = () => `${id++}`;

const snapGrid = [25, 25];
const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};
const Getworkflow = () => {
   const [openModal, setOpenModal] = useState(false);
   const HandleCode=(id)=>{
    dispatch(GetCode(id))
    setOpenModal(true);
    }
    const HandleClose=()=>{
      setOpenModal(false);
      }
    const navigate=useNavigate()
    const [state, setState] =useState({right: false });
    const [add, setAdd] =useState({right: false });
    const [save, setSave] =useState({right: false });
    const [detail, setdetail] =useState({right: false });
    const [newcode, setCode] =useState({right: false });
    //************************************************************************************ */
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
    const onClose=()=>{
      setState({ ...state, 'right': false });
    }
  
    const onCloseCreate=()=>{
      setAdd({ ...add, 'right': false });
    }
    const toggleCreate = (anchor, open,) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
        setAdd({ ...add, [anchor]: open });
    };
    const onCloseSave=()=>{
      setSave({ ...save, 'right': false });
    }
    const toggleSave = (anchor, open,) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
        setSave({ ...save, [anchor]: open });
    };
    const onCloseCode=()=>{
      setCode({ ...newcode, 'right': false });
    }
    const toggleCode = (anchor, open,) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
        setCode({ ...newcode, [anchor]: open });
    };
  const [share, setShare] =useState({right: false });
  const toggleShare = (anchor, open) => (event) => {
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
    
const dispatch=useDispatch()
const {id}=useParams()
const {flow}=useSelector((state)=>state.flows)
const {code}=useSelector((state)=>state.flows)
const {loader}=useSelector((state)=>state.flows)
  const initialNodes = [
  ];
  const initialEdges = [
  ];
  const HandleShare=()=>{
    setState({ ...state, 'right': true })
  }
  useEffect(() => {
    dispatch(GetFlow(id));
    }, [id]);
  // console.log('initial',flow)
  const [getInitialNodes,setInitialNodes] = useState(initialNodes)
  const [getInitialEdges,setInitialEdges] = useState(initialEdges)
  useEffect(() => {
    if(flow.nodesList){
        setInitialNodes(flow.nodesList)
        setInitialEdges(flow.edgeList)
      }
    }, [flow.nodesList]);
    useEffect(() => {
      if(getInitialNodes.length>1){
        console.log('length',getInitialNodes.length)
          setNodes((nds)=> nds.concat(getInitialNodes))
          setEdges((nds)=> nds.concat(getInitialEdges))
        }
      }, [getInitialNodes]);
      const handleNodeCreation = (newNodeId) => {
        if (!nodeList.includes(newNodeId)) {
          setNodeList((prevNodeList) => [...prevNodeList, newNodeId]);
          dispatch(GetNode(newNodeId));
        }
      };
  const HandleAdd=(newNode)=>{
        setAdd({ ...add, right: true });
          }
  const [nodeList,setNodeList] = useState([])
  const [edgeList,setEdgeList] = useState([])
  // console.log('getInitialNodes',getInitialNodes)
  // console.log('getInitialedgees',edgeList)
  const [dragnode, setNode]=useState({})
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  console.log('Codes:', code);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const component = JSON.parse(type);
      const newNode = {
        id: getId(),
        position: position,
        code: component.code,
        icon: component.icon,
        param: component.param,
        actionId: component._id,
        data: component,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: component.type,
      };
  
      // Check if the node with the same ID already exists in the nodes state
      const nodeExists = nodes.some((node) => node.id === newNode.id);
      if (!nodeExists) {
        // If the node doesn't exist, open the drawer to save the new node
        HandleAdd(newNode);
      }
  
      // Concatenate the new node with the existing nodes
      setNodes((prevNodes) => prevNodes.concat(newNode));
    },
    [reactFlowInstance, nodes]
  );
  // console.log('nodes',nodes)
  // console.log('edgesssssList',edgeList)
  return (
    <div className="dndflow">
      <ReactFlowProvider>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}//save the workflow getInitialNodes?getInitialNodes:
            edges={edges}
            dragnode={dragnode}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            // onClick={()=>{
            //   // console.log('clicked',dragnode)
            //   HandleAdd(dragnode)
            // }}
            snapToGrid={true}
            snapGrid={snapGrid}
            fitView
            attributionPosition="bottom-left"
            defaultEdgeOptions={defaultEdgeOptions}
            >
             <Background color='#b0dcdd'/>
             <SpeedDialButton handleSave={toggleSave('right'
             , true)} 
             handleNavigate={()=>HandleCode(id)} 
             handleShare={HandleShare}
             handleDetails={toggleDetail('right', true)}></SpeedDialButton>
           <MiniMap/>
            <Controls />
            <DownloadButton />
          </ReactFlow>
        </div>
        <Trigger></Trigger>
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
    <BackdropItem open={loader}></BackdropItem>
    </div>
  );
};


export default Getworkflow
