import React from 'react'

const WordsCount = ({ wordsSize }) => {
  return (
    <div className="flex flex-col">
      <div className="leading-none text-right box-shadow-hover-2 hover:text-gray-200 text-3xl md:text-4xl">
        {Object.keys(wordsSize).length.toLocaleString()}
      </div>
      <div className="uppercase text-xs tracking-wider text-gray-700 border-t border-b border-gray-700">
        Word count
      </div>
    </div>
  )
}

export default WordsCount
