export const LOCATION = 'LOCATION';

export function selectShow(location) {
  return {
    type: LOCATION,
    payload :  location
  }
}
