
export default function Notification({ type }) {
    if (type === null) {
      return null
    }
    return (
      <div className={type.class}>
        {type.message}
      </div>
    )
  }

