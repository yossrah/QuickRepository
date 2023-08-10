import React, { useEffect,useState } from 'react';
import { useDispatch,useSelector} from 'react-redux'
import Table from '@mui/material/Table';
import Swal from 'sweetalert2'
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetActions,DeleteAction ,GetPaginatedActions} from '../../redux/actions/componentAction';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RowTable from '../../components/RowTable';
import Swipeable from '../../components/swipeable';
import AddComponent from './AddComponent';
import EditComponent from './EditComponent';
import { StyledTableCell } from '../../components/Styles';
import TablePagination from '@mui/material/TablePagination';
import Title from '../../components/Title';
import BackdropItem from '../../components/controls/BackdropItem';
import SearchField from '../../components/controls/SearchField';
import AdsClickRoundedIcon from '@mui/icons-material/AdsClickRounded';
import { Avatar } from '@mui/material';
export default function ComponentsList  ()  {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
   const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const {components,loading,next,previous}=useSelector((state)=>state.components)
  const filteredcomponent = components.filter((component) => {
    if (component.name && typeof component.name === 'string') {
      return component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.categorieId.name.toLowerCase().includes(searchTerm.toLowerCase())
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
   const [id, setId]=useState() 
  const dispatch=useDispatch()
  
  useEffect(() => {
    dispatch(GetPaginatedActions(page + 1, rowsPerPage));
  }, []);
  const handleNext = () => {
    if (next) {
      // Fetch the next page when the "Next" button is clicked
      dispatch(GetPaginatedActions(next.page, next.limit));
    }
  };

  const handlePrevious = () => {
    if (previous) {
      // Fetch the previous page when the "Previous" button is clicked
      dispatch(GetPaginatedActions(previous.page, previous.limit));
    }
  };
  console.log('components',components)
  const HandleDelete=(_id)=>{
    // console.log(_id)
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
        dispatch(DeleteAction(_id))
      }
    })
    }
  return (
     <React.Fragment>
     <div style={{ marginLeft:'40px' }}>
     <div style={{display:'flex',justifyContent: 'space-between', alignItems: 'center',marginTop: '20px'}}>
    <div style={{ color: '#1a237e' }}>
     <Title title="Components list"></Title>
     </div> 
  
    
    <Button variant="contained" startIcon={<AddIcon/>} color='primary'onClick={toggleDrawer('right', true)} sx={{ mt: 3, mb: 1 , }} >
                create an action
    </Button>
    </div>
    <h6 style={{ color: '#0d47a1',marginBottom:'20px'}}>Search by name , category </h6>
    <SearchField value={searchTerm} placeholder="Search..."
    onChangeHandler={(e) => setSearchTerm(e.target.value)}
    style={{ marginTop: '20px', }}></SearchField>
    <TableContainer component={Paper}  sx={{ marginTop: '40px' }} style={{borderRadius:10}} >
      <Table sx={{ minWidth: 1200 }} aria-label="customized table" >
        <TableHead>
          <TableRow>
          <StyledTableCell>
          <Avatar style={{height:'30px',width:'30px'}}><AdsClickRoundedIcon/></Avatar></StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">icon</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {filteredcomponent?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((component,index) => (
            <RowTable key={component._id} 
            index={index}
            _id={component._id} 
            name={component.name}
            roleId={component.categorieId ? component.categorieId.name : '-'}
            image={component.icon? component.icon:'-'} 
            handleDelete={()=>HandleDelete(component._id)}
            handleUpdate={toggleEdit('right', true,component._id)}
            >
            </RowTable>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button onClick={handlePrevious} disabled={!previous} >
    Previous
  </Button>
  <Button onClick={handleNext} disabled={!next}>
    Next
  </Button>
      <TablePagination
      rowsPerPageOptions={[5, 10, 25,50]}
      component="div"
      count={components.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      <BackdropItem open={loading}/>
    <Swipeable key='right'
    open={state['right']} 
    anchor='right'
    onClose={onClose}>
    <AddComponent onClose={onClose}></AddComponent>
    </Swipeable>
    <Swipeable key='right'
    open={edit['right']} 
    anchor='right'
    onClose={onCloseEdit} id={id}>
    <EditComponent id={id} onClose={onCloseEdit}/>
    </Swipeable>
    </div>
    </React.Fragment>
  );
};


