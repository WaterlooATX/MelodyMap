import { VENUES } from "../actions/venues";

export default function(state = [], action) {
  switch (action.type) {
    case VENUES:
    return action.payload
  }
  return state
}