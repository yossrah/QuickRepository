import React ,{useEffect}from 'react'
import UserCard from '../../components/controls/UserCard'
// import Button from '@mui/joy/Button/Button'
import Button from '@mui/material/Button';
import { GetComments,DeleteComment } from '../../redux/actions/contactAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import SkeletonAnimation from '../../components/controls/SkeletonAnimation';
import Swal from 'sweetalert2';

function ListComments() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const page= 0;
  const rowsPerPage = 5;
  const {messages,isLoading,next,previous}=useSelector((state)=>state.contact)
  useEffect(() => {
    dispatch(GetComments(page + 1, rowsPerPage)) ;
    }, [dispatch, page, rowsPerPage]);
    const handleNext = () => {
      if (next) {
        dispatch(GetComments(next.page, next.limit));
      }
    };
  
    const handlePrevious = () => {
      if (previous) {
        dispatch(GetComments(previous.page, previous.limit));
      }
    };
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
          dispatch(DeleteComment(_id))
          // console.log('user',_id)
        }
      })
     }
    // console.log('mssgs',isLoading)
  return (
    <>
   
   <div style={{ marginLeft:'60px',width:'100wh' }}>
   
    <h3 style={{ color: '#0d47a1', marginBottom: '10px',marginTop: '40px' }}>Hello to QuickTest forum Space</h3>
    <div style={{display:'flex',justifyContent: 'space-between', alignItems: 'center',marginTop: '20px'}}>
     
    <h5 style={{ color: '#0078dd',marginBottom: '10px' }}>Workflow automation for technical people</h5>
     <Button
    variant="outlined"
    color='primary' 
    onClick={()=>{navigate('/layout/savecomment')}}
    sx={{
        mt:1,
        mb: 2,
        backgroundColor: '#0078dd', 
        color: '#ffffff', 
        '&:hover': {
         backgroundColor: '#0078dd',
    },
  }}
>
  Post issue ?
</Button>
    </div>
    {isLoading? <SkeletonAnimation/>:
    <>
      {messages?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((mssg)=>(
        <UserCard key={mssg._id} 
        HandleDelete={()=>{HandleDelete(mssg._id)}}
          mssg={mssg}
        />
        ))}
        <div style={{ display: 'flex',justifyContent: 'flex-end',  alignItems: 'center' }}>
         <Button onClick={handlePrevious} disabled={!previous} >Previous</Button>
         <Button onClick={handleNext} disabled={!next}>Next</Button>
         </div>
      </>  
    }
      </div>
  </>
    
  )
}

export default ListComments
