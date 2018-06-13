export default {
 dataParser (targetedArray, ...options) {
    let parsedData = []
    targetedArray.forEach(item => {
      let parsedItem = {}
      options.forEach(option => (parsedItem[option] = item[option]))
      parsedData.push(parsedItem)
    })  
    return parsedData
  },  
  errorHandler (context, error) {
    if (error.response === undefined) {
      return
    }   

    const status = error.response.status
    if (status === 404) {
      context.message = 'Invalid request'
    } else if (status === 401 || status === 403) {
      context.message = 'Unauthorized'
    } else if (status === 400) {
      context.message = 'Invalid or missing information'
    } else {
      context.message = error.message
    }
  }
}
