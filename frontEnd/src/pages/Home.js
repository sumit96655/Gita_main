import React from "react";
import "../index.css";
import ChatBotPage from "../ChatBotPage";
// import { ChatProvider } from "../ChatBotPage";
import backgroundImage from './bg1.jpg';

function Home() {


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
    <div >
      <div className="chatbotbg " style={setBackgroundImage()}>
     
        
        <ChatBotPage  />
      
     
      </div>
      
      
    </div>
  );
}

export default Home;
