/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useState } from 'react';
import { useDispatch,useSelector} from 'react-redux'
import Table from '@mui/material/Table';
import Swal from 'sweetalert2'
import TableBody from '@mui/material/TableBody';
import TableHeading from '../../components/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetProfiles,DeleteProfile,GetUserByRole } from '../../redux/actions/userAction';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import RowTable from '../../components/RowTable';
import BackdropItem from '../../components/controls/BackdropItem';
import { StyledTableCell } from '../../components/Styles';
import TablePagination from '@mui/material/TablePagination';
import SearchField from '../../components/controls/SearchField';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import {Avatar} from '@mui/material';
import Title from '../../components/Title';
import SelectField from '../../components/SelectField';
import { GetRoles } from '../../redux/actions/roleActions';

export default function UsersList  ()  {
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
  const {profiles,loading,next,previous}=useSelector((state)=>state.users)
  const {rolesuser}=useSelector(state=>state.roles)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [selectedRole, setSelectedRole] = React.useState('');
  const [all, setAll] = useState(true);

const handleChangeRole = (event) => {
  setSelectedRole(event.target.value);
  if (event.target.value === "All"){
    // console.log('truuuuuuuuuuuuuuuuuuuuuuuuuuuuuuue')
    dispatch(GetProfiles())
  }
  else{
    // console.log('eveeeeeeeeeeeeeeeeeent',event.target.value)
    dispatch(GetUserByRole(event.target.value))
  }
  
};
// console.log('selectedRole',selectedRole)
  const filteredprofiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  //<-----------------------------------------Backdrop-------------------------------------------------------->
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(loading);
  };
//<-----------------------------------------Backdrop-------------------------------------------------------->
  // useEffect(() => {
  //   handleOpen()
  //   dispatch(GetRoles())
  //   dispatch(GetProfiles());
  // }, []);
   
  useEffect(() => {
    handleOpen()
    dispatch(GetRoles())
    dispatch(GetProfiles(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);
  const handleNext = () => {
    if (next) {
      // Fetch the next page when the "Next" button is clicked
      dispatch(GetProfiles(next.page, next.limit));
    }
  };

  const handlePrevious = () => {
    if (previous) {
      // Fetch the previous page when the "Previous" button is clicked
      dispatch(GetProfiles(previous.page, previous.limit));
    }
  };
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
        dispatch(DeleteProfile(_id))
      }
    })
    }
  return (
     <div style={{ marginLeft:'40px' }}>
     <div style={{display:'flex',justifyContent: 'space-between', alignItems: 'center',marginTop: '20px'}}>
     <div style={{ color: '#1a237e', }}>
       <Title title="Total users"></Title>
     </div>
     <Button variant="contained" startIcon={<AddIcon/>} color='primary' onClick={()=>{navigate('/layout/register')}} sx={{ mt: 2, mb: 1 , }} >
                Add new member
    </Button>
    </div>
    <h6 style={{ color: '#0d47a1',marginLeft:'5px' }}>Search or select role : </h6>
    <div style={{ display: 'flex',  alignItems: 'center', }}>
    <SearchField value={searchTerm} placeholder= "Name,Email.."
      onChangeHandler={(e) => setSearchTerm(e.target.value)}></SearchField>
      <SelectField roles={rolesuser}  all={all} name={"roleId"} onChangeHandler={handleChangeRole}>
         </SelectField>
   </div>
    <TableContainer component={Paper}  sx={{ marginTop: '40px' }} style={{borderRadius:10}} >
      <Table sx={{ minWidth: 1200 }} aria-label="customized table" >
      <TableHeading name="Name" lastname="Lastname" avatar=<SupervisedUserCircleIcon/> email="Email"
       phone="Phone" status="Status" role="Role" date="Created At"></TableHeading>
        <TableBody>
         {filteredprofiles?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((user,index) => (
            <RowTable key={user._id} 
            index={index}
            _id={user._id} 
            name={user.name} 
            lastname={user.lastname} 
            phone={user.phone} 
            email={user.email}
            date={user.createdAt}
            handleDelete={()=>HandleDelete(user._id)}
            handleUpdate={()=>navigate(`/layout/update/${user._id}`)}
            roleId={user.roleId ? user.roleId.nom : '-'}
            isActive={user.isActive? "Active" : "Not Active"}>
            </RowTable>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{ display: 'flex',justifyContent: 'flex-end',  alignItems: 'center' }}>
         <Button onClick={handlePrevious} disabled={!previous} >Previous</Button>
         <Button onClick={handleNext} disabled={!next}>Next</Button>
         </div>
    <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={profiles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    <BackdropItem open={loading}/>
    </div>
  );
};


