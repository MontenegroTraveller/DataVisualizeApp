/* eslint-disable no-console */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  selectManyCharactersAction,
  selectSomeManyCharactersAction
} from '../../../redux/actions/data'
import accessor from '../../../utilities/accessors'
import getColors from '../../../utilities/colors'

let colorsDictionary = {}
const ColorByLegend = ({ colorParam, isolateCharacters, characters, viewNumber }) => {
  const [tooltip, setTooltip] = useState(null)
  const dispatch = useDispatch()

  const selectionList = isolateCharacters[isolateCharacters.length - 1].reduce((acc, rec) => {
    const key = accessor(characters[rec], colorParam.key)
    return {
      ...acc,
      [key]: typeof acc[key] !== 'undefined' ? [...acc[key], rec] : [rec]
    }
  }, {})
  colorsDictionary = getColors(Object.keys(selectionList))

  const sortList = (obj) => {
    return Object.entries(obj)
      .sort((a, b) => b[1].length - a[1].length)
      .reduce(
        (acc, rec) => ({
          ...acc,
          [rec[0]]: rec[1]
        }),
        {}
      )
  }
  const changeViewNumbers = (attribute, objLength) => {
    return attribute === 'Count'
      ? objLength
      : `${((objLength / isolateCharacters[isolateCharacters.length - 1].length) * 100).toFixed(
          1
        )}%`
  }

  const tooltipMouseOver = (e) => {
    e.preventDefault()
    if (e.target.scrollWidth > e.target.clientWidth) {
      setTooltip({
        data: e.target.textContent,
        x: e.clientX,
        y: e.clientY - e.target.offsetParent.offsetParent.offsetTop
      })
    }
  }

  const tooltipMouseOut = (e) => {
    e.preventDefault()
    setTooltip(null)
  }

  const selectList = (e, list) => {
    window.getSelection().removeAllRanges()
    return dispatch(
      e.shiftKey ? selectSomeManyCharactersAction(list) : selectManyCharactersAction(list)
    )
  }

  return (
    <div className="text-xs py-1 px-2 text-gray-700 w-40 md:w-48">
      <div className="flex flex-col">
        <ul className="list-disc">
          {Object.keys(sortList(selectionList)).map(
            (it) =>
              selectionList[it].length > 0 && (
                <li
                  key={selectionList[it]}
                  className="flex flex-row justify-between focus:outline-none hover:text-gray-500 cursor-pointer"
                  role="presentation"
                  onKeyPress={(e) => selectList(e, selectionList[it])}
                  onClick={(e) => selectList(e, selectionList[it])}
                >
                  <div
                    className="flex items-center w-3/4 md:w-4/5"
                    style={{ color: colorsDictionary[it] }}
                  >
                    <span className=" text-xl pr-1 leading-none">&#8226;</span>
                    <span
                      className="capitalize truncate"
                      onMouseOver={(e) => tooltipMouseOver(e)}
                      onFocus={(e) => tooltipMouseOver(e)}
                      onMouseMove={(e) => tooltipMouseOver(e)}
                      onMouseOut={tooltipMouseOut}
                      onBlur={tooltipMouseOut}
                      onTouchMove={tooltipMouseOut}
                    >
                      {it === '-' || it === 'null' ? 'n/a' : it}
                    </span>
                  </div>
                  <div className="flex items-center w-1/4 md:w-1/5 justify-end">
                    {changeViewNumbers(viewNumber, selectionList[it].length)}
                  </div>
                </li>
              )
          )}
          {tooltip && (
            <div
              className="absolute bg-gray-300 text-blue-1000-tallround p-1 z-10 capitalize"
              style={{
                top: tooltip.y,
                left: tooltip.x
              }}
            >
              {tooltip.data}
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default React.memo(ColorByLegend)
export const colorsDict = () => colorsDictionary
