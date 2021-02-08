import React from 'react'

const ViewNumbers = ({ options = ['Percentage', 'Count'], label="VIEW AS", viewNumber, setViewNumber }) => {
  return (
    <div className="flex flex-col text-xs text-gray-700 px-2">
      <div>{label}</div>
      <div className="flex flex-row">
        {options.map((number) => (
          <label key={number} className="relative flex items-center h-5 mr-2" htmlFor={number}>
            <div className="bg-transparent border rounded-full border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center mr-1">
              <input
                type="radio"
                className="opacity-0 absolute cursor-pointer"
                name="view-numbers"
                value={number}
                checked={viewNumber === number}
                onChange={(e) => setViewNumber(e.target.value)}
              />
              <svg
                viewBox="0 0 120 120"
                version="1.1"
                className={`${
                  viewNumber === number ? 'block' : 'hidden'
                } fill-current w-2 h-2 text-gray-500 pointer-events-none`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="60" cy="60" r="50" />
              </svg>
            </div>
            <div className={`${viewNumber === number ? 'text-gray-500' : false} capitalize`}>
              {number}
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default React.memo(ViewNumbers)
