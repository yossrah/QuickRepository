import React,{ useState, useRef, useCallback } from 'react';
import Modal from '../../components/controls/Modal';
import AddNode from '../workflow/CreateNode';
import Swipeable from '../../components/swipeable';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import './index.css';
import { Button } from '@mui/material';
import AddFlow from '../workflow/CreateFlow';
const start={
  id: '0',
  type: 'input',
  data: { label: 'Start' },
  position: { x: 250, y: 5 },
  code:"hellooooworld"
}
let id = 1;
const getId = () => `${id++}`;

const DnDFlow = () => {
  //<----------------------------------------------------Dreawer----------------------------------->
  const [state, setState] =useState({right: false });
  const [edit, setEdit] =useState({right: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const onClose=()=>{
    setState({ ...state, 'right': false });
  }
  const onCloseEdit=()=>{
    setEdit({ ...edit, 'right': false });
  }
  const toggleEdit = (anchor, open,_id) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
     setEdit({ ...edit, [anchor]: open });
  };
  //<----------------------------------------------------Drawer------------------------------------>
  
//<---------------------------------------------------------- Modal------------------------------------------>
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const HandleAdd=(node)=>{
    setOpenModal(true);
    }
  const HandleSave=(nodeList)=>{
      setOpenSaveModal(true);
      // console.log('handledrag',nodeList)
      }
//<---------------------------------------------------------- Modal-------------------------------------------->
  // const {flow}=useSelector((state)=>state.flows)
  const initialNodes = [
    start,
  ];
  // const initialEdges = [

  // ];

  console.log('initialNodes',initialNodes)
 
  // const [getInitialNodes,setInitialNodes] = useState(initialNodes)
  // useEffect(() => {
  //   if(flow.nodesList){
  //       setInitialNodes((prevNodes)=>([...prevNodes,flow.nodesList]))
  //     }
  //   }, [flow.nodesList]);
    
    // useEffect(() => {
    //   if(getInitialNodes.length>1){
    //     console.log('length',getInitialNodes.length)
    //       setNodes((nds)=> nds.concat(getInitialNodes))
    //     }
    //   }, [getInitialNodes]);
  
  const [nodeList,setNodeList] = useState([]) //to save nodeworkflow
  //const [edgeList,setEdgeList] = useState([])
  // console.log('getInitialNodes',getInitialNodes)
  // console.log('getInitialedgees',edgeList)
  const [dragnode, setNode]=useState({}) //to create node
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  // console.log('initialEdges',edges)
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
        position:position,
        code:component.code,
        icon:component.icon,
        param:component.param,
        actionId:component._id,
        data: { label : `${component.name} ` },
        type:component.name
      };
      setNodes((nds) => nds.concat(newNode));//concat the newnode to the list nodes
      setNode(newNode)
      // setNodeList((prevForm)=>([ ...prevForm, newNode] ))
      // setEdgeList((prevForm)=>([ ...prevForm, edges] }))
    },
    
    [reactFlowInstance]
  );
  console.log('nodes',nodes)
  console.log('nodeList',nodeList)
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
            onClick={()=>{
              // console.log('clicked',dragnode)
              HandleAdd(dragnode)
            }}
            fitView
            
             >
             <Background color='#b0dcdd' 
            //  variant={BackgroundVariant.Cross} gap={40}
            //  nodeClassName="custom-cross-line"
             ></Background>
            <MiniMap/>
            <Controls />
          </ReactFlow>
          <Button onClick={()=>HandleSave(nodeList)}>Save draft</Button>
        <Button onClick={toggleDrawer('right', true)} >Restore</Button>
        <Button>Generate code</Button>
        </div>
        
        <Modal title={"configure params"} openPopup={openModal} setOpenPopup={setOpenModal}>
          <AddNode dragnode={dragnode} setNodeList={setNodeList} nodeList={nodeList}/>
         </Modal>
         <Modal title={"Save Draft"} openPopup={openSaveModal} setOpenPopup={setOpenSaveModal}>
           <AddFlow nodeList={nodeList} edgeList={edges} /></Modal>
        <Sidebar />
      </ReactFlowProvider>
      
      <Swipeable key='right'
    open={state['right']} 
    anchor='right'
    onClose={onClose}>
    <Sidebar onClose={()=>onClose()}></Sidebar>
    </Swipeable>
    </div>
  );
};

export default DnDFlow;
