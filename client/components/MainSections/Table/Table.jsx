/* eslint-disable no-console */
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTable, useSortBy, useBlockLayout } from 'react-table'

import ShowHiddingColumns from './ShowHiddingColumns'
import Column from './Column'
import Row from './Row'
import accessor from '../../../utilities/accessors'

const Table = () => {
  const {
    characters,
    isolateCharacters,
    selectedCharacters,
    mappings,
    searchedCharacters
  } = useSelector((state) => state.data)

  const data = useMemo(
    () => isolateCharacters[isolateCharacters.length - 1].map((id) => characters[id]),
    [isolateCharacters, characters]
  )
  const columns = useMemo(
    () =>
      Object.keys(mappings).map((it) => {
        return {
          Header: mappings[it]?.title || it,
          accessor: (row) => accessor(row, it)
        }
      }),
    [mappings]
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, allColumns } = useTable(
    {
      columns,
      data
    },
    useSortBy,
    useBlockLayout
  )

  const columnsMemo = useMemo(() => {
    return headerGroups.map((headerGroup) => (
      <div {...headerGroup.getHeaderGroupProps()} className="table-row flex w-full">
        {headerGroup.headers.map((column) => (
          <Column column={column} key={column.id} />
        ))}
      </div>
    ))
  }, [headerGroups])

  const rowsMemo = useMemo(() => {
    return rows.map((row) => {
      prepareRow(row)
      return (
        <Row
          {...row.getRowProps()}
          row={row}
          id={row.original.id}
          isSelected={selectedCharacters.includes(+row.original.id)}
          isSearched={searchedCharacters.includes(+row.original.id)}
        />
      )
    })
  }, [rows, selectedCharacters, searchedCharacters, prepareRow])
  return (
    <div className="absolute flex flex-col h-full w-full justify-between">
      <div className="flex flex-row w-full flex-grow mb-3 overflow-y-auto">
        {/* Table */}
        <div
          {...getTableProps()}
          className="table text-xs w-full cursor-default select-none whitespace-nowrap "
        >
          {/* Thead */}
          <div className="table-header-group text-gray-700">{columnsMemo}</div>
          {/* Tbody */}
          <div {...getTableBodyProps()} className="table-row-group flex w-full">
            {rowsMemo}
          </div>
        </div>
        <ShowHiddingColumns allColumns={allColumns} />
      </div>
      <div className="flex flex-row w-full justify-between items-end text-gray-700 pt-3 md:pt-0">
        <div className="w-40 md:w-48 leading-none uppercase text-base md:text-xl tracking-wider">
          TALL AND ROUND
        </div>
        <div>
          <button
            type="button"
            className="uppercase text-xs hover:text-gray-400 focus:outline-none"
          >
            <span className="mr-2">Export to CSV</span>
            <i className="fas fa-file-export mr-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Table)
