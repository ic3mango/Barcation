import { FETCH_BARS, ADD_GOING } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BARS:
      return action.payload;
    case ADD_GOING:
      return state.map(bar =>
        bar.id === action.payload.yelpId
        ? { ...bar, patrons: action.payload.patrons, userGoing: true } : bar )
    default:
      return state;
  }
}
