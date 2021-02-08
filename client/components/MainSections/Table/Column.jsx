/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'

const Column = ({ column }) => {
  const [isHideColumnBtn, changeIsHideColumnBtn] = useState(false)
  return (
    <div
      className="table-cell  sticky top-0 border border-gray-700 bg-blue-1000-tallround text-left p-1 focus:outline-none z"
      role="button"
      tabIndex="0"
      onMouseEnter={() => changeIsHideColumnBtn(true)}
      onMouseLeave={() => changeIsHideColumnBtn(false)}
    >
      <div className="flex flex-row justify-between">
        <div
          role="button"
          tabIndex={0}
          {...column.getHeaderProps()}
          onClick={() => column.toggleSortBy()}
          onKeyDown={() => column.toggleSortBy()}
          className="flex flex-row focus:outline-none cursor-pointer"
        >
          {column.Header}
          <div className="ml-1">
            {column.isSorted ? (
              column.isSortedDesc ? (
                <i className="fas fa-sort-down text-gray-200" />
              ) : (
                <i className="fas fa-sort-up text-gray-200" />
              )
            ) : (
              <i className="fas fa-sort" />
            )}
          </div>
        </div>
        <div className="w-2 ml-5">
          {isHideColumnBtn && (
            <div className="animated fadeIn faster">
              <button
                data-closecolumn-id={column.id}
                type="button"
                className="focus:outline-none hover:text-gray-200"
                onClick={() => column.toggleHidden()}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Column)
