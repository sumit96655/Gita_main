import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from "./context/store";


import App1 from './App1';
import App2 from './App2';

function App() {
  const [showApp1, setShowApp1] = useState(true);

  const toggleApp = () => {
    setShowApp1(!showApp1);
  };

  return (
    <Provider store={store}>
      {showApp1 ? <App1 /> : <App2 />}
      <button onClick={toggleApp}>Toggle App</button>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
