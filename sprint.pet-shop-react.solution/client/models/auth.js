import fetch from 'isomorphic-fetch'

import { checkStatus } from './lib/util.solution.js'

export function signUp(username, password) {

  return fetch('http://pet-shop.api.mks.io/signup', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(checkStatus)
  }

export function signIn(username, password) {

  return fetch('http://pet-shop.api.mks.io/signin', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(checkStatus)
    .then(function (response) {
      localStorage.user     = JSON.stringify(response.user)
      localStorage.apiToken = response.apiToken

      return response
    })
  }
