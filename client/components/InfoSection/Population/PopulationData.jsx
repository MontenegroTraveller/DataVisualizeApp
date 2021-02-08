/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useDispatch } from 'react-redux'
import { selectListAction } from '../../../redux/actions/data'

const PopulationData = ({ isolateCharacters, selectedCharacters }) => {
  const dispatch = useDispatch()
  const selectList = (e) => dispatch(selectListAction(e.target.id))
  return (
    <div className="flex flex-row pb-1 md:pb-0">
      <div className="flex flex-row">
        {isolateCharacters.map((list, index) =>
          index === isolateCharacters.length - 1 ? (
            <div
              key={index}
              className="leading-none whitespace-nowrap box-shadow-hover-2 hover:text-gray-200 focus:text-gray-200 text-2xl md:text-3xl"
            >
              <span>{list.length}</span>
            </div>
          ) : (
            <div key={index} className="text-xs whitespace-nowrap">
              <button id={index} type="button" className="focus:outline-none" onClick={selectList}>
                {list.length}
              </button>
              <span className="px-1 ">&gt;</span>
            </div>
          )
        )}
      </div>
      {selectedCharacters.length !== 0 && (
        <div className="whitespace-nowrap text-xs">
          <span className="px-1">&gt;</span> {selectedCharacters.length}
        </div>
      )}
    </div>
  )
}

export default PopulationData
