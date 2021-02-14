// WIP

import {
  NEW_RELEASES_REQUEST,
  NEW_RELEASES_SUCCESS,
  NEW_RELEASES_FAIL
} from './actions'

const initialState = {
  loading: false,
  data: {},
  errors: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_RELEASES_REQUEST:
      return {
        ...state,
        loading: true,
        data: {}
      }

    case NEW_RELEASES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errors: {}
      }

    case NEW_RELEASES_FAIL:
      return {
        ...state,
        loading: false,
        data: {},
        errors: action.payload
      }
    default:
      return state
  }
}
