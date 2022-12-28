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

export const songFavouritesReducer = (state = {favourites: [], loading:true, error:null}, action) => {
    switch (action.type){
        case SONG_SET_FAVOURITES_REQUEST:
            return { loading: true };
        case SONG_SET_FAVOURITES_SUCCESS:
            return { favourites: action.payload, loading: false };
        case SONG_SET_FAVOURITES_FAIL:
            return { error: action.payload, loading: false };

        case SONG_GET_FAVOURITES_REQUEST:
            return { loading: true };
        case SONG_GET_FAVOURITES_SUCCESS:
            return { favourites: action.payload, loading: false };
        case SONG_GET_FAVOURITES_FAIL:
            return { error: action.payload, loading: false };

        default:
            return state;
    }
};

export const songPlaylistReducer = (state = {playlist: [], loading:true, error:null}, action) => {
    switch (action.type){
        case SONG_SET_PLAYLIST_REQUEST:
            return { loading: true };
        case SONG_SET_PLAYLIST_SUCCESS:
            return { playlist: action.payload, loading: false };
        case SONG_SET_PLAYLIST_FAIL:
            return { error: action.payload, loading: false };

        case SONG_GET_PLAYLIST_REQUEST:
            return { loading: true };
        case SONG_GET_PLAYLIST_SUCCESS:
            return { playlist: action.payload, loading: false };
        case SONG_GET_PLAYLIST_FAIL:
            return { error: action.payload, loading: false };

        default:
            return state;
    }
};

export const songDetailsReducer = (state = {song: [], loading:true, error:null}, action) => {
    switch (action.type){
        case SONG_DETAILS_REQUEST:
            return { loading: true };
        case SONG_DETAILS_SUCCESS:
            return { song: action.payload, loading: false };
        case SONG_DETAILS_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const songListReducer = (state = {songs: [], loading:true, error:null}, action) => {
    switch (action.type){
        case SONG_LIST_REQUEST:
            return { loading: true };
        case SONG_LIST_SUCCESS:
            return { songs: action.payload, loading: false };
        case SONG_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const songSearchListReducer = (state = {songsFound: [], loading:true, error:null}, action) => {
    switch (action.type){
        case SONG_SEARCH_LIST_REQUEST:
            return { loading: true };
        case SONG_SEARCH_LIST_SUCCESS:
            return { songsFound: action.payload, loading: false };
        case SONG_SEARCH_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};