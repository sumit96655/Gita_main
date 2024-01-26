// import React from 'react';
// import { Link } from 'react-router-dom';
// import App2 from '../App2'
// // import Index2 from '../Index2';
// import { useNavigate } from 'react-router-dom';
// import Content from '../components/Content';


// function DiscussionForum() {
//   const navigate= useNavigate();
//   return (
    
//    navigate("/content")
      
    
//   )
// }

// export default DiscussionForum
// import React, { useEffect, useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useLocation,
// } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { io } from 'socket.io-client';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet } from 'react-router-dom';
// // import Navbar from '../Navbar';
// import Sidebar from '../components/Sidebar';
// import CreateButton from '../components/CreateButton';
// import { addUsers } from '../context/onlineSlice';

// const queryClient = new QueryClient();

// console.log('Connecting socket...');
// export const socket = io('http://localhost:3000', {
//   withCredentials: true,
//   secure: true,
// });
// console.log('Socket:', socket);

// const Layout = () => {
//   const [users, setUsers] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     console.log('User:', user);
//     if (!user) {
//       window.location.href = '/login';
      
//     }

    

//     socket.connect();
//     socket.on('connect', () => {
//       console.log('socket connected');
//     });
//     socket.auth = user;


//     socket.on('user-connected', (users) => {
//       console.log('users connected', users);
//       dispatch(addUsers(users));
//     });

//     socket.on('user-disconnected', (users) => {
//       console.log('users', users);
//       dispatch(addUsers(users));
//     });

//     const getUsers = async () => {
//       const res = await axios.get('http://localhost:5000/allusers');
//       setUsers(res.data);
//       console.log('Fetched users:', res.data);

//     };
//     getUsers();
//   }, [socket]);

//   // const addUsers = (users) => {
//   //   // Your implementation here
//   // };

//   return (
//     <QueryClientProvider client={queryClient} contextSharing={true}>
//       <div className="fixed">
//         {/* <Navbar /> */}
//         <div className="w-screen h-screen flex justify-center items-start px-4 md:px-12 pt-12 ">
//           <Sidebar />
//           <Outlet />
//           <div className="right-section hidden md:block h-80 fixed z-10 top-24 right-28">
//             <CreateButton />
//             <div className="mt-8 py-4 px-3 rounded-md flex flex-col items-start gap-5">
//               <h2 className="text-gray-600 font-bold text-start">Top Users</h2>
//               {users.length > 0 &&
//                 users.slice(0, 5).map((user, index) => {
//                   console.log('user', user);
//                   return (
//                     <div className="flex items-center cursor-pointer" key={index}>
//                       <img
//                         src={user?.profileImage}
//                         alt="profile"
//                         className="w-6 h-6 rounded-full mr-2"
//                       />
//                       <h3 className="text-xs">{user.name}</h3>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </QueryClientProvider>
//   );
// };

// export default Layout;

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function DiscussionForum() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/layout/content');
  }, [navigate]);

  // Render any additional content or return null

  return null;
}

export default DiscussionForum;
