import React, {useState} from "react";
// import Search from "../icons/Search";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import Hamburger from "../icons/Hamburger";
import Cancel from "../icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../context/sidebarSlice";
import Logout from "../icons/Logout";                                                            
import Dark from "../icons/Dark";
import Light from "../icons/Light";
import { SidebarData } from "../SidebarData";

const Navbar = () => {



  const open = useSelector((state) => state.sidebar.open);
  const dark = useSelector((state) => state.theme.isDark);
  console.log(dark);
  const dispatch = useDispatch();
  const handleChange = (e) => {};
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  // const history = useHistory();
  return (

    <div
      className=" bg-black text-white]
     top-0 left-0 right-0 z-10 h-[80px] shadow-md  flex items-center justify-between
     px-4
     md:px-20"
    >
      <div className="font-bold text-white  cursor-pointer flex items-center gap-4 text-2xl">
        <div
          onClick={() => dispatch(toggle())}
          className="
          transition-transform   ease-linear
        duration-700 cursor-pointer
        "
        >
          {!open ? <Hamburger /> : <Cancel />}
        </div>
        GitaSoulConnect
      </div>

      

      <div className="flex items-center gap-3">
        {/* {dark ? <Light /> : <Dark />} */}
        {dark ? <Light /> : <Dark />}

        {/* // Logout */}
        <Logout />
        <div className="hidden md:flex items-center gap-5 text-white">
          <div
            className="cursor-pointer text-sm 
          md:text-base "
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/home");
            }}
          >
            Logout
          </div>
          <img
            //onClick={() => navigate("/login")}
            src={
              user?.profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY677t7F_8Epm50xo5OfqI882l5OBOPKRDxDWeGo7OQ&s"
            }
            alt="profile"
            className="
          w-6 h-6
          md:w-7 md:h-7 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
