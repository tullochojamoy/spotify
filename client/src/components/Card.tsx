import React from 'react';

const Card: React.FC = ({image, title}) => {
    image = image ? image : '/cd'
    title = title ? title : 'Song'
    return(
      <div className='card h-100 border-0'>
        <img 
          src={image}
          className='rounded card-img-top' 
          alt={title}
        />
        <div className="card-body p-0 d-flex justify-content-center align-items-center">
          <div className="card-title m-0 text-center">{title.substring(0,40)}</div>
        </div>
      </div>
    );
}

export default Card;