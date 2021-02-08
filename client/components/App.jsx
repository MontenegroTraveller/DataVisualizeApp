/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'

import Head from './AppTools/head'
import Preloader from './AppTools/Preloader'
import Header from './Header/Header'
import Table from './MainSections/Table/Table'
import BarChart from './MainSections/BarChart/BarChart'
import Cluster from './MainSections/Cluster/Cluster'
import WordCloud from './MainSections/WordCloud/WordCloud'
import InfoSection from './InfoSection/InfoSection'
import CharacterInfo from './CharacterInfo/CharacterInfo'
import ScatterPlot from './MainSections/ScatterPlot/ScatterPlot'

import BarChartSideBar from './Sidebars/BarChart'
import СlusterChartSideBar from './Sidebars/Cluster'
import ScatterChartSideBar from './Sidebars/Scatter'

import {
  fetchData,
  isolateSelectedCharactersAction,
  isolateSearchingCharactersAction
} from '../redux/actions/data'

export default () => {
  const {
    characters,
    isolateCharacters,
    сharacterInfo,
    isRequesting,
    selectedCharacters,
    searchedCharacters
  } = useSelector((state) => state.data)

  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(characters).length === 0) {
      dispatch(fetchData())
    }
  }, [dispatch, characters])

  useEffect(() => {
    const func = (e) => {
      if (
        e.key === 'Enter' &&
        selectedCharacters.length > 0 &&
        isolateCharacters[isolateCharacters.length - 1].length > 1 &&
        isolateCharacters[isolateCharacters.length - 1].length !== selectedCharacters.length
      ) {
        return dispatch(isolateSelectedCharactersAction())
      }
      if (e.key === 'Enter' && searchedCharacters.length > 0) {
        return dispatch(isolateSearchingCharactersAction())
      }
      return null
    }

    window.addEventListener('keydown', func)

    return () => window.removeEventListener('keydown', func)
  }, [dispatch, selectedCharacters, isolateCharacters, searchedCharacters])

  useEffect(() => {
    const setHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setHeight()
    window.addEventListener('resize', setHeight)
  }, [])

  return (
    <div className="w-full h-full bg-bg-blue-1000-tallround text-gray-500 px-4 md:px-6 py-2">
      <Head />
      {isRequesting ? (
        <div className="flex items-center justify-center h-full">
          <Preloader />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div>
            <Header />
            <InfoSection />
          </div>
          <div className="relative flex-auto min-h-0">
            <div className="absolute flex flex-row h-full w-full">
              <Switch>
                <Route path="/bar_chart" render={() => <BarChartSideBar />} />
                <Route path="/cluster" render={() => <СlusterChartSideBar />} />
                <Route path="/scatter" render={() => <ScatterChartSideBar />} />
              </Switch>
              <div className="ml-4 flex flex-grow w-100">
                <Switch>
                  <Route exact path="/">
                    {isolateCharacters.length > 0 ? <Redirect to="/table" /> : null}
                  </Route>
                  <Route path="/table" render={() => <Table />} />
                  <Route path="/bar_chart" render={() => <BarChart />} />
                  <Route path="/cluster" render={() => <Cluster />} />
                  <Route path="/word_cloud" render={() => <WordCloud />} />
                  <Route path="/scatter" render={() => <ScatterPlot />} />
                </Switch>{' '}
              </div>
            </div>{' '}
          </div>

          {сharacterInfo.isShowing ? (
            <CharacterInfo currentShowingCharacterID={сharacterInfo.currentShowingCharacterID} />
          ) : null}
        </div>
      )}
    </div>
  )
}
