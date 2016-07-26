
// Promise.reject for 400+ status code responses
export function checkStatus(response){
  return response.json()
    .then(function(data){
      return response.status >= 400
        ? Promise.reject(data)
        : data
    })
}
