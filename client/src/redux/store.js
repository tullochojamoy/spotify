import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { 
    songListReducer, 
    songSearchListReducer, 
    songDetailsReducer, 
    songFavouritesReducer, 
    songPlaylistReducer 
} from './reducers/songReducer';

const ISSERVER = typeof window === 'undefined';

const initialState = {    
};

const reducer = combineReducers({
    songList: songListReducer,
    songSearchList: songSearchListReducer,
    songDetails: songDetailsReducer,
    songFavourites: songFavouritesReducer,
    songPlaylist: songPlaylistReducer
});

const composeEnhancer = !ISSERVER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;