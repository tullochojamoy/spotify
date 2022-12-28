import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { getFavouriteTrack } from '../redux/actions/songActions';

//Component Imports
import Card from '../components/Card';


function Favourites() {
    const dispatch = useDispatch();

    const favouriteTracks = useSelector(state => state.songFavourites);
    const {favourites, loading, error} = favouriteTracks;

    useEffect(()=>{
        dispatch(getFavouriteTrack())
    }, [dispatch])


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
                    <h6 className='text-nowrap fw-bold small m-0 '
                    style={{color: "#CDCDDB"}}
                    >
                        FAVOURITES
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
                : favourites.map((track: any) => {
                    return(
                        <Link key={track.key} to={`/song/${track.key}`} className='col-sm-3 col-md-2 col-lg-1 link-unstyled'>
                            <Card image={track.images.coverart} title={track.title} />
                        </Link>
                    )
                })}
            </div>
        </>
    )
}


export default Favourites;