import React from 'react';
import Tour from './Tour';
const Tours = ({ tours, removeTour }) => {
  return (
    // <section className='section'>
    //   <div className="title">
    //     <h2>Chapter Summary</h2>
    //     <div className="underline2"></div>
    //   </div>
    //   <div className='form'>
    //     {tours.map((tour) => {
    //       return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
    //     })}
    //   </div>
    // </section>

    <div className='relative'>
      <section className='section'>
        <div className="title">
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
