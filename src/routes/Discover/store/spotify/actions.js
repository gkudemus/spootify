import axios from "axios"

//WIP

export const NEW_RELEASES_REQUEST = 'NEW_RELEASES_REQUEST'
export const NEW_RELEASES_SUCCESS = 'NEW_RELEASES_SUCCESS'
export const NEW_RELEASES_FAIL = 'NEW_RELEASES_FAIL'

export const getNewReleases = token => {
  return async dispatch => {
    await dispatch({ type: NEW_RELEASES_REQUEST })

    await axios.get('https://api.spotify.com/v1/browse/new-releases')
    .then(data => {
      dispatch({ type: NEW_RELEASES_SUCCESS, payload: data })
    })
    .catch(error => {
      dispatch({ type: NEW_RELEASES_FAIL, payload: error })
    })
  }
}