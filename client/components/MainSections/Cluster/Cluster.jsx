/* eslint-disable no-console */
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as d3 from 'd3'
import accessor from '../../../utilities/accessors'

import Tooltip, { useTooltip } from '../Tooltip/Tooltip'

import { colorsDict } from '../Dropdowns/ColorByLegend'

import {
  openCharacterInfoAction,
  selectOneCharacterAction,
  selectSomeCharactersAction
} from '../../../redux/actions/data'

const margin = { top: 5, right: 10, bottom: 20, left: 10 }
const customNode = document.createElement('svg')
const dataContainer = d3.select(customNode)

function throttle(callback, limit) {
  let waiting = false // Initially, we're not waiting
  return function func(...args) {
    if (!waiting) {
      waiting = true
      setTimeout(() => {
        waiting = false
        callback.apply(this, args)
      }, limit)
    }
  }
}

function drawCanvasMain(context, { width, height }) {
  function drawCircle(d) {
    const r = Math.round(+this.getAttribute('r'))

    if (r === 0) return

    const x = Math.round(+this.getAttribute('x'))
    const y = Math.round(+this.getAttribute('y'))

    const fillStyle = this.getAttribute('fillStyle')
    const opacity = +this.getAttribute('opacity')

    context.globalAlpha = opacity
    context.lineWidth = 1

    context.fillStyle = fillStyle

    context.beginPath()
    context.arc(x, y, r, 0, 2 * Math.PI)
    context.fill()

    if (d.selected >= 0) {
      context.globalAlpha = 1
      context.lineWidth = 1

      context.beginPath()

      context.arc(x, y, d.selected * r, 0, 2 * Math.PI)

      context.fill()
    }

    // context.arc(x, y, newR, 0, 2 * Math.PI)

    // context.moveTo(x + newR, y)
    // context.fill()
    // context.stroke()
  }

  context.clearRect(0, 0, width, height)

  dataContainer.selectAll('c').each(drawCircle)

  window.requestAnimationFrame(() => {
    drawCanvasMain(context, { width, height })
  })
}

const drawCanvas = throttle(drawCanvasMain, 150)

