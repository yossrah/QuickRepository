import React, { useEffect ,useState} from 'react';
import { useDispatch,useSelector} from 'react-redux'
import { DeleteRole } from '../../redux/actions/roleActions';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHeading from '../../components/TableHead';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import { GetRoles } from '../../redux/actions/roleActions';
import Button from '@mui/material/Button';
import RowTable from '../../components/RowTable';
import AddRole from './AddRole';
import Swal from 'sweetalert2';
import EditRole from './EditRole';
import Swipeable from '../../components/swipeable';
import { StyledTableCell } from '../../components/Styles';
import TablePagination from '@mui/material/TablePagination';
import BackdropItem from '../../components/controls/BackdropItem';
import Title from '../../components/Title';
import SearchField from '../../components/controls/SearchField';
const RolesList=()=> {
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
  const roles=useSelector((state)=>state.roles.rolesuser)
  const {isLoading}=useSelector((state)=>state.roles)
  const filteredroles = roles.filter((role) => {
    if (role.nom && typeof role.nom === 'string') {
      return role.nom.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });
  //<----------------------------------------------------Drawer----------------------------------->
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
        dispatch(DeleteRole(_id))
      }
    })
   }
   const [id, setId]=useState()
  useEffect(() => {
   dispatch(GetRoles()) ;
  }, []);
  return (
    <React.Fragment>
    <div style={{ marginLeft:'40px' }}>
    <div style={{display:'flex',justifyContent: 'space-between', alignItems: 'center',marginTop: '20px'}}>
     <div style={{ color: '#1a237e' }}>
      <Title title="Roles list"></Title>
      </div> 
   
          
    <Button variant="contained" startIcon={<AddIcon/>} color='primary' onClick={toggleDrawer('right', true)} sx={{ mt: 3, mb: 1 ,  }} >
      Add a role
    </Button>
    </div>
    <h6 style={{ color: '#0d47a1',marginBottom:'20px'}}>Search by role name </h6>
    <SearchField value={searchTerm} placeholder="Search..."
           onChangeHandler={(e) => setSearchTerm(e.target.value)}
           style={{ marginTop: '20px' }}></SearchField>
    <TableContainer component={Paper}  sx={{ marginTop: '40px',  }} style={{borderRadius:10}}>
      <Table sx={{ minWidth: 1200 }} aria-label="customized table">
      <TableHeading avatar=<AdminPanelSettingsIcon/> role="Role"></TableHeading>
        <TableBody>
          {filteredroles?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((role,index) => (
            <RowTable key={role._id} 
            index={index}
            _id={role._id} 
            name={role.nom}
            handleDelete={()=>{HandleDelete(role._id)}} 
            handleUpdate={toggleEdit('right', true,role._id)}
            >
            </RowTable>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[5, 10, 100]}
    component="div"
    count={roles.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
    <Swipeable key='right'
    open={edit['right']} 
    anchor='right'
    onClose={onCloseEdit} id={id}>
    <EditRole id={id} onClose={onCloseEdit}/>
    </Swipeable>
    <Swipeable key='right'
    open={state['right']} 
    anchor='right'
    onClose={onClose}>
    <AddRole onClose={onClose}></AddRole>
    </Swipeable>
    <BackdropItem open={isLoading}/>
    </div>
    </React.Fragment>
  )
}

  
  export default RolesList
