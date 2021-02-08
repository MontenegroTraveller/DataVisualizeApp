/* eslint-disable no-console */
import React, { useState } from 'react'

const MARGIN_TOP = 30
const MARGIN_LEFT = 30

export const useTooltip = () => {
  const [tooltipState, setTooltipState] = useState(null)

  const [target, setTooltipTarget] = useState(null)

  const mouseOverTooltip = (ev, d) => {
    setTooltipTarget(ev.target)
    setTooltipState({
      d,
      x: ev.clientX,
      y: ev.clientY
    })
  }
  const mouseMoveTooltip = (ev, d) => {
    setTooltipTarget(ev.target)

    setTooltipState({
      d,
      x: ev.clientX,
      y: ev.clientY
    })
  }
  const mouseOutTooltip = () => {
    setTooltipState(null)
    setTooltipTarget(null)
  }

  return {
    tooltipTarget: target,
    tooltipState,
    mouseOverTooltip,
    mouseMoveTooltip,
    mouseOutTooltip
  }
}

const Tooltip = ({ tooltipState, sortingParam, target }) => {
  // const elemTooltip = document.getElementById('tooltip-barchart')
  const innerWidthParent = target.offsetParent.offsetWidth
  const innerHeightParent = target.offsetParent.offsetHeight
  const { d, x, y } = tooltipState

  // const tooltipWidth = () => {
  //   if (elemTooltip) {
  //     return elemTooltip.clientWidth
  //   }
  //   return 100
  // }
  // const tooltipHeight = () => {
  //   if (elemTooltip) {
  //     return elemTooltip.clientHeight
  //   }
  //   return 100
  // }

  return (
    <div
      id="tooltip-barchart"
      className="absolute flex flex-col bg-gray-300 text-blue-1000-tallround text-xs p-1 w-40 md:w-48"
      style={{
        top: MARGIN_TOP + y - (window.innerHeight - innerHeightParent),
        left: MARGIN_LEFT + x - (window.innerWidth - innerWidthParent)
      }}
    >
      <div className="flex flex-row justify-center border-b border-blue-1000-tallround text-base">
        {d.name}
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-row justify-between">
          <div>Number</div>
          <div>{d.id}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Gender</div>
          <div>{d.appearance.race}</div>
        </div>
        {sortingParam && (
          <div className="flex flex-row justify-between">
            <div className="capitalize">{sortingParam}</div>
            <div>{d.powerstats[sortingParam?.toLowerCase()]}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Tooltip, (prev, next) => next.tooltipState.d !== prev.tooltipState.d)
