import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

const NotFound = (props) => (
  <div className="flex flex-col h-screen justify-center text-center content-center py-32 bg-blue-1000-tallround text-gray-500">
    <div>
      <h1 className="text-7xl font-bold">404</h1>
      <p className="font-medium text-2xl my-1">Page Not Found</p>
      <p className="italic my-1">It looks like you found a glitch in the matrix...</p>
    </div>
    <div className="my-2">
      <button
        className="bg-transparent hover:text-gray-400 font-semibold py-2 px-4 border border-gray-700 hover:border-gray-400 rounded"
        type="button"
        tabIndex="0"
        onClick={props.goRoot}
      >
        {' '}
        Back to Dashboard
      </button>
    </div>
  </div>
)

NotFound.propTypes = {
  goRoot: PropTypes.func
}

NotFound.defaultProps = {
  goRoot: () => {}
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      goRoot: () => push('/')
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
