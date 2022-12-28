import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Component Imports
import Card from '../components/Card';

//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { getSongs } from '../redux/actions/songActions';

function Spotify() {
    const dispatch = useDispatch();

    //Get Song Details State
    const songList = useSelector(state => state.songList);
    const {songs, loading} = songList;

    //Get Song on Load
    useEffect(()=>{
        dispatch(getSongs());
    }, [dispatch]);

    
    //Handle Skip Card
    function slideLeft(target: string){
        var slider: any = document.getElementById(target);
        slider.scrollLeft = slider.scrollLeft - 113;
    };
      
    function slideRight(target: string){
        var slider: any = document.getElementById(target);
        slider.scrollLeft = slider.scrollLeft + 113;
    };      
       
    return (
        <>
            <div className='d-flex align-items-center my-3'>
                <div>
                    <h6 className='text-nowrap fw-bold small m-0' style={{color: "#CDCDDB"}}>
                        RELEASED THIS WEEK
                    </h6>
                </div>
                <hr className='w-100'/>&nbsp;
                <span onClick={()=>slideLeft('slider')}>
                    <i className="bi bi-chevron-left" style={{color: '#574FD8'}}></i>
                </span>
                &nbsp;
                <span onClick={()=>slideRight('slider')}>
                    <i className="bi bi-chevron-right" style={{color: '#574FD8'}}></i>
                </span>
            </div>
                        
            <div className="row d-flex flex-row flex-nowrap"
                style={{overflowX: "scroll", overflow: "hidden"}}
                id='slider'
            >
                {loading ? <h1>Loading...</h1>
                : songs?.music?.tracks?.map((track)=> {
                    return(
                        <Link key={track?.key} to={`/song/${track?.key}`} className='col-sm-3 col-md-2 col-lg-1 link-unstyled'>
                            <Card image={track?.images?.coverart ? track.images.coverart : '/cd'} title={track?.title ? track?.title : 'Song Title'} />
                            
                        </Link>
                    )
                })}
            </div>

            <div className=' d-flex align-items-center my-3'>
                <div>
                    <h6 className='text-nowrap fw-bold small m-0 '
                    style={{color: "#CDCDDB"}}
                    >
                        FEATURED PLAYLISTS
                    </h6>
                </div>
                <hr className='w-100 '/>&nbsp;
                <span onClick={()=>slideLeft('slider1')}>
                    <i className="bi bi-chevron-left" style={{color: '#574FD8'}}></i>
                </span>
                &nbsp;
                <span onClick={()=>slideRight('slider1')}>
                    <i className="bi bi-chevron-right" style={{color: '#574FD8'}}></i>
                </span>
            </div>
                        
            <div className="row d-flex flex-row flex-nowrap"
                style={{overflowX: "scroll", overflow: "hidden"}}
                id='slider1'
            >
                {loading ? <h1>Loading...</h1>
                : songs?.topTracks?.tracks?.map((track)=> {
                    return(
                        <Link key={track?.key} to={`/song/${track?.key}`} className='col-sm-3 col-md-2 col-lg-1 link-unstyled'>
                            <Card image={track?.images?.coverart ? track.images.coverart : '/cd'} title={track?.title ? track?.title : 'Song Title'} />
                        </Link>
                    );
                })}
            </div>
        </>
    )
}


export default Spotify;