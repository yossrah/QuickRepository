import React, { useEffect ,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import { GetSubCategories,DeleteSubCategory } from '../../redux/actions/subcategActions';
import Button from '@mui/material/Button';
import RowTable from '../../components/RowTable';
import AddSubCategory from './AddSubCategory';
import Swipeable from '../../components/swipeable';
import EditSubCategory from './EditSubCategory';
import { StyledTableCell } from '../../components/Styles';
import TablePagination from '@mui/material/TablePagination';

const SubcategoriesList=()=> {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
const subcategories = useSelector(state=>state.souscategories.subcategories)
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
  const [id, setId]=useState()
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
        dispatch(DeleteSubCategory(_id))
      }
    })
   }
  useEffect(() => {
    dispatch(GetSubCategories());
  }, []);
  return (
    <React.Fragment>
    <Button variant="contained" startIcon={<AddIcon/>} color='primary'onClick={toggleDrawer('right', true)} sx={{ mt: 3, mb: 2 , position:'absolute',right:'10px' }} >
     Add a sub category</Button>
   <TableContainer component={Paper}  sx={{ marginTop: '80px' }} style={{borderRadius:10}}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Sub Category</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subcategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subcategory,index) => (
            <RowTable key={subcategory._id} 
            index={index}
            _id={subcategory._id} 
            name={subcategory.name}
            handleUpdate={toggleEdit('right', true,subcategory._id)}
            handleDelete={()=>{HandleDelete(subcategory._id)}}
            roleId={subcategory.categorieId ? subcategory.categorieId.name : '-'}
             >
            </RowTable>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[5, 10, 100]}
    component="div"
    count={subcategories.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
    <Swipeable key='right'open={state['right']} anchor='right' onClose={onClose}>
      <AddSubCategory onClose={onClose}/>
    </Swipeable>
    <Swipeable key='right' open={edit['right']} anchor='right' onClose={onCloseEdit} id={id}>
      <EditSubCategory id={id} onClose={onCloseEdit}/>
    </Swipeable>
 </React.Fragment>
  )
}
  
  export default SubcategoriesList;
