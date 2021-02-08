import React from 'react'
import { useDispatch } from 'react-redux'

import {
  clearSelectedCharactersAction,
  isolateSelectedCharactersAction,
  isolateSearchingCharactersAction
} from '../../../redux/actions/data'

const OperationButtons = ({ isolateCharacters, selectedCharacters, searchedCharacters }) => {
  const dispatch = useDispatch()
  const clearSelectedCharacters = () => dispatch(clearSelectedCharactersAction())
  const isolateSelectedCharacters = () => dispatch(isolateSelectedCharactersAction())
  const isolateSearchingCharacters = () => dispatch(isolateSearchingCharactersAction())

  const buttons = () => {
    if (selectedCharacters.length !== 0) {
      return (
        <ul className="flex justify-end pt-1 text-xs text-gray-700 animated fadeInDown delay-1 faster">
          {isolateCharacters[isolateCharacters.length - 1].length > 1 &&
            isolateCharacters[isolateCharacters.length - 1].length !==
              selectedCharacters.length && (
              <li className="flex mr-2">
                <button
                  type="button"
                  className="box-shadow-hover-2 hover:text-gray-200 focus:text-gray-200 focus:outline-none"
                  onClick={isolateSelectedCharacters}
                >
                  ISOLATE
                </button>
                <div className="inline-block justify-center h-4 pl-2 border-gray-700 border-r" />
              </li>
            )}
          <li className="flex">
            <button
              type="button"
              className="box-shadow-hover-2 hover:text-gray-200 focus:text-gray-200 focus:outline-none"
              onClick={clearSelectedCharacters}
            >
              CLEAR
            </button>
          </li>
        </ul>
      )
    }
    if (searchedCharacters.length > 0 && selectedCharacters.length === 0) {
      return (
        <ul className="flex justify-end pt-1 text-xs text-gray-700 animated fadeInDown delay-1 faster">
          <li className="flex">
            <button
              type="button"
              className="box-shadow-hover-2 hover:text-gray-200 focus:text-gray-200 focus:outline-none"
              onClick={isolateSearchingCharacters}
            >
              ISOLATE SEARCHING
            </button>
          </li>
        </ul>
      )
    }
    return null
  }

  return <div>{buttons()}</div>
}

export default OperationButtons
