import React from 'react'

const Notification = ({notificationMessage}) => {
  if (notificationMessage === null) return null
  else {
    return (
      <div className='notificationPopup'>{notificationMessage}</div>
    )
  }
}

export default Notification