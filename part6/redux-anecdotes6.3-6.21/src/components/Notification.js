import { connect  } from 'react-redux'

const Notification = ({notification}) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? 'block' : 'none'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notificationReducer
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification