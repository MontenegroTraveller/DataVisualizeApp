/* eslint-disable no-console */
import React from 'react'
import { useSelector } from 'react-redux'

import PopulationData from './PopulationData'
import OperationButtons from './OperationButtons'

const Population = () => {
  const { isolateCharacters, selectedCharacters, searchedCharacters } = useSelector(
    (state) => state.data
  )
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end items-start text-left cursor-default select-none border-b border-gray-700">
        {isolateCharacters.length === 1 && (
          <div className="text-xs text-gray-700 mr-2">POPULATION</div>
        )}
        <PopulationData
          isolateCharacters={isolateCharacters}
          selectedCharacters={selectedCharacters}
        />
      </div>
      <OperationButtons
        isolateCharacters={isolateCharacters}
        selectedCharacters={selectedCharacters}
        searchedCharacters={searchedCharacters}
      />
    </div>
  )
}

Population.propTypes = {}

export default Population
