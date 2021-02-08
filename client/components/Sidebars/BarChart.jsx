import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ViewNumbers from '../MainSections/BarChart/ViewNumbers'
import SizeBy from '../MainSections/Dropdowns/SizeBy'
import RankBy from '../MainSections/Dropdowns/RankBy'
import ColorBy from '../MainSections/Dropdowns/ColorBy'
import { setColorBy, setSizeBy, setRankBy, setViewNumber } from '../../redux/actions/current-state'

const BarCharSideBar = () => {
  const dispatch = useDispatch()
  const { sizeBy: sizeByParam, colorBy: colorParam, rankBy: rankByParam, viewNumber } = useSelector(
    (s) => s.currentState
  )
  const { characters, isolateCharacters } = useSelector((s) => s.data)

  const { sizeBy, colorBy, rankBy } = useSelector((s) => s.categories)

  return (
    <div className="flex flex-col h-full justify-between w-52">
      <div className="flex flex-col mb-3 overflow-auto pr-2">
        <div className="mb-2">
          <SizeBy
            setSizeByParam={(test) => {
              dispatch(
                setSizeBy(
                  sizeBy.find((it) => (it.title ?? it.key) === test) ?? { title: '', key: '' }
                )
              )
            }}
            sizeByParam={sizeByParam.title ?? sizeByParam.key}
          />
        </div>
        <div className="my-2">
          <RankBy
            setRankByParam={(test) => {
              dispatch(
                setRankBy(
                  rankBy.find((it) => (it.title ?? it.key) === test) ?? { title: '', key: '' }
                )
              )
            }}
            rankByParam={rankByParam?.title ?? rankByParam.key}
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

export default BarCharSideBar
