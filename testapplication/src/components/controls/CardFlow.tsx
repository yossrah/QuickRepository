import React from 'react';
import { ApartmentOutlined } from '@ant-design/icons';
import {  Card } from 'antd';

const { Meta } = Card;

const CardFlow= (props) => {
  const {title}=props
  const {image}=props
  const {HandleNavigate}=props
  return(
  <React.Fragment>
  <Card
    style={{ width: 200 ,height:180 }}
    cover={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        alt="example"
        src={image}
        style={{ maxWidth: '60%', maxHeight: '60%', width: '60%', height: '60%',padding: '10px' }}
      />
    </div>
    }
  >
  <Meta style={{height:30,}}
      avatar={<ApartmentOutlined 
        onClick={HandleNavigate}
        style={{
        color:'#64ffda',
         borderRadius:20,
         fontSize:20,
         padding:2
      }}/>}
      title={<h3 style={{ fontSize: '14px',margin: '0 0'}} >{title}</h3>}/>
  </Card>
 </React.Fragment>
  )
}
;

export default CardFlow;