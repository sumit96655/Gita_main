import React from "react";
import "../index.css";
import ChatBotPage from "../ChatBotPage";



function Home() {
  return (
    <div >
      <main classNameName=" flex justify-around" >
      {/* <div className="flex flex-col my-0 mx-auto">
        <select
          name="select"
          id="select"
          className="w-80 h-8  text-center mt-32 rounded-lg mx-40  border-black border-2"
        >
          <option value="">----Select language----</option>
          <option value="English">English</option>
          <option value="Marathi">Marathi</option>
          <option value="Hindi">Hindi</option>
          <option value="Sanskrit">Sanskrit</option>
        </select>

        <div className="book-container w-80 h-96 my-2 mx-40 mb-20">
          <div className="container">
            <h4>Bhagavad Gita</h4>
            <div id="pdf-container"></div>
            <div className="navigation">
              <button className="pdf-btn" id="prev-page">
                Previous Page
              </button>
              <span id="current-page">1</span>
              <button className="pdf-btn" id="next-page">
                Next Page
              </button>
            </div>
          </div>
        </div>
        
      
      </div> */}
     
      <ChatBotPage  />
     
      </main>
      
      
    </div>
  );
}

export default Home;
