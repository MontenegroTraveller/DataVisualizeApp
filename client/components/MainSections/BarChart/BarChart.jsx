/* eslint-disable no-console */
import React, { useEffect, useState, useCallback, useMemo } from 'react'
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

const BarChart = () => {
  const {
    tooltipTarget,
    tooltipState,
    mouseOverTooltip,
    mouseMoveTooltip,
    mouseOutTooltip
  } = useTooltip()
  const { characters, isolateCharacters, selectedCharacters } = useSelector((s) => s.data)

  const { sizeBy: sizeByParam, colorBy: colorParam, rankBy: sortingParam } = useSelector(
    (s) => s.currentState
  )

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
      )
        .sort((a, b) => b.length - a.length)
        .reduce((acc, rec) => acc.concat(rec), [])

    const sortingParamData = () =>
      isolateCharacters[isolateCharacters.length - 1]
        .map((it) => characters[it])
        .sort((a, b) => {
          if (typeof accessor(b, sortingParam.key) === 'string') {
            return accessor(b, sortingParam.key).localeCompare(accessor(a, sortingParam.key))
          }

          return accessor(b, sortingParam.key) - accessor(a, sortingParam.key)
        })

    return sortingParam.key ? [...sortingParamData()] : [...sizeByData()]
  }, [characters, isolateCharacters, sortingParam, sizeByParam])

  const openCharacterInfo = useCallback(
    (event) => {
      dispatch(openCharacterInfoAction(+event.target.dataset.barchartId))
    },
    [dispatch]
  )

  const selectRow = useCallback(
    (event) => {
      return event.shiftKey
        ? dispatch(selectSomeCharactersAction(+event.target.dataset.barchartId))
        : dispatch(selectOneCharacterAction(+event.target.dataset.barchartId))
    },
    [dispatch]
  )

  const setColorItem = useCallback(
    (d) => {
      const colors = colorsDict()
      return colors[accessor(d, colorParam.key)] || '#a0aec0'
    },
    [colorParam]
  )

  const setOpacityItem = useCallback(
    (d) => {
      if (selectedCharacters.length > 0 && !selectedCharacters.includes(+d.id)) return '.25'
      return '1'
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
    const container = d3.select('#svg-section')
    const containerWidth = container.node().getBoundingClientRect().width
    const containerHeight = container.node().getBoundingClientRect().height
    const innerWidth = containerWidth - margin.left - margin.right
    const innerHeight = containerHeight - margin.top - margin.bottom

    const maxValue = d3.max(currentData.map((d) => accessor(d, sizeByParam.key))) ?? 100
    const minValue = d3.min(currentData.map((d) => accessor(d, sizeByParam.key))) ?? 0

    const xScale = d3
      .scaleLinear()
      .domain([minValue, maxValue + Math.abs(maxValue / 75)])
      .range([margin.left, innerWidth])

    const yScale = d3
      .scaleLinear()
      .domain([0, currentData.length])
      .range([margin.top, currentData.length * 14])

    const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight)

    const svg = d3.select('#barchart').attr('height', containerHeight).attr('width', containerWidth)
    d3.select('#barchart-data')
      .style('height', `${containerHeight - margin.bottom - 20}px`)
      .attr('width', containerWidth)

    const containerChart = d3.select('#barchart-group-data').style('height', `${innerHeight}px`)
    containerChart.style('height', `${currentData.length * 14 + margin.top + margin.bottom}px`)

    d3.select('#barchart-data').attr('transform', `translate(${margin.left}, ${margin.top})`)
    svg.select('#barchart-group').attr('transform', `translate(${margin.left}, ${margin.top})`)

    svg
      .select('#barchart-xaxis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis)
      .select('.domain')
      .remove()

    svg.select('.tick:first-child line').remove()

    svg.select('#barchart-xaxis')

    const rects = containerChart.selectAll('rect').data(currentData, (d) => d.id)

    rects
      .enter()
      .append('rect')
      .attr('class', 'cursor-pointer')
      .attr('id', (d) => `bar-${d.id}`)
      .attr('tabIndex', (d) => d.id)
      .attr('data-barchart-id', (d) => d.id)
      .style('height', '10px')
      .attr('x', `${xScale(0)}px`)
      .transition()
      .duration(1000)
      .ease(d3.easeExp)
      .attr('y', (d, index) => `${yScale(index)}px`)
      .attr('width', (d) => `${xScale(accessor(d, sizeByParam.key))}px`)
      .style('fill', (d) => setColorItem(d))

    rects
      .attr('x', `${xScale(0)}px`)
      .transition()
      .duration(1000)
      .ease(d3.easeExp)
      .attr('y', (d, index) => `${yScale(index)}px`)
      .attr('width', (d) => `${xScale(accessor(d, sizeByParam.key))}px`)
      .style('fill', (d) => setColorItem(d))

    rects.exit().remove()
    const clickHandler = (event) => {
      const { tagName } = event.target
      if (tagName === 'rect') {
        switch (event.type) {
          case 'click':
            selectRow(event)
            break
          case 'dblclick':
            openCharacterInfo(event)
            break
          default:
            event.preventDefault()
        }
      }
    }

    const onMouseMove = (event) => {
      const { tagName, dataset } = event.target
      const data = currentData
      const currentElement = data.find((el) => el.id === +dataset.barchartId)
      const newEvent = {
        clientX: event.clientX,
        clientY: event.clientY,
        target: document.getElementById('barchart-data')
      }
      if (tagName === 'rect') {
        switch (event.type) {
          case 'mouseover':
            mouseOverTooltip(newEvent, currentElement)
            break
          case 'mousemove':
            mouseMoveTooltip(newEvent, currentElement)
            break
          case 'mouseout':
            mouseOutTooltip(newEvent)
            break
          case 'touchmove':
            mouseOutTooltip(newEvent)
            break
          default:
            event.preventDefault()
        }
      }
    }

    containerChart
      .on('click', clickHandler)
      .on('dblclick', clickHandler)
      .on('mouseover', onMouseMove)
      .on('mousemove', onMouseMove)
      .on('mouseout', onMouseMove)
      .on('touchmove', onMouseMove)

    return () => {
      containerChart
        .on('click', null)
        .on('dblclick', null)
        .on('mouseover', null)
        .on('mousemove', null)
        .on('mouseout', null)
        .on('touchmove', null)
    }
  }, [
    currentData,
    pageSize,
    mouseMoveTooltip,
    mouseOutTooltip,
    mouseOverTooltip,
    openCharacterInfo,
    selectRow,
    setColorItem,
    sizeByParam.key
  ])

  useEffect(() => {
    d3.select('#barchart-group-data')
      .selectAll('rect')
      .style('opacity', (d) => setOpacityItem(d))
  }, [selectedCharacters, setOpacityItem])

  useEffect(() => {
    d3.select('#barchart-group-data')
      .selectAll('rect')
      .transition()
      .ease(d3.easeElastic)
      .duration(1000)
      .style('fill', (d) => setColorItem(d))
  }, [colorParam, setColorItem])

  return (
    <div id="svg-section" className="relative flex flex-grow h-full">
      <svg id="barchart" className="w-full">
        <g id="barchart-group">
          <g id="barchart-xaxis" />
        </g>
      </svg>
      <div id="barchart-data" className="absolute w-full overflow-y-auto ">
        <svg id="barchart-group-data" className="flex flex-col w-full" />
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

export default BarChart
