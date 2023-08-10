import React, { useEffect ,useState} from 'react';
import { useDispatch,useSelector} from 'react-redux'
import { DeleteParam } from '../../redux/actions/paramAction';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { GetParams } from '../../redux/actions/paramAction';
import Button from '@mui/material/Button';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import RowTable from '../../components/RowTable';
import AddParam from './AddParam';
import Swal from 'sweetalert2';
import EditParam from './EditParam';
import Swipeable from '../../components/swipeable';
import { StyledTableCell } from '../../components/Styles';
import TablePagination from '@mui/material/TablePagination';
import Title from '../../components/Title';
import BackdropItem from '../../components/controls/BackdropItem';
import SearchField from '../../components/controls/SearchField';
const ParamsList=()=> {
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
  const {params,loading}=useSelector((state)=>state.params)
  const filteredparams = params.filter((component) => {
    if (component.nom && typeof component.nom === 'string') {
      return component.nom.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });
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
        dispatch(DeleteParam(_id))
      }
    })
   }
   const [id, setId]=useState()
  useEffect(() => {
   dispatch(GetParams()) ;
  }, []);
  return (
    <React.Fragment>
    <div style={{ marginLeft:'40px' }}>
    <div style={{display:'flex',justifyContent: 'space-between', alignItems: 'center',marginTop: '20px'}}>
    <div style={{ color: '#1a237e' }}>
    <Title title="Parameters list" ></Title>
    </div> 
    <Button variant="contained" startIcon={<AddIcon/>} color='primary'onClick={toggleDrawer('right', true)} sx={{ mt: 3, mb: 1 , }} >
                Add parameter
    </Button> </div>
    <h6 style={{ color: '#0d47a1',marginBottom:'20px'}}>Search by param name </h6>
    <SearchField value={searchTerm} placeholder="Search..."
           onChangeHandler={(e) => setSearchTerm(e.target.value)}
           style={{ marginTop: '20px' }}></SearchField>
    <TableContainer component={Paper}  style={{borderRadius:10}} sx={{ marginTop: '40px' }}>
      <Table sx={{ minWidth: 1200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell><Avatar style={{height:'30px',width:'30px'}}><PermDataSettingIcon/></Avatar></StyledTableCell>
            
            <StyledTableCell>Param</StyledTableCell>
            <StyledTableCell>Value</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredparams?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((param,index) => (
            <RowTable key={param._id} 
            index={index}
            _id={param._id} 
            name={param.nom}
            lastname={param.value}
            handleDelete={()=>{HandleDelete(param._id)}} 
            handleUpdate={toggleEdit('right', true,param._id)}
            >
            </RowTable>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[5, 10, 100]}
    component="div"
    count={params.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
  </div>
  <BackdropItem open={loading}/>
    <Swipeable key='right'
    open={edit['right']} 
    anchor='right'
    onClose={onCloseEdit} id={id}>
    <EditParam id={id} onClose={onCloseEdit}/>
    </Swipeable>
    <Swipeable key='right'
    open={state['right']} 
    anchor='right'
    onClose={onClose}>
    <AddParam onClose={onClose}></AddParam>
    </Swipeable>

</React.Fragment>
  )
}

  
  export default ParamsList
