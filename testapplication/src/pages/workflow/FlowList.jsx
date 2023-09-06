import React, { useEffect ,useState} from 'react';
import { useDispatch,useSelector} from 'react-redux'
import { DeleteFlow,GetFlows,GetFlow,GetFlowByuser } from '../../redux/actions/flowActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHeading from '../../components/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RowTable from '../../components/RowTable';
import Swal from 'sweetalert2';
import Swipeable from '../../components/swipeable';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell } from '../../components/Styles';
import TablePagination from '@mui/material/TablePagination';
import BackdropItem from '../../components/controls/BackdropItem';
import Title from '../../components/Title'
import SearchField from '../../components/controls/SearchField';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const FlowsList=()=> {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  //---------------------------pagination-----------------------------------------------------------
  const {loader,previous,next}=useSelector((state)=>state.flows)
  const {flows}=useSelector((state)=>state.flows)
  const {user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const filteredFlows = flows.filter((flow) =>
    flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.author?.email.toLowerCase().includes(searchTerm.toLowerCase())||
    flow.author?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //<----------------------------------------------------Drawer----------------------------------->
  const [state, setState] =useState({right: false });
  const [edit, setEdit] =useState({right: false });
  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setState({ ...state, [anchor]: open });
  // };
  const onClose=()=>{
    setState({ ...state, 'right': false });
  }
  // const onCloseEdit=()=>{
  //   setEdit({ ...edit, 'right': false });
  // }
  const toggleEdit = (anchor, open,_id) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
     setId(_id)
     setEdit({ ...edit, [anchor]: open });
  };
  //<----------------------------------------------------Drawer------------------------------------>
  const dispatch=useDispatch()
  const HandleDelete=(_id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'user has been deleted.',
          'success'
        )
        dispatch(DeleteFlow(_id))
      }
    })
   }
   const Handleflow=(_id)=>{
    dispatch(GetFlow(_id))
    navigate(`/layout/scriptlayout`)
   }
   const [id, setId]=useState()
  useEffect(() => {
    if(user.roleId?.nom==="Admin"){
      dispatch(GetFlows(page + 1, rowsPerPage));
    }
    else{
      dispatch(GetFlowByuser(user?.id))
    }
   
  }, [dispatch, page, rowsPerPage]);
  const handleNext = () => {
    if (next) {
      // Fetch the next page when the "Next" button is clicked
      dispatch(GetFlows(next.page, next.limit));
    }
  };

  const handlePrevious = () => {
    if (previous) {
      // Fetch the previous page when the "Previous" button is clicked
      dispatch(GetFlows(previous.page, previous.limit));
    }
  };

  return (
    <div style={{ marginLeft:'40px' }}>
   <div style={{ color: '#1a237e',marginTop: '40px', }}>
    <Title title="Workflows"></Title>
    <h5 style={{ color: '#0d47a1',marginBottom:'20px'}}>Create automations even faster with our workflow templates.</h5>
    </div>
    <h6 style={{ color: '#0d47a1',marginBottom:'20px'}}>Search by name ,author and email </h6>
          <SearchField value={searchTerm} placeholder="Workflow.."
           onChangeHandler={(e) => setSearchTerm(e.target.value)}
           style={{ marginTop: '20px' }}></SearchField>
    <TableContainer component={Paper}  sx={{ marginTop: '40px' }} style={{borderRadius:10}}>
      <Table sx={{ minWidth: 1200 }} aria-label="customized table">
      <TableHeading name="Workflow" lastname="Author" avatar=<FolderIcon/> email="Email"date="Created At"></TableHeading>
        <TableBody>
          {filteredFlows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((flow,index) => (
            <RowTable key={flow._id} 
            _id={flow._id} 
            name={flow.name}
            index={index}
            author={flow.author ? flow.author.name +' '+ flow.author.lastname : '-'}
            
            email={flow.author ? flow.author.email : '-'}
            date={flow.createdAt}
            handleDelete={()=>{HandleDelete(flow._id)}} 
            handleUpdate={()=>navigate(`/layout/editflow/${flow._id}`)}
            >
            </RowTable>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{ display: 'flex',justifyContent: 'flex-end',  alignItems: 'center' }}>
    <Button onClick={handlePrevious} disabled={!previous} >Previous</Button>
    <Button onClick={handleNext} disabled={!next}>Next</Button>
    </div>
    <TablePagination rowsPerPageOptions={[5, 10, 100]} component="div" count={flows.length}
    rowsPerPage={rowsPerPage} page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
    <BackdropItem open={loader}/>
    <Swipeable key='right' open={state['right']} anchor='right' onClose={onClose}></Swipeable>
</div>
  )
}
export default FlowsList
