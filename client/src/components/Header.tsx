import React from 'react';

export default function Header(){
    return(
      <section
        className='d-sm-flex justify-content-between pe-sm-5 text-center text-sm-end overflow-hidden' 
        style={{backgroundColor: "#FFB5A7"}}
      >

          <div className='d-none d-sm-block'>
            <img src={require('../images/playing music.png')}
            style={{maxHeight: "170px"}}
            className='img-fluid'
            alt='Spotify'
            />
          </div>

          <div className='p-0 text-white d-sm-flex 
          flex-column justify-content-center align-items-end'>
            <h2 className="text-nowrap">Your favourite tunes</h2>
            <h3 className='text-nowrap'>All&nbsp;
              <img src='sun.png' 
                className='img-fluid align-self-center'
                style={{height: "30px"}}
                alt='Sun'
              />&nbsp;and all &nbsp;
              <i className="bi bi-moon-fill text-dark"></i>
            </h3>
          </div>

      </section>
    );
}