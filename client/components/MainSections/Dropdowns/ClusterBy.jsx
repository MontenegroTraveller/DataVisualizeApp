import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from './Dropdown'

const ClusterBy = ({ clusterByParam, setClusterByParam }) => {
  const clusterBy = useSelector((s) => s.categories.clusterBy)
  const items = clusterBy.map(({ key, title }) => ({
    id: key,
    value: title ?? key
  }))

  return (
    <Dropdown
      key="dropdown"
      title="cluster by"
      items={items}
      handleSelect={setClusterByParam}
      param={clusterByParam}
    />
  )
}

export default ClusterBy
