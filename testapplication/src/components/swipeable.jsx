import * as React from 'react';
import Drawer from '@mui/material/Drawer';
export default function Swipeable({children,key,open,anchor,onClose}) {

   return (
    <div>
        <React.Fragment key={key}>
          
          <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
          >
            {children}
          </Drawer>
        </React.Fragment>
      
    </div>
   );
}