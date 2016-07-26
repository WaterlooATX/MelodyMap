import fetch from 'isomorphic-fetch'

import { checkStatus } from './lib/util.solution.js'

export function fetchShops() {
  return fetch('http://pet-shop.api.mks.io/shops/1')

    .then(checkStatus)
    }


export function fetchPets() {
  return fetch('http://pet-shop.api.mks.io/shops/1/pets')
    .then(checkStatus)
}

export function likePet(petId) {
  return fetch('http://pet-shop.api.mks.io/shops/1/pets/' + petId + '/like', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       'Authorization': `API token="${localStorage.apiToken}"`
      }
    })
    .then(checkStatus)
}
