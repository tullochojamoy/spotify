import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { songSearch } from '../redux/actions/songActions';
import { useDispatch } from 'react-redux';
import { handleLogout} from './keycloak/Common';

export default function Navigation({setActive, active, logoutUrl}){
    const [search, setSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSearch(event){
        const target = event.target;
        const value = target.value;
        setSearchTerm(value);

        if (window.location.pathname.substring(0,8)!=='/search/'){
            navigate(`/search/${searchTerm}`)
        }
    }

    useEffect(() => {
        let delayDebounceFn: any;

        if(searchTerm.length>2){
            delayDebounceFn = setTimeout(() => {
                dispatch(songSearch(searchTerm))
            }, 3000)
        }

        return () => clearTimeout(delayDebounceFn);
    }, [dispatch, searchTerm])

    return(
        <div className={`sidebar text-white d-flex flex-column justify-content-center align-items-center ${active}`} id='side_nav'>
            <div className='header-box px-2 pt-3 pb-4 d-md-none d-block'>
                <button onClick={()=>setActive('')} className='btn d-md-none d-block text-white'>
                    <i className="bi bi-x-square"></i>
                </button>
            </div>

            <ul className='navbar-nav align-self-center px-2'>
                <li>
                    <Link to='/home' className='link-unstyled'>
                        <p className='text-nowrap'>
                            <img src="/bars.png" 
                                style={{height: "15px"}}
                                className='img-fluid me-3'
                                alt='Home Icon'
                            />Home
                        </p>
                    </Link>
                </li>
                <li className='nav-item'>
                    <p onClick={()=>setSearch(prev=>!prev)} className='text-nowrap'><i className="bi bi-search me-3"></i>Search</p>
                    {search && (
                        <div className="mb-3">
                            <input 
                                className="form-control" 
                                value={searchTerm}
                                onChange={e=>handleSearch(e)}
                            />
                        </div>
                    )} 
                </li>
                <li>
                    <Link to='/favourites' className='link-unstyled'>
                        <p className='text-nowrap'><i className="bi bi-suit-heart-fill me-3"></i>Favourites</p>
                    </Link>
                </li>
                <li>
                    <Link to='/playlists' className='link-unstyled'>
                        <p className='text-nowrap'><i className="bi bi-play-circle-fill me-3"></i>Playlists</p>
                    </Link>
                </li>
                <li>
                    <Link to='/pro' className='link-unstyled'>
                        <p className='text-nowrap'><i className="bi bi-rocket-takeoff me-3"></i>Become a Pro</p>
                    </Link>
                </li>
                <li>
                    <Link
                        to='#' 
                        className='link-unstyled'
                        onClick={() => handleLogout()}
                    >
                    <p className='text-nowrap'><i className="bi bi-door-open-fill me-3"></i>Logout</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}