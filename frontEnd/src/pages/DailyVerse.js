import React, { useState, useEffect } from 'react';
import './daily.css';
import '../loader.css'
import backgroundImage from './bg6.jpg';

function App() {
  const [loading, setLoading] = useState(true);
  const [verseData, setVerseData] = useState(null);

  useEffect(() => {

    
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        window.location.href = "/login";
      }
    

    fetch('http://127.0.0.1:5000/daily_verse/')
      .then(response => response.json())
      .then(data => {
        // Parse the explanation JSON string to an object
        const explanationObject = JSON.parse(data["Today's Verse"].explanation);
        // Update the verse data with the parsed explanation
        setVerseData({
          ...data["Today's Verse"],
          explanation: explanationObject
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching daily verse:', error);
        setLoading(false);
      });
  }, []);

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
    <div className="container" style={setBackgroundImage()}>
      <div className="verse-container">
        <h1>Daily Verse</h1>
        {loading ? (
          // Render loader while loading is true
          <div className="loader mt-96">
             <div class=" jimu-primary-loading"></div>
          </div>
        ) : (
          // Render verse data once loading is false
          <div>
            <p className="verse-text ">Verse: {verseData.verse_text}</p>
            <p className="verse-number">Verse Number: {verseData.verse_number}</p>
            <p className="explanation">Explanation: {verseData.explanation.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;