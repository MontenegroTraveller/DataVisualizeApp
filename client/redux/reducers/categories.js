import { CATEGORIZE } from '../actions/categories'

const initialState = {
  text: [],
  numbers: [],
  colorBy: [],
  sizeBy: [],
  rankBy: [],
  clusterBy: [],
  unstructuredType: [],
  scatterByX: [],
  scatterByY: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIZE: {
      return {
        ...state,
        colorBy: action.colorBy,
        sizeBy: action.sizeBy,
        rankBy: action.rankBy,
        clusterBy: action.clusterBy,
        unstructuredType: action.unstructuredType,
        scatterByX: action.scatterByX,
        scatterByY: action.scatterByY
      }
    }
    default:
      return state
  }
}
