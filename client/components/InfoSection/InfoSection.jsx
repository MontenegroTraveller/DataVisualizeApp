import React from 'react'
import { useDispatch } from 'react-redux'

import { clearAllCurrentSelectedAction } from '../../redux/actions/data'

import TitlePage from './TitlePage'
import Population from './Population/Population'

const InfoSection = () => {
  const dispatch = useDispatch()
  const clearCurrentSelectedCharacters = (e) => {
    if (e.target.id === 'empty_section_for_click') {
      dispatch(clearAllCurrentSelectedAction())
    }
  }
  return (
    <div
      id="empty_section_for_click"
      className="flex justify-between mt-1 text-gray-500 focus:outline-none cursor-default pb-8"
      role="button"
      tabIndex={0}
      onClick={clearCurrentSelectedCharacters}
      onKeyPress={clearCurrentSelectedCharacters}
    >
      <div className="w-40 md:w-48">
        <TitlePage />
      </div>
      <div className="w-40 md:w-48">
        <Population />
      </div>
    </div>
  )
}

InfoSection.propTypes = {}

export default React.memo(InfoSection)
