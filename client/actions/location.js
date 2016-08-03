export const LOCATION = 'LOCATION';

export function setLocation(location) {
  console.log("setLocation", location)
  return {
    type: LOCATION,
    payload: location
  }
}
