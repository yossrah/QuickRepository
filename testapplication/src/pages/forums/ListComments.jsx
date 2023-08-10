import React ,{useEffect, useState}from 'react'
import UserCard from '../../components/controls/UserCard'
import Button from '@mui/joy/Button/Button'
import { GetComments,DeleteComment } from '../../redux/actions/contactAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import SkeletonAnimation from '../../components/controls/SkeletonAnimation';
import Swal from 'sweetalert2';
import { Pagination } from '@mui/material';
function ListComments() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {messages,isLoading}=useSelector((state)=>state.contact)
  //Pagination
  const items=5
  const [current,setCurrent]=useState(1)
  const NbPage=Math.ceil(messages.length / items)
  const startIndex=(current-1)*items
  const endIndex=startIndex+items
  const DataPerPage= messages.slice(startIndex,endIndex)
  const HandlePagination=(event,page)=>{
     setCurrent(page)
  }
  //Pagination
  useEffect(() => {
    dispatch(GetComments()) ;
    }, []);
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
     <h5 style={{ color: '#0078dd',marginBottom: '10px' }}>Workflow automation for technical people</h5>
     <Button
    variant="outlined"
    color='primary'
    onClick={()=>{navigate('/layoutAnt/savecomment')}}
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
    
    {isLoading? <SkeletonAnimation/>:
    <>
      {DataPerPage?.map((mssg)=>(
        <UserCard key={mssg._id} 
        HandleDelete={()=>{HandleDelete(mssg._id)}}
          mssg={mssg}
        />
      ))}
      <Pagination count={NbPage} page={current} onChange={HandlePagination}>
      </Pagination>
      </>  
    }
      </div>
  </>
    
  )
}

export default ListComments
