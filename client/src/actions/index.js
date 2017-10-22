import axios from 'axios';
import { FETCH_USER, FETCH_BARS, ADD_GOING } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchBars = ({ latitude, longitude }) => async dispatch => {
  const res = await axios.post('/api/yelp', {
    latitude,
    longitude
  });

  dispatch({ type: FETCH_BARS, payload: res.data });
}

export const postUserToPatrons = (yelpId, action) => async dispatch => {
  const res = await axios.post(`/api/yelp/${yelpId}`, action);

  dispatch({ type: ADD_GOING, payload: res.data });
}
