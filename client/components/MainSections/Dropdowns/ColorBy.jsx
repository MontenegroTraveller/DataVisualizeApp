import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from './Dropdown'
import ColorByLegend from './ColorByLegend'

const ColorBy = ({ setColorParam, colorParam, characters, isolateCharacters, viewNumber }) => {
  const colorBy = useSelector((s) => s.categories.colorBy)
  const items = colorBy.map(({ key, title }) => ({
    id: key,
    value: title ?? key
  }))
  if (!colorParam.key) {
    return (
      <Dropdown
        key="dropdown"
        title="color by"
        items={items}
        handleSelect={setColorParam}
        defaultButton
      />
    )
  }
  return [
    <Dropdown
      key="dropdown"
      title="color by"
      items={items}
      handleSelect={setColorParam}
      defaultButton
    />,
    <ColorByLegend
      key="colorByLegend"
      colorParam={colorParam}
      characters={characters}
      isolateCharacters={isolateCharacters}
      viewNumber={viewNumber}
    />
  ]
}

export default ColorBy
