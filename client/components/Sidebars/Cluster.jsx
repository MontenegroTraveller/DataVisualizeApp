import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ViewNumbers from '../MainSections/BarChart/ViewNumbers'
import SizeBy from '../MainSections/Dropdowns/SizeBy'
import ClusterBy from '../MainSections/Dropdowns/ClusterBy'
import ColorBy from '../MainSections/Dropdowns/ColorBy'
import {
  setColorBy,
  setSizeBy,
  setClusterBy,
  setViewNumber,
  setClusterMode
} from '../../redux/actions/current-state'

const ClusterSideBar = () => {
  const dispatch = useDispatch()
  const {
    sizeBy: sizeByParam,
    colorBy: colorParam,
    clusterBy: clusterByParam,
    viewNumber,
    clusterMode
  } = useSelector((s) => s.currentState)
  const switchClusterView = useCallback(() => {
    dispatch(setClusterMode(clusterMode === 'Nodes' ? 'Aggregate' : 'Nodes'))
  }, [clusterMode])

  useEffect(() => {
    const pressSpace = (ev) => {
      if (ev.code === 'Space') {
        switchClusterView()
      }
    }
    document.addEventListener('keydown', pressSpace)
    return () => {
      document.removeEventListener('keydown', pressSpace)
    }
  }, [switchClusterView])

  const { characters, isolateCharacters } = useSelector((s) => s.data)

  const { sizeBy, colorBy, clusterBy } = useSelector((s) => s.categories)

  return (
    <div className="flex flex-col h-full justify-between w-52">
      <div className="flex flex-col mb-3 overflow-auto pr-2">
        <div className="mb-2">
          <ViewNumbers
            setViewNumber={switchClusterView}
            viewNumber={clusterMode}
            options={['Aggregate', 'Nodes']}
          />{' '}
        </div>

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
          <ClusterBy
            setClusterByParam={(test) => {
              dispatch(
                setClusterBy(
                  clusterBy.find((it) => (it.title ?? it.key) === test) ?? { title: '', key: '' }
                )
              )
            }}
            rankByParam={clusterByParam?.title ?? clusterByParam.key}
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

export default ClusterSideBar
