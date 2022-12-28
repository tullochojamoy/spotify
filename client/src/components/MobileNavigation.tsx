import React from 'react';

export default function MobileNavigation({setActive}){
    return(
        <nav className='navbar navbar-light d-md-none d-block'>
            <div className='container-fluid'>
                <button className='navbar-toggler d-md-none d-block' type="button" onClick={()=>setActive('active')}>
                    <span className='navbar-toggler-icon'></span>
                </button>
            </div>
        </nav>
    );
}