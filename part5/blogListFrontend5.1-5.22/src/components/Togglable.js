import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(
  ({ firstButtonLabel, secondButtonLabel, className, children }, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility
      }
    })

    return (
      <div>
        <div style={hideWhenVisible}>
          <button className={className} onClick={toggleVisibility}>
            {firstButtonLabel}
          </button>
        </div>
        <div className="divTest" style={showWhenVisible}>
          {children}
          <button className={className} onClick={toggleVisibility}>
            {secondButtonLabel}
          </button>
        </div>
      </div>
    )
  }
)

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  firstButtonLabel: PropTypes.string.isRequired,
  secondButtonLabel: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default Togglable
