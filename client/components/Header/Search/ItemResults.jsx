/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import React from 'react'
import { useDispatch } from 'react-redux'

import { selectSearchedCharacterAction } from '../../../redux/actions/data'

const ItemResults = ({ characters, item, inputRef, changeSearchResults }) => {
  const dispatch = useDispatch()

  const selectSearchedCharacter = (e) => {
    const itemInTable = document.getElementById(e.target.dataset.resultsId)
    dispatch(selectSearchedCharacterAction(e.target.dataset.resultsId))
    changeSearchResults(characters)
    inputRef.value = ''
    itemInTable.focus()
    inputRef.focus()
  }

  return (
    <li>
      <button
        data-results-id={item}
        type="button"
        className="text-left text-gray-700 hover:text-gray-200 focus:outline-none"
        onClick={selectSearchedCharacter}
      >
        {characters[item].name} - {characters[item].biography.fullName}
      </button>
    </li>
  )
}

export default ItemResults
