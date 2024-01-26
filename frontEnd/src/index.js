import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './context/store'; // Import your Redux store



import App from './App';

// ReactDOM.render(s
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// import React from "react";
// import ReactDOM from "react-dom/client";

// import "./index2.css";


// import "./index.css";
// import App2 from "./App2";
// import { store } from "./context/store";
// import { Provider } from "react-redux";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//     <App2 />
//   </Provider>
// );

// // // export default Index;

// // import React from "react";
// // import ReactDOM from "react-dom";
// // import { store } from "./context/store";
// // import { Provider } from "react-redux";
// // import App from "./App";
// // import App2 from "./App2";
// // import "./index.css";
// // import "./index2.css";

// // const root = document.getElementById("root");
// // const rootElement = (
// //   <Provider store={store}>
// //     <React.StrictMode>
// //       <App />
// //       <App2 />
// //     </React.StrictMode>
// //   </Provider>
// // );

// // ReactDOM.createRoot(root).render(rootElement);
