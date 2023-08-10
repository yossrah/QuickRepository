import { IconButton } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import DeleteIcon from '@mui/icons-material/Delete';
import SpeedButton from '../../components/controls/SpeedButton';
const labelStyle = {
  display: 'flex',
  alignItems: 'center',
};

const dragHandleStyle = {
  display: 'inline-block',
  width: 10,
  height: 10,
  backgroundColor: 'teal',
  marginLeft: 5,
  borderRadius: '50%',
};

const onConnect = (params) => console.log('handle onConnect', params);

function DragHandleNode() {
  return (
    <>
      <IconButton><DeleteIcon></DeleteIcon></IconButton>
    </>
  );
}

export default memo(DragHandleNode);
