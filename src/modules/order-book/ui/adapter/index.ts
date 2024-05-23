export const getFormattedData = (data: Array<[string, string]>) => {
  return data.map((pair, ind) => {
    const price = parseFloat(pair[0])
    const quantity = parseFloat(pair[1])
    const total = price*quantity
    return {
      key: String(Date.now()*(ind + 1)),
      price: price.toFixed(2),
      quantity: quantity.toFixed(2),
      total: total.toFixed(2)
    }
  }) 
}

export const getSortedDataByTotal = (data) => {
  data.sort((itemFirst, itemSecond) => itemSecond.total - itemFirst.total)
  return data
}
