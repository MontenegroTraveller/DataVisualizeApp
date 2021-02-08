import {
  GET_DATA,
  REQUEST_DONE,
  OPEN_CHARACTER_INFO,
  CLOSE_CHARACTER_INFO,
  SELECT_ONE_CHARACTER,
  SELECT_SOME_CHARACTERS,
  SELECT_MANY_CHARACTERS,
  SELECT_SOME_MANY_CHARACTERS,
  CLEAR_SELECTED_CHARACTERS,
  CLEAR_ALL_CURRENT_SELECTED,
  ISOLATE_SELECTED_CHARACTERS,
  ISOLATE_SEARCHING_CHARACTERS,
  SELECT_LIST,
  SELECT_SEARCHED_CHARACTERS,
  DELETE_SEARCHED_CHARACTERS,
  CLEAR_ALL_SEARCHED_CHARACTERS,
  SELECT_ONE_WORD,
  SELECT_SOME_WORDS
} from '../actions/data'
import { CATEGORIZE } from '../actions/categories'

const initialState = {
  characters: [],
  isolateCharacters: [],
  selectedCharacters: [],
  selectedWords: [],
  searchedCharacters: [],
  сharacterInfo: {
    isShowing: false,
    currentShowingCharacterID: -1
  },
  isRequesting: true,
  mappings: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIZE:
      return { ...state, mappings: action.mappings }
    case GET_DATA:
      return {
        ...state,
        characters: action.json.reduce((acc, rec) => ({ ...acc, [rec.id]: rec }), {}),
        isolateCharacters: state.isolateCharacters.concat([
          Object.keys(action.json.reduce((acc, rec) => ({ ...acc, [rec.id]: rec }), {}))
        ])
      }
    case REQUEST_DONE:
      return {
        ...state,
        isRequesting: false
      }
    case OPEN_CHARACTER_INFO:
      return {
        ...state,
        сharacterInfo: {
          isShowing: true,
          currentShowingCharacterID: action.characterId
        }
      }
    case CLOSE_CHARACTER_INFO:
      return {
        ...state,
        сharacterInfo: {
          isShowing: false,
          currentShowingCharacterID: -1
        }
      }
    case SELECT_ONE_CHARACTER:
      return {
        ...state,
        selectedCharacters: [...action.characterId].map((character) => +character)
      }
    case SELECT_MANY_CHARACTERS:
      return {
        ...state,
        selectedCharacters: [...action.characterIds]
      }
    case SELECT_SOME_MANY_CHARACTERS:
      return {
        ...state,
        selectedCharacters: Array.from(
          new Set(state.selectedCharacters.concat([...action.characterIds]))
        )
      }

    case SELECT_SOME_CHARACTERS:
      return {
        ...state,
        selectedCharacters: state.selectedCharacters.includes(+action.characterId)
          ? state.selectedCharacters.filter((it) => it !== +action.characterId)
          : state.selectedCharacters.concat(+action.characterId)
      }
    case CLEAR_SELECTED_CHARACTERS:
      return {
        ...state,
        selectedCharacters: [],
        searchedCharacters: [],
        selectedWords: [],
        isolateCharacters: state.isolateCharacters.filter((it, index) => index === 0)
      }
    case CLEAR_ALL_CURRENT_SELECTED:
      return {
        ...state,
        selectedCharacters: [],
        selectedWords: []
      }
    case ISOLATE_SELECTED_CHARACTERS:
      return {
        ...state,
        isolateCharacters: state.isolateCharacters.concat([
          state.isolateCharacters[state.isolateCharacters.length - 1].filter((character) =>
            state.selectedCharacters.includes(+character)
          )
        ]),
        selectedCharacters: [],
        selectedWords: [],
        searchedCharacters: []
      }
    case ISOLATE_SEARCHING_CHARACTERS:
      return {
        ...state,
        isolateCharacters: state.isolateCharacters.concat([
          state.isolateCharacters[state.isolateCharacters.length - 1].filter((character) =>
            state.searchedCharacters.includes(+character)
          )
        ]),
        selectedCharacters: [],
        selectedWords: [],
        searchedCharacters: []
      }
    case SELECT_LIST:
      return {
        ...state,
        isolateCharacters: state.isolateCharacters.filter((it, index) => index <= action.ListID),
        selectedCharacters: []
      }
    case SELECT_SEARCHED_CHARACTERS:
      return {
        ...state,
        searchedCharacters: state.searchedCharacters.concat(+action.characterId)
      }
    case DELETE_SEARCHED_CHARACTERS:
      return {
        ...state,
        searchedCharacters: state.searchedCharacters.filter((item) => item !== +action.characterId)
      }
    case CLEAR_ALL_SEARCHED_CHARACTERS:
      return {
        ...state,
        searchedCharacters: []
      }
    case SELECT_ONE_WORD:
      return {
        ...state,
        selectedWords: [...action.word]
      }
    case SELECT_SOME_WORDS:
      return {
        ...state,
        selectedWords: state.selectedWords.concat(action.word)
      }
    default:
      return state
  }
}
