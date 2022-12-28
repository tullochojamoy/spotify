import React, { useEffect } from 'react';

//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { getTrack, setFavouriteTrack, setPlaylistTrack } from '../redux/actions/songActions';


function Song() {
    const dispatch = useDispatch();

    //Get Song Details State
    const songDetails = useSelector(state => state.songDetails);
    const {song, loading} = songDetails;
    //const favouriteTracks = useSelector(state => state.songFavourites);

    //Set Song as Favourite
    function favouriteTrack(fTrack){
        dispatch(setFavouriteTrack(fTrack))
    }

    //Add Song to Playlist
    function playlistTrack(fTrack){
        dispatch(setPlaylistTrack(fTrack))
    }
    
    //Get Song Key
    let key=window.location.pathname.split('/')[2];

    //Get Song on Load
    useEffect(()=>{
        dispatch(getTrack(key))
    }, [dispatch, key]);

    
    if(loading) return <h1>Loading...</h1>;

    return (
        <div className='row mt-3'>
            <div className='col-6'>
                <img className='img-fluid' src={song?.images?.coverart ? song.images?.coverart : '/cd'} alt='Song CoverArt'/>
            </div>
            <div className='col-6 d-flex flex-column justify-content-center align-items-center border'>
                <h1>{song.title}</h1>
                <button type="button" onClick={()=>favouriteTrack(song)} className="btn btn-primary btn-success">Favourite:&nbsp;
                    <i className="bi bi-heart"></i>
                </button>
                <br />
                <button type="button" onClick={()=>playlistTrack(song)} className="btn btn-primary btn-success">Add to Playlist:&nbsp;
                    <i className="bi bi-music-note-list"></i>
                </button>
            </div>
        </div>
  )
}

export default Song;