import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from 'jwt-decode'
import { Logout, setUser } from './redux/actions/authActions';
import store from './redux/store'
import { Routes, Route, } from "react-router-dom";
import DashbordPage from './pages/dashbordAnt/Dashbord';
import AddRole from './pages/roles/AddRole'
import ResetPage from './pages/Auth/ResetPage';
import NotFound from './pages/NotFound';
import NoAccess from './pages/NoAccess';
import PrivateRouter from './components/PrivateRouter';
import { useSelector } from 'react-redux';
import { SetAuth } from './utils/setAuth';
import UsersList from './pages/Users/UsersList';
import ActivationPage from './pages/Auth/ActivationPage';
import ChangePwd from './pages/Auth/ChangePwd';
import RolesList from './pages/roles/RolesList'
import About from './pages/about/About';
import ListCategories from './pages/categories/ListCategories';

import ListSubCategories from './pages/subCategories/ListSubCategories';
import AddSubCategory from './pages/subCategories/AddSubCategory';
import EditCategory from './pages/categories/EditCategory';
import EditRole from './pages/roles/EditRole';
import PushSubCategorie from './pages/categories/PushSubCategory';
import PullSubCategorie from './pages/categories/PullSubCategory';
import MindFlow from './pages/MindFlow'
import UpdateUserAccount from './pages/Users/UpdateUsers';
import EditProfil from './pages/Users/EditProfil';
import SignIn from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ComponentsList from './pages/components/ComponentsList';
import ParamsList from './pages/params/ParamsList';
import Flow from './pages/nodes/Nodcus';
import FlowsList from './pages/workflow/FlowList';
import EditFlow from './pages/workflow/EditFlow';
import LayoutAnt from './pages/antDesign/Layout/Layout';
import WorkSpace from './pages/workspace/WorkSpace';
import CodePen from './pages/codePen/CodePen'
import ContactUs from './pages/ContactPage/ContactUs';
import EditWorkflow from './pages/workspace/EditWorkflow';
import SaveComment from './pages/forums/SaveComment';
import ListComments from './pages/forums/ListComments';
if(window.localStorage.jwt){
  const decode=jwt_decode(localStorage.jwt) //decode token
  store.dispatch(setUser(decode))
  console.log('decode ',decode)
  SetAuth(window.localStorage.jwt) //add token to req headers
  // const currentDate= Date.now/1000
  // if(decode.exp > currentDate){
  //   store.dispatch(Logout)
  //   navigate('/login')
  // }
}
function App() {
  const auth= useSelector(state=>state.auth)
  const role=(isConnected=auth.isConnected)=>{
    if(isConnected){
      // return auth.user.roleId.nom
      return auth.user.roleId.nom
    }
    else {
      return ''
    }
 }
  const user={
    isConnected:auth.isConnected,
    role:role(),
    name:auth.user.name
  }
  return (
    <Routes>
      <Route path='/' element={<About/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/codePen' element={CodePen}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/addsubcategory' element={<AddSubCategory/>}/>
      <Route path='/layoutant' element={
        <PrivateRouter user={user}>
           <LayoutAnt user={user} />
        </PrivateRouter>}>
        <Route path='' element={<DashbordPage/>}/>
        <Route path='workspace' element={<WorkSpace/>}/>
        <Route path='editflow/:id' element={<EditWorkflow/>}/>
        <Route path='roles' element={<RolesList/>}/>
        <Route path='updaterole/:id' element={<EditRole/>}/>
        <Route path='addRole' element={
          <PrivateRouter user={user}>
            <AddRole/>
          </PrivateRouter>}/>
          <Route path='custom' element={<Flow/>}/>
          <Route path='updatecategory/:id' element={<EditCategory/>}/>
          <Route path='edit/:id' element={<EditProfil/>}/>
          <Route path='update/:id' element={<UpdateUserAccount/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='categories' element={<ListCategories/>}/>
          <Route path='components' element={<ComponentsList/>}/>
          <Route path='userlist' element={<UsersList/>}/>
          <Route path='flow' element={<MindFlow/>}/>
          <Route path='savecomment' element={<SaveComment/>}/>
          <Route path='viewcomments' element={<ListComments/>}/>
          <Route path='getFlow/:id' element={<EditFlow/>}/>
          <Route path='paramslist' element={<ParamsList/>}/>
          <Route path='editor/:id' element={<CodePen/>}/>
          <Route path='subcategories' element={<ListSubCategories/>}/>
          <Route path='flows' element={<FlowsList/>}/>
          
      </Route>




      
       <Route path='/confirm/:activationCode' element={<ActivationPage/>}/>
       <Route path='/changepassword/:token' element={<ChangePwd/>}/>
       <Route path='/resetpassword/' element={<ResetPage/>}/>
       <Route path='/noaccess' element={<NoAccess/>}/> 
       <Route path='*' element={<NotFound/>}/> 
    </Routes>
    
  );
}

export default App;
