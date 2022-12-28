import React from 'react';
import { Link } from 'react-router-dom';

//Redux Imports
import { useSelector } from 'react-redux';

//Component Imports
import Card from '../components/Card';

function Spotify() {
    const songsFoundSelect = useSelector(state => state.songSearchList);
    const {songsFound, loading} = songsFoundSelect; 
    
    return (
        <>
            <div className='d-flex align-items-center my-3'>
                <div>
                    <h6 className='text-nowrap fw-bold small m-0' style={{color: "#CDCDDB"}}>
                        SEARCH RESULTS
                    </h6>
                </div>
                <hr className='w-100'/>
            </div>
                        
            <div className="row d-flex flex-row">
                {loading ? (<h1>Loading...</h1>)
                //: error ? (<h1>Error</h1>)
                : ( songsFound.map((track)=> {
                        return(
                            <Link key={track?.track?.key} to={`/song/${track?.track?.key}`} className='col-sm-3 col-md-2 col-lg-1 link-unstyled'>
                                <Card image={track?.track?.images?.coverart ? track?.track?.images?.coverart : '/cd'} title={track?.track?.title ? track?.track?.title : 'Song Title'} />
                            </Link>
                        )
                    })
                )}
            </div>
        </>
    )
}

export default Spotify;