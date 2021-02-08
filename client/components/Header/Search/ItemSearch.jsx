/* eslint-disable no-console */
import React from 'react'
import { useDispatch } from 'react-redux'

import { deleteSearchedCharacterAction } from '../../../redux/actions/data'

const ItemSearch = ({ characters, item, setIsSearch }) => {
  const dispatch = useDispatch()

  const deleteSearchedCharacter = (e) => {
    dispatch(deleteSearchedCharacterAction(e.currentTarget.dataset.searchId))
  }

  const focusOnItemTable = (e) => {
    const itemInTable = document.getElementById(e.currentTarget.dataset.searchId)
    const searchSection = document.getElementById('search-section')
    if (searchSection.offsetWidth === document.body.offsetWidth) {
      setIsSearch(false)
      itemInTable.focus()
    } else itemInTable.focus()
  }

  return (
    <div className="flex flex-row justify-between pr-1 text-gray-500">
      <div>
        <button
          data-search-id={item}
          type="button"
          className="text-left focus:outline-none"
          onClick={focusOnItemTable}
        >
          {`${characters[item].name} - ${characters[item].biography.fullName}`}
        </button>
      </div>
      <div>
        <button
          data-search-id={item}
          type="button"
          className="focus:outline-none hover:text-gray-200"
          onClick={deleteSearchedCharacter}
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  )
}

export default ItemSearch
