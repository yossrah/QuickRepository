import React from 'react';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';
import Tooltip from '@mui/material/Tooltip';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import { IconButton } from '@mui/material';
function downloadImage(dataUrl) {
  const a = document.createElement('a');
        a.setAttribute('download', 'reactflow.png');
        a.setAttribute('href', dataUrl);
        a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);
    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#e3f2fd',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
    <Panel 
    // style={{zIndex:"999"}}  position="top-left"
    style={{ position: "absolute", top: "10px", left: "25px", zIndex: "999" }}
    >
    <Tooltip title="Export Workflow">
    <IconButton onClick={onClick} color='primary'>
      <DownloadingOutlinedIcon></DownloadingOutlinedIcon>
      </IconButton>
      </Tooltip>
    </Panel>
  );
}

export default DownloadButton;
