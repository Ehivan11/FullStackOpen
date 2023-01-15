import { useSelector } from 'react-redux'

import { NewNotify } from './styles'

const Notification = () => {
  const notification = useSelector(
    ({ notificationReducer }) => notificationReducer
  )

  if (!notification) {
    return null
  }

  return (
    <NewNotify
      id="notification"
      background={notification.type === 'alert' ? 'error' : 'success'}
    >
      {notification.message}
    </NewNotify>
  )
}

export default Notification
