import Axios from 'axios';

import {
  SONG_SET_PLAYLIST_REQUEST,
  SONG_SET_PLAYLIST_SUCCESS,
  SONG_SET_PLAYLIST_FAIL,

  SONG_GET_PLAYLIST_REQUEST,
  SONG_GET_PLAYLIST_SUCCESS,
  SONG_GET_PLAYLIST_FAIL,

  SONG_SET_FAVOURITES_REQUEST,
  SONG_SET_FAVOURITES_SUCCESS,
  SONG_SET_FAVOURITES_FAIL,

  SONG_GET_FAVOURITES_REQUEST,
  SONG_GET_FAVOURITES_SUCCESS,
  SONG_GET_FAVOURITES_FAIL,

  SONG_DETAILS_REQUEST,
  SONG_DETAILS_SUCCESS,
  SONG_DETAILS_FAIL,

  SONG_LIST_REQUEST,
  SONG_LIST_SUCCESS,
  SONG_LIST_FAIL,
  
  SONG_SEARCH_LIST_REQUEST,
  SONG_SEARCH_LIST_SUCCESS,
  SONG_SEARCH_LIST_FAIL,
} from '../constants/songConstants';


//Set Favourite Track Action
export const setFavouriteTrack = (song) => async (dispatch, getState) => {
  dispatch({ type: SONG_SET_FAVOURITES_REQUEST });
  try {
    const { songFavourites } = getState();

    let found=[];
    if(songFavourites.favourites){
      found = songFavourites?.favourites.filter((favourite)=>favourite.key!==song.key)
    }

    found.push(song)

    const { data } = await Axios.put(`https://spotify-assignment-default-rtdb.firebaseio.com/favourites.json`,
    found)

    dispatch({ type: SONG_SET_FAVOURITES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SONG_SET_FAVOURITES_FAIL, payload: error.message });
  }
};

//Get Favourite Track Action
export const getFavouriteTrack = () => async (dispatch) => {
  dispatch({ type: SONG_GET_FAVOURITES_REQUEST });
  try {
    const { data } = await Axios.get(`https://spotify-assignment-default-rtdb.firebaseio.com/favourites.json`)

    dispatch({ type: SONG_GET_FAVOURITES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SONG_SET_FAVOURITES_FAIL, payload: error.message });
  }
};

//Set Playlist Track Action
export const setPlaylistTrack = (song) => async (dispatch, getState) => {
  dispatch({ type: SONG_SET_PLAYLIST_REQUEST });
  try {
    const { songFavourites } = getState();

    let found=[];
    if(songFavourites.favourites){
      found = songFavourites?.favourites.filter((favourite)=>favourite.key!==song.key)
    }

    found.push(song)

    const { data } = await Axios.put(`https://spotify-assignment-default-rtdb.firebaseio.com/playlist.json`, found)

    dispatch({ type: SONG_SET_PLAYLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SONG_SET_PLAYLIST_FAIL, payload: error.message });
  }
};

//Get Playlist Track Action
export const getPlaylistTrack = () => async (dispatch, getState) => {
  dispatch({ type: SONG_GET_PLAYLIST_REQUEST });
  try {
    let { data } = await Axios.get(`https://spotify-assignment-default-rtdb.firebaseio.com/playlist.json`)

    if (!data) data=[];
    dispatch({ type: SONG_GET_PLAYLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SONG_GET_PLAYLIST_FAIL, payload: error.message });
  }
};

//Get One Track Action
export const getTrack = (songId) => async (dispatch) => {
  dispatch({ type: SONG_DETAILS_REQUEST });
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'aa256bb664mshba0beb500015b07p1b8e60jsn48401700181d',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };

    const res = await fetch(`https://shazam.p.rapidapi.com/songs/get-details?key=${songId}&locale=en-US`, options);
    const data = await res.json();
    // let data=song;
    //console.log(data)
    dispatch({ type: SONG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SONG_DETAILS_FAIL, payload: error.message });
  }
};

//Get One Song Action
export const getSongs = () => async (dispatch) => {
  dispatch({ type: SONG_LIST_REQUEST });
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'aa256bb664mshba0beb500015b07p1b8e60jsn48401700181d',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };

    const res = await fetch('https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US', options);
    let music = await res.json();

    const res2 = await fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0', options);
    let topTracks = await res2.json();
    // let music = dataSong;
    // let topTracks = dataSong2;
    let data = {music, topTracks};

    dispatch({ type: SONG_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SONG_LIST_FAIL, payload: error.message });
  }
};

//Search for Song Action
export const songSearch = (searchTerm) => async (dispatch) => {
  dispatch({ type: SONG_SEARCH_LIST_REQUEST });
  try {
    const encodedTerm = encodeURIComponent(searchTerm)

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'aa256bb664mshba0beb500015b07p1b8e60jsn48401700181d',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };

    const res = await fetch(`https://shazam.p.rapidapi.com/search?term=${encodedTerm}&locale=en-US&offset=0&limit=10`, options);
    let data = await res.json();
    data = data.tracks.hits;
    // let data=songsFound.tracks.hits;

    dispatch({ type: SONG_SEARCH_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SONG_SEARCH_LIST_FAIL, payload: error.message });
  }
};