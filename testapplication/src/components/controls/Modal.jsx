import React from 'react'
import Popup from '../Popup'
function Modal({children,title,openPopup, setOpenPopup}) {
  return (
    <Popup
    title={title}
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}>
    <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {children}
        </div>
    </Popup>
  )
}

export default Modal
