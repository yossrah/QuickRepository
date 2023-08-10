import React from 'react'
import { Outlet} from 'react-router-dom';
function Content() {
    
  return (
    <div className="PageContent" style={{height:'100%'}}>
      <Outlet></Outlet>
    </div>
  )
}

export default Content
