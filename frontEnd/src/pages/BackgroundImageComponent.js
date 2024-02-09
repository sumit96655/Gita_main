import React from 'react';
import Typist from 'react-typist';
import './BackgroundImageComponent.css'; // Import the CSS file for styling
import backgroundImage from './gita2.jpg'; // Replace 'yourImage.jpg' with the actual filename
import { useEffect } from 'react';
import NavbarHome from '../NavbarHome';
import '../NavbarHome.css';
import { Link } from 'react-router-dom';
 
const BackgroundImageComponent = () => {
  const typingText = "Welcome to GitaSoulConnect.."; // Change this to your desired intro text

  const features = [
    "Click, read, and let the adventure feed your need!",
    "Click to Connect: Where Ideas Collide and Conversations Take Flight!",
    "Daily Enlightenment: Unveil Today's Sacred Verse!",
    "Journey Through Wisdom: Unveiling the Essence of Bhagavad Gita's Chapters",   
  ];

  const setBackgroundImage = () => {
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    return backgroundStyle;
  };

  return (
    <>
    <div className="background-container" style={setBackgroundImage()}>
    <NavbarHome />
      <div className="content">
        <div className="intro-text">
          <h2 className="intro-header">Discover a New World</h2>
          <Typist>
            {typingText.split("").map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 50}ms` }}>
                {char}
              </span>
            ))}
          </Typist>
        </div>
        <div className="about-text">
          <h2>About Us</h2>
          <Typist>
            <p>
              Embark on a journey of self-discovery with Gitasoul Connect – your gateway to the timeless wisdom of the Bhagavad Gita.
            </p>
            {/* <h3>Our Mission</h3> */}

            <p>
              Gitasoul Connect is your digital sanctuary for the Bhagavad Gita. Immerse yourself in the teachings, chat with wisdom, and personalize your spiritual path. Join a vibrant community, download your favorite verses, and let the Gita guide you on your journey to inner peace.
            </p>
          </Typist>
        </div>
    <div className="features-container">
      <div className="features text-black">
        <h2>Key Features</h2>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="chatbot-icon">
        {/* Add your chatbot icon or button component here */}
        <Link to='/home' className='Chatbot'><img src={require('./cudie.png')} alt="Chatbot" /></Link>

      </div>
    </div>
      </div>
      
    </div>
    {/* <br></br> */}
    </>
  );
};

export default BackgroundImageComponent;
