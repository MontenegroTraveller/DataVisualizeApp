import {
  SET_SIZE_BY,
  SET_CLUSTER_BY,
  SET_SCATTER_BY_Y,
  SET_SCATTER_BY_X,
  SET_RANK_BY,
  SET_COLOR_BY,
  SET_VIEW_NUMBER,
  SET_CLUSTER_MODE
} from '../actions/current-state'

const initialState = {
  text: {},
  numbers: {},
  colorBy: {},
  sizeBy: {},
  rankBy: {},
  clusterBy: {},
  unstructuredType: {},
  scatterByX: {},
  scatterByY: {},
  viewNumber: 'Count',
  clusterMode: 'Aggregate'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLUSTER_MODE: {
      return {
        ...state,
        clusterMode: action.clusterMode
      }
    }
    case SET_SIZE_BY: {
      return {
        ...state,
        sizeBy: action.sizeBy
      }
    }
    case SET_SCATTER_BY_X: {
      return {
        ...state,
        scatterByX: action.scatterByX
      }
    }
    case SET_SCATTER_BY_Y: {
      return {
        ...state,
        scatterByX: action.scatterByY
      }
    }

    case SET_VIEW_NUMBER: {
      return {
        ...state,
        viewNumber: action.viewNumber
      }
    }

    case SET_RANK_BY: {
      return {
        ...state,
        rankBy: action.rankBy
      }
    }
    case SET_COLOR_BY: {
      return {
        ...state,
        colorBy: action.colorBy
      }
    }
    case SET_CLUSTER_BY: {
      return {
        ...state,
        clusterBy: action.clusterBy
      }
    }

    default:
      return state
  }
}
