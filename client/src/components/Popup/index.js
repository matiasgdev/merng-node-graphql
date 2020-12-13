import React, { useState } from 'react'
import * as Popup from './elements'

function PopUp({children, message}) {
  
  const [show, setShow] = useState(false)

  return (
    <Popup.Container
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <Popup.Message>
          {message}
        </Popup.Message>
      )}
      {children}
    </Popup.Container>
  )
}

export default PopUp
