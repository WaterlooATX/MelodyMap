export const LOCATION = 'LOCATION';

export function setLocation(location) {
  return {
    type: LOCATION,
    payload: location
  }
}
