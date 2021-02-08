export const SET_SIZE_BY = 'tall&round/data/SET_SIZE_BY'
export const SET_RANK_BY = 'tall&round/data/SET_RANK_BY'
export const SET_COLOR_BY = 'tall&round/data/SET_COLOR_BY'
export const SET_VIEW_NUMBER = 'tall&round/data/SET_VIEW_NUMBER'

export const SET_SCATTER_BY_X = 'tall&round/data/SET_SCATTER_BY_X'
export const SET_SCATTER_BY_Y = 'tall&round/data/SET_SCATTER_BY_Y'

export const SET_CLUSTER_BY = 'tall&round/data/SET_CLUSTER_BY'

export const SET_CLUSTER_MODE = 'tall&round/data/SET_CLUSTER_MODE'


// Actions
export const setSizeBy = (sizeBy) => {
  return {
    type: SET_SIZE_BY,
    sizeBy
  }
}

export const setRankBy = (rankBy) => {
  return {
    type: SET_RANK_BY,
    rankBy
  }
}

export const setColorBy = (colorBy) => {
  return {
    type: SET_COLOR_BY,
    colorBy
  }
}

export const setViewNumber = (viewNumber) => {
  return {
    type: SET_VIEW_NUMBER,
    viewNumber
  }
}

export const setScatterByY = (scatterByY) => {
  return {
    type: SET_SCATTER_BY_Y,
    scatterByY
  }
}

export const setScatterByX = (scatterByX) => {
  return {
    type: SET_SCATTER_BY_X,
    scatterByX
  }
}

export const setClusterBy = (clusterBy) => {
  return {
    type: SET_CLUSTER_BY,
    clusterBy
  }
}

export const setClusterMode = (clusterMode) => {
  return {
    type: SET_CLUSTER_MODE,
    clusterMode
  }
}

