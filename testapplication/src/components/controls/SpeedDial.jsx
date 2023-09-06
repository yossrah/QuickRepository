import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation } from 'react-router-dom';
const actions = [
  // { icon: <SaveIcon />, name: 'Save'},
  { icon: <CodeIcon />, name: 'Code' },
  { icon: <InfoIcon />, name: 'More details' },
  // { icon: <DataSaverOnIcon />, name: 'Resave' },
];

export default function SpeedDialButton({handleSave,handleNavigate,handleShare,handleDetails,handleUpdate}) {
  const location = useLocation();
  const workSpace = location.pathname === '/layout/workspace';
  
    const handleClick = (actionName) => {
        if (actionName === 'Save') {
            handleSave('right', true);
        } else if (actionName === 'Code') {
          handleNavigate();
        }
        else if(actionName==='More details'){
          handleDetails('right', true)
        }
        else if(actionName==='Resave'){
          handleUpdate()
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
        {workSpace?<SpeedDialAction
          key='Save'
          icon=<SaveIcon />
          tooltipTitle='Save'
          onClick={() => handleClick('Save')} 
        />:<SpeedDialAction
        key='Resave'
        icon=<DataSaverOnIcon />
        tooltipTitle='Resave'
        onClick={() => handleClick('Resave')} 
      />}
        
      </SpeedDial>
    </Box>
  );
}