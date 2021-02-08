/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react'

const ShowHiddingColumns = ({ allColumns }) => {
  const [isHiddigColumnsList, toggleIsHiddigColumnsList] = useState(false)

  const hideColumn = (column) => {
    column.toggleHidden()
    toggleIsHiddigColumnsList(!isHiddigColumnsList)
  }

  const columnsList = allColumns
    .reduce((acc, rec) => {
      const column = rec.getToggleHiddenProps()
      return column.checked ? acc : acc.concat(rec)
    }, [])
    .map((column) => (
      <ul key={column.id} className="whitespace-nowrap">
        <li>
          <button type="button" className="focus:outline-none" onClick={() => hideColumn(column)}>
            {column.Header}
          </button>
        </li>
      </ul>
    ))

  return (
    <div className="sticky top-0 right-0 ml-1 text-xs h-full bg-blue-1000-tallround">
      {columnsList.length > 0 && (
        <div className="flex flex-row">
          {isHiddigColumnsList && (
            <div className="py-1 px-2 border border-gray-700 bg-blue-1000-tallround">
              {/* Скрытые колонки */}
              <li className="flex flex-col">{columnsList}</li>
            </div>
          )}
          <div>
            <button
              type="button"
              className="py-1 px-2 border border-gray-700 bg-blue-1000-tallround focus:outline-none"
              onClick={() => toggleIsHiddigColumnsList(!isHiddigColumnsList)}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(ShowHiddingColumns)
