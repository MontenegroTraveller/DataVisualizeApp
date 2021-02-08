import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { closeCharacterInfoAction } from '../../redux/actions/data'

const CharacterInfo = ({ currentShowingCharacterID }) => {
  const dataCharacter = useSelector((state) => state.data.characters[currentShowingCharacterID])

  const dispatch = useDispatch()
  const closeCharacterInfo = () => dispatch(closeCharacterInfoAction())

  const employmentInformationList = [
    {
      title: 'Character Type',
      value: dataCharacter.appearance.race
    },
    {
      title: 'Height',
      value: dataCharacter.appearance.height[1]
    },
    {
      title: 'Intelligence',
      value: dataCharacter.powerstats.intelligence
    },
    {
      title: 'Strength',
      value: dataCharacter.powerstats.strength
    },
    {
      title: 'Speed',
      value: dataCharacter.powerstats.speed
    },
    {
      title: 'Durability',
      value: dataCharacter.powerstats.durability
    },
    {
      title: 'Power',
      value: dataCharacter.powerstats.power
    },
    {
      title: 'Combat',
      value: dataCharacter.powerstats.combat
    }
  ]

  const mainInformationList = [
    {
      title: 'SUPER NAME',
      value: dataCharacter.name
    },
    {
      title: 'GOOD OR BAD',
      value: dataCharacter.biography.alignment
    },
    {
      title: 'GENDER',
      value: dataCharacter.appearance.gender
    }
  ]

  const basicInformationList = [
    {
      title: 'Character Type',
      value: dataCharacter.appearance.race
    },
    {
      title: 'Eye Color',
      value: dataCharacter.appearance.eyeColor
    },
    {
      title: 'Hair Color',
      value: dataCharacter.appearance.hairColor
    }
  ]
  return (
    <div
      className="bg-blue-1000-tallround absolute z-40 top-0 right-0 lg:w-3/4 lg:mt-12 lg:mr-6 px-1 inner-height md:h-auto
      animated fadeInDownBig delay-1"
    >
      <div className="flex flex-row flex-wrap justify-between items-center border-b border-gray-700 px-2 py-1">
        <div className="text-2xl font-semibold">{dataCharacter.name}</div>
        <div>
          <button type="button" onClick={closeCharacterInfo} className="focus:outline-none">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap lg:p-4 h-auto overflow-y-auto">
        <div className="flex flex-row lg:flex-col w-full lg:w-1/4 lg:border-r items-center border-gray-700 p-2">
          <div className="flex w-2/5 lg:w-full justify-center items-center p-2">
            <img
              src={dataCharacter.images.sm}
              className="h-32 w-32 xl:h-48 xl:w-48 rounded-full object-cover border-2"
              alt={dataCharacter.name}
            />
          </div>
          <div className="flex flex-col w-3/5 lg:w-full text-xs pl-6 lg:p-0">
            <div className="border-b border-gray-700 py-1">BASIC INFORMATION</div>
            <div className="flex flex-col pr-2">
              {basicInformationList.map((item) => (
                <div key={item.title} className="flex flex-row justify-between">
                  <div>{item.title}</div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-3/4 p-2 lg:pl-4 justify-between">
          <div className="flex flex-row lg:mb-6">
            <div className="w-2/5 flex flex-col">
              {mainInformationList.map((item) => (
                <div key={item.title} className="mb-6">
                  <div className="border-b border-gray-700 text-xs uppercase">{item.title}</div>
                  <div className="text-2xl font-semibold capitalize">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-3/5 pl-6">
              <div className="border-b border-gray-700 text-xs uppercase">
                EMPLOYMENT INFORMATION
              </div>
              {employmentInformationList.map((item) => (
                <div key={item.title} className="mt-1">
                  <div className="flex flex-row justify-between text-xs">
                    <div>{item.title}</div>
                    <div>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col text-xs border border-gray-700">
            <div className="border-b border-gray-700 px-2 uppercase">Notes</div>
            <div className="p-2 h-20 overflow-y-auto">
              <p>{dataCharacter.connections.groupAffiliation}</p>
              <p>{dataCharacter.connections.relatives}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterInfo
