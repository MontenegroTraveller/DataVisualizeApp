import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ViewNumbers from '../MainSections/BarChart/ViewNumbers'
import ScatterByX from '../MainSections/Dropdowns/ScatterByX'
import ScatterByY from '../MainSections/Dropdowns/ScatterByY'
import ColorBy from '../MainSections/Dropdowns/ColorBy'
import SizeBy from '../MainSections/Dropdowns/SizeBy'

import {
  setColorBy,
  setSizeBy,
  setScatterByY,
  setScatterByX,
  setViewNumber
} from '../../redux/actions/current-state'

const ScatterSideBar = () => {
  const dispatch = useDispatch()
  const {
    sizeBy: sizeByParam,
    colorBy: colorParam,
    scatterByY: byYParam,
    scatterByX: byXParam,

    viewNumber
  } = useSelector((s) => s.currentState)
  const { characters, isolateCharacters } = useSelector((s) => s.data)

  const { sizeBy, colorBy, scatterByY, scatterByX } = useSelector((s) => s.categories)

  return (
    <div className="flex flex-col h-full justify-between w-52">
      <div className="flex flex-col mb-3 overflow-auto pr-2">
        <div className="mb-2">
          <SizeBy
            setSizeByParam={(test) => {
              dispatch(
                setSizeBy(
                  sizeBy.find((it) => (it.title || it.key) === test) || { title: '', key: '' }
                )
              )
            }}
            sizeByParam={sizeByParam.title ?? sizeByParam.key}
          />
        </div>
        <div className="mb-2">
          <ScatterByX
            setByXParam={(test) => {
              dispatch(
                setScatterByX(scatterByX.find((it) => it.title === test) || { title: '', key: '' })
              )
            }}
            byXParam={byXParam.title ?? byXParam.key}
          />
        </div>
        <div className="mb-2">
          <ScatterByY
            setByYParam={(test) => {
              dispatch(
                setScatterByY(scatterByY.find((it) => it.title === test) || { title: '', key: '' })
              )
            }}
            byYParam={byYParam.title ?? byYParam.key}
          />
        </div>

        <div className="my-2">
          <ColorBy
            setColorParam={(test) => {
              dispatch(
                setColorBy(
                  colorBy.find((it) => (it.title || it.key) === test) || { title: '', key: '' }
                )
              )
            }}
            colorParam={colorParam}
            characters={characters}
            isolateCharacters={isolateCharacters}
            viewNumber={viewNumber}
          />
        </div>
        {colorParam.title !== '' && (
          <ViewNumbers
            setViewNumber={() => {
              dispatch(setViewNumber(viewNumber === 'Count' ? 'Percentage' : 'Count'))
            }}
            viewNumber={viewNumber}
          />
        )}
      </div>
      <div className="leading-none uppercase text-base md:text-xl tracking-wider text-gray-700">
        TALL AND ROUND
      </div>
    </div>
  )
}

export default ScatterSideBar
