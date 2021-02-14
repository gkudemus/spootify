import { combineReducers } from 'redux'
import spotifyReducer from './spotify/reducers'

const rootReducer = combineReducers({
  spotify: spotifyReducer
})

export default rootReducer