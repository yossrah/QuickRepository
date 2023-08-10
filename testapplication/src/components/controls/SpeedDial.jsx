import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import ShareIcon from '@mui/icons-material/Share';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
const actions = [
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <CodeIcon />, name: 'Code' },
  { icon: <ShareIcon />, name: 'Share code' },
  { icon: <InfoIcon />, name: 'More details' },
];

export default function SpeedDialButton({handleSave,handleNavigate,handleShare,handleDetails}) {
    const handleClick = (actionName) => {
        if (actionName === 'Save') {
            handleSave('right', true);
        } else if (actionName === 'Code') {
          handleNavigate();
        }
        else if(actionName==='Share code'){
           handleShare()
        }
        else if(actionName==='More details'){
          handleDetails('right', true)
        }
      };
  return (
    <Box className={'test_btn'} sx={{zIndex:999, height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        // sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<DensitySmallIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action.name)} 
          />
        ))}
      </SpeedDial>
    </Box>
  );
}