import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// Import components from both files
import Content from './components/Content';
import CreateButton from './components/CreateButton';
import Navbar from './Navbar';
import Sidebar from './components/Sidebar';
import Askquestion from './components/Askquestion';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Myanswers from './pages/Myanswers';
import Explore from './pages/Explore';
import Notfound from './components/Notfound';
import BackgroundImageComponent from './pages/BackgroundImageComponent';
import Footer from './pages/Footer';
import backgroundImage from './pages/bg6.jpg';
// app1 imports
// import Navbar from './Navbar';
import Home from './pages/Home';
import Reports from './pages/Reports';
import SearchVerse from './pages/SearchVerse';
import DailyVerse from './pages/DailyVerse';
import StoriesandAnimation from './pages/StoriesandAnimation';
import DiscussionForum from './pages/DiscussionForum';
import YourDownloads from './pages/YourDownloads';
import AdditionalSettings from './pages/AdditionalSettings';

import {addUsers} from './context/onlineSlice';

import { useNavigate } from 'react-router-dom';


const queryClient = new QueryClient();

export const socket = io('https://gita-backend.onrender.com', {
  withCredentials: true,
  secure: true,
});

const Layout = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = '/login';
    }

    socket.connect();
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.auth = user;

    socket.on('user-connected', (users) => {
      console.log('users', users);
      dispatch(addUsers(users));
    });

    socket.on('user-disconnected', (users) => {
      console.log('users', users);
      dispatch(addUsers(users));
    });

    const getUsers = async () => {
      const res = await axios.get('https://gita-backend.onrender.com/allusers');
      setUsers(res.data);
    };
    getUsers();
  }, [socket]);

  const setBackgroundImage = () => {
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      
      backgroundPosition: 'center',
    };
    return backgroundStyle;
  }


  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div style={setBackgroundImage()}>
        {/* <Navbar /> */}
        <div className="w-screen h-screen flex justify-center items-start px-4 md:px-12 pt-12 ">
          <Sidebar />
          <Outlet />
          <div className="right-section hidden md:block h-80 z-10 top-24 right-28 absolute">
            <CreateButton />
            <div className="mt-8 py-4 px-3 rounded-md flex flex-col items-start gap-5 ">
              <h2 className="text-gray-600 font-bold text-start">Top Users</h2>
              {users.length > 0 &&
                users.slice(0, 5).map((user, index) => {
                  console.log('user', user);
                  return (
                    <div className="flex items-center cursor-pointer" key={index}>
                      <img
                        src={user?.profileImage}
                        alt="profile"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <h3 className="text-xs">{user.name}</h3>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

function App() {
  return (
    <Router>
      {/* Conditionally render Navbar based on the route */}
      <Routes>
        <Route
          path="/*"
          element={<App1WithNavbar />}
        />
      </Routes>
    </Router>
  );
}
function App1WithNavbar(){
  const [isNavbarHidden, setIsNavbarHidden] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Check if the current location is the home page
    setIsNavbarHidden(  location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register');
  }, [location.pathname]);
  
  return (
    <>
    
      {!isNavbarHidden && <Navbar />}
      {/* <Navbar/> */}
      
      <Routes>
      <Route path="/" element={<BackgroundImageComponent />} />
        <Route path="/reports" element={<Reports />} />
         <Route path='/home' element={<Home />} />
         <Route path="/SearchVerse" element={<SearchVerse />} />
         <Route path="/DailyVerse" element={<DailyVerse />} />
         <Route path="/StoriesandAnimation" element={<StoriesandAnimation />} />
         <Route path="/DiscussionForum" element={<DiscussionForum />} />
         <Route path="/YourDownloads" element={<YourDownloads />} />
         <Route path="/AdditionalSettings" element={<AdditionalSettings />} />
         <Route path="/Login" element={<Login />} />
         <Route path="/Register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/layout"
  element={<Layout />}
>
  <Route path="/layout/content" element={<Content />} />
  <Route path="/layout/ask" element={<Askquestion />} />
  <Route path="/layout/chat" element={<Chat />} />
  <Route path="/layout/explore" element={<Explore />} />
  <Route path="/layout/explore/:topic" element={<Content />} />
  <Route path="/layout/myqna" element={<Myanswers />} />
  <Route path="/layout/*" element={<Notfound />} />
</Route>

      </Routes>
      <Footer />
    
    </>
  ); 
}

export default App;
