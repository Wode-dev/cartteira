module.exports = {
  queryWithoutPagination: query => {
    let q = { ...query }
    console.info('init queryWithoutPagination')

    delete q.page
    delete q.limit

    return q
  }
}