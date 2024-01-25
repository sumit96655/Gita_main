import React from 'react';
import Typist from 'react-typist';
import './BackgroundImageComponent.css'; // Import the CSS file for styling
import backgroundImage from './krishna4.jpg'; // Replace 'yourImage.jpg' with the actual filename
import { useEffect } from 'react';
import NavbarHome from '../NavbarHome';
import '../NavbarHome.css';
import { Link } from 'react-router-dom';
 
const BackgroundImageComponent = () => {
  const typingText = "Welcome to GeetaSoulConnect.."; // Change this to your desired intro text

  // useEffect(() => {
  //   // Use querySelectorAll to get a NodeList
  //   const navList = document.querySelectorAll('.navbar');
    
  //   // Loop through each element in the NodeList and add the class individually
  //   navList.forEach(nav => {
  //     nav.classList.add('nav-hidden');
  //   });
  // }, []);

  const features = [
    'Personalized spiritual guidance',
    'Vibrant community support',
    'Download your favorite verses',
    'Interactive chat with wisdom',
  ];

  const setBackgroundImage = () => {
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    //   filter: 'blur(4px)', // Adding a blur effect
    };

    return backgroundStyle;
  };

  return (
    <>
    <NavbarHome />
    <div className="background-container" style={setBackgroundImage()}>
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
              Geetasoul Connect is your digital sanctuary for the Bhagavad Gita. Immerse yourself in the teachings, chat with wisdom, and personalize your spiritual path. Join a vibrant community, download your favorite verses, and let the Gita guide you on your journey to inner peace.
            </p>
          </Typist>
        </div>
      </div>
      
    </div>
    {/* <br></br> */}
    <div className="features-container">
      <div className="features text-white">
        <h2>Key Features</h2>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="chatbot-icon">
        {/* Add your chatbot icon or button component here */}
        <Link to='/home' className='Chatbot'><img src={require('./1952.jpg')} alt="Chatbot" /></Link>

      </div>
    </div>
    </>
  );
};

export default BackgroundImageComponent;
