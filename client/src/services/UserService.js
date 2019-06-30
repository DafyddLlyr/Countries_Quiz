const baseURL = 'http://locaslhost:3000/api/users/'

export default {
  getUsers(){
    return fetch(baseURL)
    .then(res => res.json())
  },

  updatePassed(payload){
    return fetch(baseURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  }
}
