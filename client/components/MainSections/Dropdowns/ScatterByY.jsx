import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from './Dropdown'

const ScatterByY = ({ setByYParam }) => {
  const scatterByY = useSelector((s) => s.categories.scatterByY)
  const items = scatterByY.map(({ key, title }) => ({
    id: key,
    value: title
  }))
  return (
    <Dropdown
      key="dropdown"
      title="Y-AXIS VALUE"
      items={items}
      handleSelect={setByYParam}
      defaultButton
    />
  )
}

export default ScatterByY
