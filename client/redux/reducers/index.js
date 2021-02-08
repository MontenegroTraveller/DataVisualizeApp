import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import data from './data'
import categories from './categories'
import currentState from './current-state'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    data,
    categories,
    currentState
  })

export default createRootReducer
