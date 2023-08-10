import React,{ useState, useRef, useCallback,useEffect } from 'react';
import Modal from '../../components/controls/Modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetFlow } from '../../redux/actions/flowActions';
import AddNode from '../workflow/CreateNode';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
} from 'reactflow';

import 'reactflow/dist/style.css';
import Sidebar from '../nodes/Sidebar';
import '../nodes/index.css'
import { Button } from '@mui/material';
import AddFlow from '../workflow/CreateFlow';

let id = 1;
const getId = () => `${id++}`;

const EditFlow = () => {
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
const dispatch=useDispatch()
const navigate=useNavigate()
const {id}=useParams()
const {flow}=useSelector((state)=>state.flows)
  const initialNodes = [
  ];
  const initialEdges = [
  ];
  useEffect(() => {
    dispatch(GetFlow(id));
    }, [id]);
  console.log('initial',flow)
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
  
  const [nodeList,setNodeList] = useState([])
  const [edgeList,setEdgeList] = useState([])
  console.log('getInitialNodes',getInitialNodes)
  console.log('getInitialedgees',edgeList)
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
  const handleGenerateCode = () => {
    const nodeCodes = nodeList.map(node => node.code);
    console.log('Node Codes:', nodeCodes);
    // You can perform further operations with the node codes, such as joining them together or processing them as needed.
  };
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
      // console.log('component',component)
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
      setNodes((nds) => nds.concat(newNode));
      setNode(newNode)
      // setEdgeList((prevForm)=>([ ...prevForm, edges] }))
    },
    
    [reactFlowInstance]
  );
  console.log('nodes',nodes)
  console.log('edgesssssList',edgeList)
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
             <Background color='#b0dcdd' variant={BackgroundVariant.Cross} gap={50} />
           <MiniMap/>
            <Controls />
          </ReactFlow>
        <Button>Restore</Button>
        <Button onClick={handleGenerateCode}>Generate code</Button>
        </div>
        <Modal title={"configure params"} dragnode={dragnode} openPopup={openModal} setOpenPopup={setOpenModal}>
          <AddNode dragnode={dragnode} setNodeList={setNodeList} nodeList={nodeList}/>
         </Modal>
         <Modal title={"Save Draft"} openPopup={openSaveModal} setOpenPopup={setOpenSaveModal}>
           <AddFlow nodeList={nodeList} edgeList={edges} /></Modal>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default EditFlow;
