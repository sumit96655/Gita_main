import React from 'react';
import Tour from './Tour';
const Tours = ({ tours, removeTour }) => {
  return (

    <div className='relative'>
      <section className='section'>
        <div className="title protest-riot-regular text-[#281d06] ">
          <h2>Chapter Summary</h2> 
          <div className="underline2"></div>
        </div> 
        <div className='section-container'>
          {tours.map((tour) => {
            return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
          })}
        </div>
      </section>
    </div>

  );
};

export default Tours;
