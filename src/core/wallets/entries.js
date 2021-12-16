const countEntriesTotal = (entries) => {
  console.info('Init countEntriesTotal')
  return entries.map((entry) => parseFloat(entry["value"]) || 0)
    .reduce((sum, val) => sum + val, 0)
}

module.exports = {
  countEntriesTotal
}