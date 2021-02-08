export default (row, it) => {
  const preData = (it || '').split('.').reduce((acc, rec) => {
    const matches = rec.match(/^(.+)\[([0-9]+)\]$/)
    if (matches !== null) {
      return acc[matches[1]][+matches[2]]
    }
    return acc?.[rec]
  }, row)

  return preData
}
