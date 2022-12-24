export default function Notification({ type }) {
  switch (type) {
  case 'blogSuccess':
    return <p className={'success'}>Blog created successfully</p>
  case 'deleteSuccess':
    return <p className={'success'}>Blog deleted successfully</p>
  case 'updateSuccess':
    return <p className={'success'}>Blog updated successfully</p>
  case 'loginSuccess':
    return <p className={'success'}>Login successfully</p>
  case 'blogError':
    return <p className={'error'}>Error creating blog</p>
  case 'loginError':
    return <p className={'error'}>Wrong credentials</p>
  case 'deleteError':
    return <p className={'error'}>Error deleting blog</p>
  case 'updateError':
    return <p className={'error'}>Error updating blog</p>
  default:
    return null
  }
}
