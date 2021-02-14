import React, { useEffect, useState, } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import Credentials from '../../../../src/config'
import axios from 'axios'
import '../styles/_discover.scss';

const Discover = () => {
  const [newReleases, setNewReleases] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [categories, setCategories] = useState([])
  const spotifyClientId = Credentials.api.clientId
  const spotifyClientSecret = Credentials.api.clientSecret

  useEffect(() => {
    let token = ''
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotifyClientId + ':' + spotifyClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {
      token = tokenResponse.data.access_token
      fetchData(token)
    })
    .catch(error => {
      console.log('Error with Spotify Credentials... ', error)
    })
  }, [spotifyClientId, spotifyClientSecret])
  
  const fetchData = async(token) => {
    // multiple requests using async await - this will display the three sections too
    // await axios('https://api.spotify.com/v1/browse/new-releases', {
    //   method: 'GET',
    //   headers: { 'Authorization' : 'Bearer ' + token}
    // }).then(newReleasesResponse => {
    //   setNewReleases(newReleasesResponse.data.albums.items)
    // }).catch(newReleasesError => {
    //   console.log('Error fetching New Releases... ', newReleasesError )
    // })

    // await axios('https://api.spotify.com/v1/browse/featured-playlists', {
    //   method: 'GET',
    //   headers: { 'Authorization' : 'Bearer ' + token}
    // }).then(featuredPlaylistResponse => {
    //   setPlaylists(featuredPlaylistResponse.data.playlists.items)
    // }).catch(featurePlaylistError => {
    //   console.log('Error fetching Featured Playlist... ', featurePlaylistError)
    // })

    // await axios('https://api.spotify.com/v1/browse/categories', {
    //   method: 'GET',
    //   headers: { 'Authorization' : 'Bearer ' + token}
    // }).then(categoriesResponse => {        
    //   setCategories(categoriesResponse.data.categories.items)
    // }).catch(categoriesErrors => {
    //   console.log('Error fetching Categories...', categoriesErrors)
    // })

    // multiple requests using Promise.all - this will display the three sections as well
    const getNewReleases = axios.get('https://api.spotify.com/v1/browse/new-releases', {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })

    const getFeaturedPlaylists = axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })

    const getCategories = axios.get('https://api.spotify.com/v1/browse/categories', {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })

    Promise.all([getNewReleases, getFeaturedPlaylists, getCategories])
    .then(response => {
      setNewReleases(response[0].data.albums.items)
      setPlaylists(response[1].data.playlists.items)
      setCategories(response[2].data.categories.items)
    })
    .catch(error => {
      console.log('Error Fetching data. Error details: ', error)
    })
  }

  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
    </div>
  )
}

export default Discover