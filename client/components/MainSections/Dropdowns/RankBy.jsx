import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from './Dropdown'

const RankBy = ({ rankByParam, setRankByParam }) => {
  const rankBy = useSelector((s) => s.categories.rankBy)
  const items = rankBy.map(({ key, title }) => ({
    id: key,
    value: title ?? key
  }))

  return (
    <Dropdown
      key="dropdown"
      title="rank by"
      items={items}
      handleSelect={setRankByParam}
      // defaultButton
      param={rankByParam}
    />
  )
}

export default RankBy
