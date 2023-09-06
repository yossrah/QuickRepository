import React, { useEffect ,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHeading from '../../components/TableHead';
import { GetCategories,DeleteCategory } from '../../redux/actions/categoryAction';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import RowTable from '../../components/RowTable';
import AddCategory from './AddCategory';
import { Avatar } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import EditCategory from './EditCategory';
import Swipeable from '../../components/swipeable';
import { StyledTableCell } from '../../components/Styles';
import TablePagination from '@mui/material/TablePagination';
import BackdropItem from '../../components/controls/BackdropItem';
import SearchField from '../../components/controls/SearchField';
import Title from '../../components/Title';
function CategoriesList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const {categories}=useSelector((state)=>state.categorie)?? [];
  const {isLoading}=useSelector((state)=>state.categorie)
  const filteredcategory = categories?.filter((category) => category?.name) // Check if category and its name are defined
  .filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
    console.log(_id)
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
        dispatch(DeleteCategory(_id))
      }
    })
   }
  useEffect(() => {
   dispatch(GetCategories()) ;
   }, []);
  return (
    <>
    <div style={{ marginLeft:'40px' }}>
    <div style={{display:'flex',justifyContent: 'space-between', alignItems: 'center',marginTop: '20px'}}>
    <div style={{ color: '#1a237e', }}>
     <Title title="Categories list"></Title>
     </div> 
     <Button variant="contained" startIcon={<AddIcon/>} color='primary' onClick={toggleDrawer('right', true)} sx={{ mt: 3, mb: 1 , }} >Add a category</Button>
    </div>
    <h6 style={{ color: '#0d47a1',marginBottom:'20px'}}>Search by category name </h6>
    <SearchField value={searchTerm} placeholder="Search..."
          onChangeHandler={(e) => setSearchTerm(e.target.value)} style={{ marginTop: '20px', }}>
    </SearchField>
    
    <TableContainer component={Paper}  sx={{ marginTop: '40px', }} style={{borderRadius:10}}>
      <Table sx={{ minWidth: 1200 }} aria-label="customized table">
      <TableHeading category="Category" avatar=<CategoryIcon/>></TableHeading>
        <TableBody>
          {filteredcategory?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((category,index) => (
            <RowTable key={category._id} 
            index={index}
            _id={category._id} 
            name={category.name}
            children=<EditCategory id={category._id}/>
            handleUpdate={toggleEdit('right', true,category._id)}
            handleDelete={()=>{HandleDelete(category._id)}}
             >
            </RowTable>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    <Swipeable key='right'
    open={state['right']} 
    anchor='right'
    onClose={onClose}>
    <AddCategory onClose={()=>onClose()}></AddCategory>
    </Swipeable>
    <Swipeable key='right'
    open={edit['right']} 
    anchor='right'
    onClose={onCloseEdit} id={id}>
    <EditCategory id={id} onClose={()=>onCloseEdit()}/>
    </Swipeable>
    <BackdropItem open={isLoading}/>
    </div>
    </>
  )
}
export default CategoriesList;
