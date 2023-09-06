import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import {IconButton, Grid,Paper }from '@mui/material'
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import Title from '../../components/Title';
import { CreateNode } from '../../redux/actions/nodeActions';
import { GetParamsbyId } from '../../redux/actions/paramAction';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
const theme = createTheme();
const AddNode=({dragnode,handleNodeCreation,nodeList,onClose})=> {
const {param}=dragnode //the id of param or array of ids
const [form,setForm]=useState({}) //get dragnode data in a form
const {params,loading}=useSelector(state=>state.params) //get params byids
const {node}=useSelector(state=>state.nodes)
const [listParam,setListparam]=useState({})
    const handleList=(e)=>{
    setListparam({...listParam,[e.target.name]:e.target.value})
    }
    const [isClicked, setIsClicked] = useState(false);
  const handleCode=(code)=>{
    for (const [param, value] of Object.entries(listParam)) {
      setIsClicked(true);
      // Remplacer "param" par la clé du paramètre
      code = code.replace('param', param); // Remplacer "param" par la clé du paramètre
      code = code.replace('value', value); // Remplacer "value" par la valeur du paramètre
    }
    setForm((prevForm) => ({ ...prevForm, code: code}));
  }
  const dispatch=useDispatch()
  useEffect(() => {
    if(dragnode){
      dispatch(GetParamsbyId(param))
      setForm({...dragnode})
    }
    }, [dragnode]);
    console.log('paraaaaaaaam',param)
    console.log('paraaaaaaaam',params)
   useEffect(() => {
    if(node._id){ //if save node
        handleNodeCreation(node._id)
 //       setNodeIds((prevNodeIds)=>[...prevNodeIds, newNodeId]); //add the id to the nodeId list
 //       setNodeList((prevNodeList)=>[...prevNodeList, newNodeId]); // add the id to the nodeId list to save it for the workflow
       }}, [node._id]);
  const onSubmit=(e)=>{
    e.preventDefault()
    handleCode(dragnode.code)
    form.data=dragnode.data
    dispatch(CreateNode(form)).then((res) => {
      onClose();
    });
   
  }
  return  ( //sx={{ height: '100vh' }}
    <React.Fragment>
    <ThemeProvider theme={theme}>
    <Grid container component="main" 
    sx={{ height: '100vh',width:'300px' }} 
    xs={12} sm={8} md={12} >
    <Grid item xs={12} sm={8} md={12} component={Paper}  square>
    <IconButton onClick={()=>onClose()}>
    <CloseIcon/>
    </IconButton>
         <Box
         sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        
        <Grid >
        <Title title="Configure Node" ></Title>
        
        </Grid>
        {loading? <CircularProgress/>:
       <>
       {param.length>0?<>
        {params?.map((param,index)=><div key={param._id}>
          <div>Fill params in order</div>
          <div style={{marginTop:'10px'}}>{index+1} {param.nom} :</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <InputField
            type="text"
            variant='standard'
            name={param.nom}
            onChangeHandler={handleList}
            autoFocus="autofocus"
            // You can adjust the margin as needed
          />
          <IconButton onClick={() => handleCode(dragnode.code)}  >
            <CheckCircleOutlineIcon/>
          </IconButton>
        </div>
           </div>)}
          </>:<p>this node doesn't contain params</p>}
       </>
      }
       
        
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
          <Box sx={{py: 2,display: 'flex',flexDirection: 'row', // Set the flexDirection to 'row' to make the buttons appear side by side
      justifyContent: 'center', // Center the buttons horizontally within the container
      gap: '10px',}}>
       <ButtonSubmit type="submit" variant="contained" title="Save" />
       <ButtonSubmit type="reset" onClick={()=> onClose()} variant="contained" title="Reset" />
  </Box>
</Box>

           </Box>
           </Grid>
           </Grid>
       
       </ThemeProvider>
    </React.Fragment>
  )
}

export default AddNode
