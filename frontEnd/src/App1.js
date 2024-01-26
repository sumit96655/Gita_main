// // import React, {useEffect, useState} from 'react';
// // import 'semantic-ui-react';
// // import './App.css';
// // import Navbar from './Navbar';
// // import './index.css';
// // import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// // import Home from './pages/Home';
// // import Reports from './pages/Reports';
// // // import Products from './pages/Product';
// // import SearchVerse from './pages/SearchVerse';
// // import DailyVerse from './pages/DailyVerse';
// // import StoriesandAnimation from './pages/StoriesandAnimation';
// // import DiscussionForum from './pages/DiscussionForum';
// // import Likemindedpeoplecommunity from './pages/Likemindedpeoplecommunity';
// // import YourDownloads from './pages/YourDownloads';
// // import AdditionalSettings from './pages/AdditionalSettings';
// // import BackgroundImageComponent from './pages/BackgroundImageComponent';
// // import Footer from './pages/Footer';
// // // import LoginSignup from './pages/LoginSignup';
// // import './pages/loginStyle.css';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import App2 from './App2';


// // function App1() {

//   const [isNavbarHidden, setIsNavbarHidden] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     // Check if the current location is the home page
//     setIsNavbarHidden(location.pathname === '/');
//   }, [location.pathname]);

// //   return (
// //     <>
// //       <Router>
// //         {!isNavbarHidden && <Navbar />}
// //         {/* <Navbar /> */}
// //         <Routes>
// //           <Route path="/" element={<BackgroundImageComponent />} />
// //           <Route path="/reports" element={<Reports />} />
// //           <Route path='/home' element={<Home />} />
// //           <Route path="/SearchVerse" element={<SearchVerse />} />
// //           <Route path="/DailyVerse" element={<DailyVerse />} />
// //           <Route path="/StoriesandAnimation" element={<StoriesandAnimation />} />
// //           <Route path="/DiscussionForum" element={<DiscussionForum />} />
// //           <Route path="/Likemindedpeoplecommunity" element={<Likemindedpeoplecommunity />} />
// //           <Route path="/YourDownloads" element={<YourDownloads />} />
// //           <Route path="/AdditionalSettings" element={<AdditionalSettings />} />
// //           {/* <Route path="/LoginSignup" element={<LoginSignup />} /> */}
// //           <Route path="/Login" element={<Login />} />
// //           <Route path="/Register" element={<Register />} />
// //           <Route path="/App2" element={<App2 />} />
// //         </Routes>
// //         <Footer />
// //       </Router>
// //     </>
// //   );
// // }

// // export default App1;

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Navbar from './Navbar';
// import Home from './pages/Home';
// import Reports from './pages/Reports';
// import SearchVerse from './pages/SearchVerse';
// import DailyVerse from './pages/DailyVerse';
// import StoriesandAnimation from './pages/StoriesandAnimation';
// import DiscussionForum from './pages/DiscussionForum';
// import Likemindedpeoplecommunity from './pages/Likemindedpeoplecommunity';
// import YourDownloads from './pages/YourDownloads';
// import AdditionalSettings from './pages/AdditionalSettings';
// import BackgroundImageComponent from './pages/BackgroundImageComponent';
// import Footer from './pages/Footer';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import App2 from './App2';

// function App1() {
//   return (
//     <Router>
//       {/* Conditionally render Navbar based on the route */}
//       <Routes>
//         <Route
//           path="/*"
//           element={<App1WithNavbar />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// function App1WithNavbar() {
//   const [isNavbarHidden, setIsNavbarHidden] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     // Check if the current location is the home page
//     setIsNavbarHidden(location.pathname === '/');
//   }, [location.pathname]);

//   return (
//     <>
//       {/* Conditionally render Navbar based on the state */}
//       {!isNavbarHidden && <Navbar />}
      
//       <Routes>
//         <Route path="/" element={<BackgroundImageComponent />} />
//         <Route path="/reports" element={<Reports />} />
//         <Route path='/home' element={<Home />} />
//         <Route path="/SearchVerse" element={<SearchVerse />} />
//         <Route path="/DailyVerse" element={<DailyVerse />} />
//         <Route path="/StoriesandAnimation" element={<StoriesandAnimation />} />
//         <Route path="/DiscussionForum" element={<DiscussionForum />} />
//         <Route path="/Likemindedpeoplecommunity" element={<Likemindedpeoplecommunity />} />
//         <Route path="/YourDownloads" element={<YourDownloads />} />
//         <Route path="/AdditionalSettings" element={<AdditionalSettings />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Register" element={<Register />} />
//         <Route path="/App2" element={<App2 />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App1;
