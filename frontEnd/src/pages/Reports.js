// import React from 'react';

// function Reports() {
//   return (
//     <div className='reports'>
//       <h1>Reports</h1>
//     </div>
//   );
// }

// export default Reports;
// TourPage.js
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
import './summary.css';
import backgroundImage from './bg8.png';
import '../background.css';
// import '../background.css'

const url = 'http://localhost:5000/tours';
//mongodb://localhost:27017

const Reports = () => {
  
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>Failed to Load</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  const setBackgroundImage = () => {
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      
      backgroundPosition: 'center',
    //   filter: 'blur(4px)', // Adding a blur effect
    };
    return backgroundStyle;
  }

  return (
    <div  style={setBackgroundImage()} >
    <main className='bg-transparent'>
      <Tours tours={tours} removeTour={removeTour}  />
    </main>
    </div>
  );
};

export default Reports;
