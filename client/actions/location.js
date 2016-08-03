export const LOCATION = 'LOCATION';

export function fetchLocation(location) {
  return {
    type: LOCATION,
    payload :  location
  }
}
