const countEntriesTotal = (entries) => {
  return entries.map((entry) => parseFloat(entry["value"]) || 0)
    .reduce((sum, val) => sum + val)
}

module.exports = {
  countEntriesTotal
}