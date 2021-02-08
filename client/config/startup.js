import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Startup = (props) => {
  useEffect(() => {})

  return <>{props.children}</>
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

Startup.defaultProps = {}

export default withRouter(Startup)
