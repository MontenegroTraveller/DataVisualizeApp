import { categorize } from './categories'
import {
  SET_SIZE_BY,
  SET_RANK_BY,
  SET_COLOR_BY,
  SET_SCATTER_BY_X,
  SET_SCATTER_BY_Y
} from './current-state'

export const GET_DATA = 'tall&round/data/GET_DATA'
export const ERROR_HAPPENED = 'tall&round/data//ERROR_HAPPENED'
export const REQUEST_DONE = 'tall&round/data/REQUEST_DONE'
export const OPEN_CHARACTER_INFO = 'tall&round/settigs/OPEN_CHARACTER_INFO'
export const CLOSE_CHARACTER_INFO = 'tall&round/settigs/CLOSE_CHARACTER_INFO'
export const SELECT_ONE_CHARACTER = 'SELECT_ONE_CHARACTER'
export const SELECT_MANY_CHARACTERS = 'SELECT_MANY_CHARACTERS'
export const SELECT_SOME_MANY_CHARACTERS = 'SELECT_SOME_MANY_CHARACTERS'
export const SELECT_SOME_CHARACTERS = 'SELECT_SOME_CHARACTERS'
export const CLEAR_ALL_CURRENT_SELECTED = 'CLEAR_ALL_CURRENT_SELECTED'
export const CLEAR_SELECTED_CHARACTERS = 'CLEAR_SELECTED_CHARACTERS'
export const ISOLATE_SELECTED_CHARACTERS = 'ISOLATE_SELECTED_CHARACTERS'
export const ISOLATE_SEARCHING_CHARACTERS = 'ISOLATE_SEARCHING_CHARACTERS'
export const SELECT_LIST = 'SELECT_LIST'
export const SELECT_SEARCHED_CHARACTERS = 'SELECT_SEARCHED_CHARACTERS'
export const DELETE_SEARCHED_CHARACTERS = 'DELETE_SEARCHED_CHARACTERS'
export const CLEAR_ALL_SEARCHED_CHARACTERS = 'CLEAR_ALL_SEARCHED_CHARACTERS'
export const SELECT_ONE_WORD = 'SELECT_ONE_WORD'
export const SELECT_SOME_WORDS = 'SELECT_SOME_WORDS'
export const CLEAR_CURRENT_SELECTED_WORDS = 'CLEAR_CURRENT_SELECTED_WORDS'

// Actions
export const openCharacterInfoAction = (characterId) => {
  return {
    type: OPEN_CHARACTER_INFO,
    characterId
  }
}

export const closeCharacterInfoAction = () => {
  return {
    type: CLOSE_CHARACTER_INFO
  }
}

export const selectOneCharacterAction = (characterId) => {
  return {
    type: SELECT_ONE_CHARACTER,
    characterId
  }
}

export const selectSomeCharactersAction = (characterId) => {
  return {
    type: SELECT_SOME_CHARACTERS,
    characterId
  }
}

export const clearSelectedCharactersAction = () => {
  return {
    type: CLEAR_SELECTED_CHARACTERS
  }
}

export const clearAllCurrentSelectedAction = () => {
  return {
    type: CLEAR_ALL_CURRENT_SELECTED
  }
}

export const isolateSelectedCharactersAction = () => {
  return {
    type: ISOLATE_SELECTED_CHARACTERS
  }
}

export const isolateSearchingCharactersAction = () => {
  return {
    type: ISOLATE_SEARCHING_CHARACTERS
  }
}

export const selectListAction = (ListID) => {
  return {
    type: SELECT_LIST,
    ListID
  }
}

export const selectSearchedCharacterAction = (characterId) => {
  return {
    type: SELECT_SEARCHED_CHARACTERS,
    characterId
  }
}
export const selectManyCharactersAction = (characters) => {
  return {
    type: SELECT_MANY_CHARACTERS,
    characterIds: characters.map((it) => +it)
  }
}
export const selectSomeManyCharactersAction = (characters) => {
  return {
    type: SELECT_SOME_MANY_CHARACTERS,
    characterIds: characters.map((it) => +it)
  }
}

export const deleteSearchedCharacterAction = (characterId) => {
  return {
    type: DELETE_SEARCHED_CHARACTERS,
    characterId
  }
}

export const clearAllSearchedCharacterAction = () => {
  return {
    type: CLEAR_ALL_SEARCHED_CHARACTERS
  }
}
export const selectOneWordAction = (word) => {
  return {
    type: SELECT_ONE_WORD,
    word
  }
}
export const selectSomeWordsAction = (word) => {
  return {
    type: SELECT_SOME_WORDS,
    word
  }
}
export const clearCurrentSelectedWordsAction = () => {
  return {
    type: CLEAR_CURRENT_SELECTED_WORDS
  }
}

// Functions
export const fetchData = () => {
  return async (dispatch, getState) => {
    const { mappings } = getState().data
    await fetch(`/api/v1/dataset/all`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: GET_DATA,
          json
        })

        const categories = categorize(json, mappings)
        dispatch({ type: REQUEST_DONE })

        dispatch({
          type: SET_SIZE_BY,
          sizeBy: {
            title: categories.sizeBy[0]?.title ?? categories.sizeBy[0]?.key ?? '',
            key: categories.sizeBy[0]?.key ?? ''
          }
        })
        dispatch({
          type: SET_RANK_BY,
          rankBy: {
            title: categories.rankBy[0]?.title ?? categories.rankBy[0]?.key ?? '',
            key: categories.rankBy[0]?.key ?? ''
          }
        })
        dispatch({
          type: SET_COLOR_BY,
          colorBy: {
            title: categories.colorBy[0]?.title ?? categories.colorBy[0]?.key ?? '',
            key: categories.colorBy[0]?.key ?? ''
          }
        })

        dispatch({
          type: SET_SCATTER_BY_X,
          scatterByX: {
            title: categories.scatterByX[0]?.title ?? categories.scatterByX[0]?.key ?? '',
            key: categories.scatterByX[0]?.key ?? ''
          }
        })

        dispatch({
          type: SET_SCATTER_BY_Y,
          scatterByY: {
            title: categories.scatterByY[0]?.title ?? categories.scatterByY[0]?.key ?? '',
            key: categories.scatterByY[0]?.key ?? ''
          }
        })

        dispatch(categories)
      })
      .catch((err) => {
        dispatch({
          type: ERROR_HAPPENED,
          err
        })
        dispatch({ type: REQUEST_DONE })
      })
  }
}
