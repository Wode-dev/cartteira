module.exports = function (data, total, limit, skip = 0) {

  let paginated_data = {
    total,
    limit: limit > total ? total : limit,
    skip,
    data,
  };

  return paginated_data;
}
