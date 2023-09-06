import React from 'react'
import {Space} from "antd"
import Header from '../Header/Header'
import Content from '../PageContent/Content'
import SideMenu from '../SideMenu/SideMenu.tsx'
function LayoutAnt({user}) {
  const isAdmin = user.role === 'admin';
  return (
    <div className="Layout">
      <Header user={user}/>
     <Space className='SideMenuandContent'>
      <SideMenu user={user}></SideMenu> 
      <Content isAdmin={isAdmin} />
     </Space> 
    </div>
  )
}

export default LayoutAnt
