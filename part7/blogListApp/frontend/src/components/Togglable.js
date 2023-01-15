import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from './styles'

const Togglable = forwardRef(
  ({ firstButtonLabel, secondButtonLabel, top, left, children }, refs) => {
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
          <Button top={top} left={left} onClick={toggleVisibility}>
            {firstButtonLabel}
          </Button>
        </div>
        <div className="divTest" style={showWhenVisible}>
          {children}
          <Button top={top} left={left} onClick={toggleVisibility}>
            {secondButtonLabel}
          </Button>
        </div>
      </div>
    )
  }
)

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  firstButtonLabel: PropTypes.string.isRequired,
  secondButtonLabel: PropTypes.string.isRequired
}

export default Togglable
