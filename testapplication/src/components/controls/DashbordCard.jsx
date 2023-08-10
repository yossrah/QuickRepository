import React from 'react'
import {Card,Space,Statistic} from 'antd'
import SkeletonAnimation from './SkeletonAnimation'
function DashbordCard({title,value,icon,isloading}) {
  return (
    <>
   {isloading? <Space direction="horizontal"><SkeletonAnimation/></Space>:
   <Card >
    <Space direction="horizontal">
    {icon}
    <Statistic title={title}
    value={value}
    ></Statistic>
    </Space> 
   </Card>
  }
  </>
  )
}

export default DashbordCard
