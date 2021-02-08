/* eslint-disable no-console */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearAllSearchedCharacterAction } from '../../../redux/actions/data'

import ItemSearch from './ItemSearch'
import ItemResults from './ItemResults'

const Search = ({ isSearch, setIsSearch }) => {
  const { characters, isolateCharacters, searchedCharacters } = useSelector((state) => state.data)
  const dispatch = useDispatch()

  const [searchResults, changeSearchResults] = useState(
    isolateCharacters[isolateCharacters.length - 1].reduce(
      (acc, rec) => ({ ...acc, ...{ [rec]: characters[rec] } }),
      {}
    )
  )

  const [isSearchResults, setIsSearchResults] = useState(false)

  const inputRef = document.getElementById('search-input')

  const filterSearchResults = (e) => {
    changeSearchResults(
      Object.keys(searchResults).reduce(
        (acc, rec) =>
          `${searchResults[rec].name} - ${searchResults[rec].biography.fullName}`
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
            ? { ...acc, ...{ [rec]: searchResults[rec] } }
            : acc,
        {}
      )
    )
  }

  const closeSearchResults = () => {
    document.addEventListener(
      'click',
      (e) => {
        if (e.target.dataset.resultsId) {
          setIsSearchResults(true)
        } else setIsSearchResults(false)
      },
      { once: true }
    )
  }

  return (
    <div
      id="search-section"
      className={`${
        isSearch ? 'fadeInRight' : 'fadeOutRight'
      } animated delay-1 fixed top-0 right-0 z-50 inner-height pt-4 pb-10 text-xs bg-blue-1000-tallround w-full md:w-5/12 lg:w-3/12 px-2`}
    >
      <div className="flex justify-end items-center mb-4">
        <button
          type="button"
          className="focus:outline-none text-gray-500 hover:text-gray-200"
          onClick={() => setIsSearch(false)}
        >
          <i className="fas fa-times text-lg" />
        </button>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col">
          <div className="flex flex-row border-b border-gray-700">
            <div>
              <input
                id="search-input"
                size="45"
                maxLength="75"
                autoComplete="off"
                className="w-full text-lg focus:text-center appearance-none bg-transparent focus:bg-transparent border-transparent outline-none tracking-wider text-gray-500 placeholder-gray-700 focus:placeholder-transparent"
                placeholder={isSearchResults ? '' : 'SEARCH'}
                onFocus={() => setIsSearchResults(true)}
                onBlur={closeSearchResults}
                onChange={filterSearchResults}
              />
            </div>
          </div>

          {isSearchResults && (
            <div
              id="search-input-results"
              className="h-64 mt-2 bg-blue-1000-tallround text-gray-200 text-xs overflow-y-auto "
            >
              <ul>
                {Object.keys(searchResults).length > 0 ? (
                  Object.keys(searchResults)
                    .filter((item) => !searchedCharacters.includes(+item))
                    .map((item) => (
                      <ItemResults
                        key={item}
                        characters={searchResults}
                        item={item}
                        inputRef={inputRef}
                        changeSearchResults={changeSearchResults}
                      />
                    ))
                ) : (
                  <li className="text-gray-700">No matches</li>
                )}
              </ul>
            </div>
          )}
        </div>
        {searchedCharacters.length > 0 && (
          <div className="flex flex-col mt-5 md:mt-3 flex-grow">
            <div className="flex flex-row justify-between sticky top-0">
              <div className="text-lg text-gray-500">SELECTED HEROES</div>
              {searchedCharacters.length > 1 && (
                <div className="flex items-center">
                  <button
                    type="button"
                    className="box-shadow-hover-2 hover:text-gray-200 focus:text-gray-200 focus:outline-none"
                    onClick={() => dispatch(clearAllSearchedCharacterAction())}
                  >
                    CLEAR ALL
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col h-64 overflow-y-auto">
              {searchedCharacters.map((item) => (
                <ItemSearch
                  key={`searched-character-${item}`}
                  characters={searchResults}
                  item={item}
                  inputRef={inputRef}
                  isSearchResults={isSearchResults}
                  setIsSearch={setIsSearch}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Search.propTypes = {}

export default Search