const Cluster = () => {
  const {
    tooltipTarget,
    tooltipState,
    mouseOverTooltip,
    mouseMoveTooltip,
    mouseOutTooltip
  } = useTooltip()
  const canvas = useRef()
  const container = useRef()

  const { characters, isolateCharacters, selectedCharacters } = useSelector((s) => s.data)
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 })
  const {
    sizeBy: sizeByParam,
    colorBy: colorParam,
    rankBy: sortingParam,
    clusterBy: clusterByParam,
    clusterMode
  } = useSelector((s) => s.currentState)

  const [pageSize, setPageSize] = useState(window.innerWidth)

  const dispatch = useDispatch()

  const currentData = useMemo(() => {
    const sizeByData = () =>
      Object.values(
        isolateCharacters[isolateCharacters.length - 1].reduce(
          (acc, rec) => ({
            ...acc,
            ...{
              [accessor(characters[rec], sizeByParam.key)]:
                accessor(characters[rec], sizeByParam.key) in acc
                  ? acc[accessor(characters[rec], sizeByParam.key)].concat(characters[rec])
                  : [characters[rec]]
            }
          }),
          {}
        )
      ).reduce((acc, rec) => acc.concat(rec), [])

    return sizeByData()
  }, [isolateCharacters])

  const openCharacterInfo = useCallback(
    (event) => {
      dispatch(openCharacterInfoAction(+event.target.dataset.clusterId))
    },
    [dispatch]
  )

  const selectRow = useCallback(
    (event) => {
      return event.shiftKey
        ? dispatch(selectSomeCharactersAction(+event.target.dataset.clusterId))
        : dispatch(selectOneCharacterAction(+event.target.dataset.clusterId))
    },
    [dispatch]
  )

  const setColorItem = useCallback(
    (d) => {
      const colors = colorsDict()

      return colors[accessor(d, colorParam.key)] || 'rgba(107, 114, 128)'
    },
    [colorParam]
  )
  const setColorGroupItem = useCallback(
    (name) => {
      const colors = colorsDict()

      return colors[name] || 'rgba(107, 114, 128)'
    },
    [colorParam]
  )

  const setOpacityItem = useCallback(
    (d) => {
      if (selectedCharacters.length > 0 && !selectedCharacters.includes(+d.id)) return 0.15
      return 1
    },
    [selectedCharacters]
  )

  useEffect(() => {
    const resizeListener = () => setPageSize(window.innerWidth)
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  useEffect(() => {
    const canvasWidth = container.current.getBoundingClientRect()?.width ?? 500
    const canvasHeight = container.current.getBoundingClientRect()?.height ?? 500
    setDimensions({
      width: canvasWidth - margin.left - margin.right,
      height: canvasHeight - margin.top - margin.bottom
    })
  }, [pageSize])

  useEffect(() => {
    const groupings =
      clusterMode === 'Nodes'
        ? d3.group(currentData, (d) => accessor(d, clusterByParam.key))
        : d3.group(
            currentData,
            (d) => accessor(d, clusterByParam.key),
            (d) => accessor(d, colorParam.key)
          )
    const hierarchy = d3.hierarchy(groupings)
    const root = d3.pack().size([dimensions.width, dimensions.height]).padding(5)(
      (sizeByParam.key !== null
        ? hierarchy.sum((d) => {
            return accessor(d, sizeByParam.key)
          })
        : hierarchy.sum(() => 1)
      ).sort((a, b) => {
        const result =
          accessor(b.data, clusterByParam.key)?.localCompare?.(
            accessor(a.data, clusterByParam.key)
          ) ?? -1
        return result !== 0
          ? result
          : accessor(b.data, colorParam.key)?.localCompare?.(accessor(a.data, colorParam.key))
      })
    )

    const drawindData =
      clusterMode === 'Nodes'
        ? root.descendants().slice(1)
        : root
            .descendants()
            .slice(1)
            .filter((t) => t.depth < 3)
            .map((it) => {
              if (it.depth !== 2) return it

              if (selectedCharacters.length === 0)
                return {
                  ...it,
                  children: []
                }
              const selectedInThisGroup = selectedCharacters.filter((x) =>
                it.children.map((i) => i.data.id).includes(x)
              ).length

              return {
                ...it,
                selected: selectedInThisGroup / it.children.length,
                children: []
              }
            })

    const getColor = (d) => {
      if (clusterMode === 'Nodes') {
        return d.children ? 'rgba(107, 114, 128)' : setColorItem(d.data)
      }
      return setColorGroupItem(d.data[0])
    }

    const dt = dataContainer.selectAll('c').data(drawindData, (d, index) => {
      if (d.depth < 2) {
        return d.data[0]
      }

      return `${d?.parent?.data?.[0] ?? 'root'}-${index % d?.parent.children.length}`
    })

    dt.transition()
      .duration(1000)
      .attr('fillStyle', getColor)
      .attr('opacity', (d) => setOpacityItem(d.data))
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('r', (d) => d.r)

    dt.enter()
      .append('c')
      // .attr('x', () => dimensions.width / 2)
      // .attr('y', () => dimensions.height / 2)
      .transition()
      .duration(600)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('opacity', (d) => setOpacityItem(d.data))
      .attr('r', (d) => d.r)
      .attr('fillStyle', getColor)

    dt.exit().remove()

    const clickHandler = (event) => {
      const rect = canvas.current.getBoundingClientRect()
      const a = event.clientX - rect.left
      const b = event.clientY - rect.top

      const items = drawindData.filter(({ x, y, r }) => {
        const distance = (a - x) * (a - x) + (b - y) * (b - y)
        return distance < r * r
      })
      event.preventDefault()

      if (items.length >= 2) {
        switch (event.type) {
          case 'click':
            if (items[items.length - 1].data?.[1]?.length) {
              items[items.length - 1].data[1].forEach((it) => {
                selectRow({
                  shiftKey: event.shiftKey,
                  target: {
                    dataset: {
                      clusterId: it.id
                    }
                  }
                })
              })
            } else {
              selectRow({
                shiftKey: event.shiftKey,
                target: {
                  dataset: {
                    clusterId: items[items.length - 1].data.id
                  }
                }
              })
            }
            break
          case 'dblclick':
            if (!items[items.length - 1].data?.[1]?.length) {
              openCharacterInfo({
                target: {
                  dataset: {
                    clusterId: items[items.length - 1].data.id
                  }
                }
              })
            }
            break
          default:
            event.preventDefault()
        }
      }
    }

    const onMouseMove = (event) => {
      event.preventDefault()
      const rect = canvas.current.getBoundingClientRect()
      const a = event.clientX - rect.left
      const b = event.clientY - rect.top

      const items = drawindData.filter(({ x, y, r }) => {
        const distance = (a - x) * (a - x) + (b - y) * (b - y)
        return distance < r * r
      })
      const newEvent = {
        clientX: event.clientX,
        clientY: event.clientY,
        target: canvas.current
      }
      if (items.length && items[items?.length - 1]?.data?.id) {
        switch (event.type) {
          case 'mouseover':
            mouseOverTooltip(newEvent, items[items.length - 1].data)
            break
          case 'mousemove':
            mouseMoveTooltip(newEvent, items[items.length - 1].data)
            break
          default:
            event.preventDefault()
        }
      } else {
        mouseOutTooltip(newEvent)
        mouseOutTooltip(newEvent)
      }
    }

    d3.select(canvas.current)
      .on('click', clickHandler)
      .on('dblclick', clickHandler)
      .on('mouseover', onMouseMove)
      .on('mousemove', onMouseMove)
      .on('mouseout', onMouseMove)
      .on('touchmove', onMouseMove)

    return () => {
      // dataContainer.selectAll('c').remove()
      d3.select(canvas.current)
        .on('click', null)
        .on('dblclick', null)
        .on('mouseover', null)
        .on('mousemove', null)
        .on('mouseout', null)
        .on('touchmove', null)
    }
  }, [
    currentData,
    clusterByParam,
    dimensions,
    clusterMode,
    sizeByParam,
    colorParam,
    selectedCharacters
  ])

  useEffect(() => {
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['r', 'x', 'y']
    }

    const context = canvas.current.getContext('2d')
    const callback = () => {
      drawCanvas(context, dimensions)
    }
    const observer = new MutationObserver(callback)
    observer.observe(customNode, config)
    return () => {
      observer.disconnect()
    }
  }, [dimensions, canvas])

  return (
    <div ref={container} id="svg-section" className="relative flex flex-grow h-full">
      <div id="cluster-data" className="absolute w-full  h-full overflow-y-auto ">
        <canvas
          width={dimensions.width}
          height={dimensions.height}
          ref={canvas}
          id="bubbles"
          className="flex flex-col w-full cursor-pointer"
        />
      </div>
      {tooltipState && (
        <Tooltip
          tooltipState={tooltipState}
          sortingParam={sortingParam.title}
          target={tooltipTarget}
        />
      )}
    </div>
  )
}

export default Cluster
