/* eslint-disable no-console */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as d3 from 'd3'
import d3cloud from 'd3-cloud'
import accessor from '../../../utilities/accessors'
import wordExceptions from './words-exceptions'

import WordCloudBy from '../Dropdowns/WordCloudBy'
import WordsCount from './WordsCount'

import {
  selectOneCharacterAction,
  selectSomeManyCharactersAction,
  selectOneWordAction,
  selectSomeWordsAction
} from '../../../redux/actions/data'

const WordCloud = () => {
  const { characters, isolateCharacters, selectedWords } = useSelector((s) => s.data)
  const { unstructuredType } = useSelector((s) => s.categories)
  const [wordCloudParam, setWordCloudParam] = useState([])
  const [pageSize, setPageSize] = useState(window.innerWidth)
  const dispatch = useDispatch()

  const regex = useMemo(() => /[\s.,%()?!;:'<>/*#" 1-9]/g, [])

  const allWordsObj = wordCloudParam.reduce(
    (acc, rec) => ({
      ...acc,
      ...{
        [rec]: isolateCharacters[isolateCharacters.length - 1]
          .map((it) => accessor(characters[it], rec).split(' '))
          .flat()
          .map((it) => it.replace(regex, ''))
          .filter((it) => !wordExceptions.includes(it.toLowerCase()))
      }
    }),
    {}
  )
  const wordsSize = useMemo(() => {
    const allWordsArray = Object.values(allWordsObj).reduce((acc, rec) => acc.concat(rec), [])
    return Array.from(new Set(allWordsArray))
      .map((word) => ({
        text: word,
        size: allWordsArray.filter((it) => it === word).length
      }))
      .sort((a, b) => b.size - a.size)
  }, [allWordsObj])

  useEffect(() => {
    if (unstructuredType.length !== 0) {
      setWordCloudParam([unstructuredType[0].key])
    }
  }, [unstructuredType])

  window.addEventListener('resize', () => setPageSize(window.innerWidth))

  const selectWord = useCallback(
    (event) => {
      window.getSelection().removeAllRanges()
      const currentItemText = event.target.textContent
      const fieldSearchFilter = Object.keys(allWordsObj).reduce(
        (acc, rec) => (allWordsObj[rec].includes(currentItemText) ? acc.concat(rec) : acc),
        []
      )
      const searchedIds = Array.from(
        new Set(
          fieldSearchFilter.reduce(
            (acc, rec) =>
              acc.concat(
                isolateCharacters[isolateCharacters.length - 1].filter((it) => {
                  const currentRecArrayWords = accessor(characters[it], rec)
                    .split(' ')
                    .flat()
                    .map((word) => word.replace(regex, ''))
                  return currentRecArrayWords.includes(currentItemText)
                })
              ),
            []
          )
        )
      )
      if (event.shiftKey) {
        dispatch(selectSomeManyCharactersAction(searchedIds))
        dispatch(selectSomeWordsAction(currentItemText))
      } else {
        dispatch(selectOneCharacterAction(searchedIds))
        dispatch(selectOneWordAction(currentItemText))
      }
    },
    [allWordsObj, isolateCharacters, characters, regex, dispatch]
  )

  const setOpacityItem = useCallback(
    (d) => {
      if (selectedWords.length > 0) {
        if (selectedWords.includes(d.text)) {
          return 'opacity-100'
        }
        return 'opacity-25'
      }
      return 'opacity-100'
    },
    [selectedWords]
  )

  useEffect(() => {
    const svg = d3.select('#wordcloud')
    const margin = { top: 0, right: 20, bottom: 20, left: 20 }
    const svgWidth = svg.node().getBoundingClientRect().width
    const svgHeight = svg.node().getBoundingClientRect().height
    const innerWidth = svgWidth - margin.left - margin.right
    const innerHeight = svgHeight - margin.top - margin.bottom

    svg.select('#wordcloud-group').attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`)

    const wordScale = d3
      .scaleLinear()
      .domain([d3.min(wordsSize, (d) => d.size), d3.max(wordsSize, (d) => d.size)])
      .range([10, 60])

    const drawCloud = (words) => {
      const cloud = svg.select('#wordcloud-data').selectAll('text').data(words).join('text')

      cloud
        .text((d) => d.text)
        .style('fill', '#718096')
        .attr('text-anchor', 'middle')
        .style('font-size', (d) => d.size)
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .style('opacity', 1)
        .attr('transform', (d) => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
        .attr('class', (d) => `cursor-pointer ${setOpacityItem(d)}`)

      cloud.on('click', selectWord)
    }

    const layout = d3cloud()
      .size([innerWidth, innerHeight])
      .words(wordsSize)
      .padding(5)
      .rotate(() => Math.trunc(Math.random() * 2) * 90)
      .text((d) => d.text)
      .fontSize((d) => wordScale(d.size))
      .on('end', drawCloud)

    layout.start()
  }, [wordsSize, pageSize, setOpacityItem, selectWord])

  return (
    <div className="absolute flex flex-row h-full w-full">
      <div className="flex flex-col justify-between w-52">
        <div className="flex flex-col mb-3 overflow-auto pr-2">
          <div className="mb-2">
            <WordCloudBy wordCloudParam={wordCloudParam} setWordCloudParam={setWordCloudParam} />
          </div>
        </div>
        <div className="leading-none uppercase text-base md:text-xl tracking-wider text-gray-700">
          TALL AND ROUND
        </div>
      </div>
      <div className="flex flex-col flex-grow h-full">
        <svg id="wordcloud" className="h-full w-full">
          <g id="wordcloud-group">
            <g id="wordcloud-data" />
          </g>
        </svg>
        <div className="flex w-full justify-end">
          <WordsCount wordsSize={wordsSize} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(WordCloud)
