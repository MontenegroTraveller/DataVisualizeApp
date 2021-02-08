/* eslint-disable no-console */
import React, { useCallback } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'

import {
  openCharacterInfoAction,
  selectOneCharacterAction,
  selectSomeCharactersAction
} from '../../../redux/actions/data'

const Row = ({ row, isSelected, isSearched, id }) => {
  const dispatch = useDispatch()

  const openCharacterInfo = (e) => {
    e.preventDefault()
    dispatch(openCharacterInfoAction(id))
  }
  const selectRow = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.nativeEvent.stopPropagation()
      dispatch(e.shiftKey ? selectSomeCharactersAction(id) : selectOneCharacterAction(id))
    },
    [dispatch, id]
  )

  return (
    <div
      id={id}
      tabIndex={id}
      {...row.getRowProps()}
      role="button"
      onDoubleClick={openCharacterInfo}
      onClick={selectRow}
      onKeyPress={selectRow}
      className={classnames('transition duration-150 ease-in-out focus:outline-none flex', {
        'bg-gray-100 text-blue-1000-tallround': isSearched,
        'bg-gray-400 text-blue-1000-tallround': isSelected
      })}
    >
      {row.cells.map((cell) => {
        return (
          <div {...cell.getCellProps()} className="table-cell px-1">
            {cell.render('Cell')}
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(Row)
