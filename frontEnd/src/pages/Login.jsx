import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import backgroundImage from './bg16.jpg';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    const user = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        user
      );
      if (res.status === 200 && res.data) {
        //successful login         
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/SearchVerse");
        toast.success("Logged in successfully");
      } else {
        toast.error("User does not exist");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Something went wrong, please try again!");
      }
    }
  };
  const setBackgroundImage = () => {
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      
      backgroundPosition: 'center',
    };
    return backgroundStyle;
  }

  return (
    <div className="h-screen w-screen " style={setBackgroundImage()}>
      <Toaster />
      <div
        className=" flex flex-col min-h-screen pt-6 
      sm:pl-60 sm:pt-28"
      >
        <div className="mt-12 md:mt-0">
          <a href="/">
            <h3 className="protest-riot-regular text-5xl font-bold text-gray-950 pl-40">
              Login
            </h3>
          </a>
        </div>
        <div
          className="w-[90%] md:w-full bg-slate-700 fill-transparent
           border
          px-6 py-4 mt-6 overflow-hidden
         shadow-md sm:max-w-md rounded-lg"
        >
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium 
                text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="border border-gray-200 mt-2 w-full h-10 px-3 rounded 
                    outline-none 
                       shadow-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm 
                font-medium text-white "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border border-gray-200 mt-2 w-full h-10 px-3 rounded 
                    outline-none 
                       shadow-sm"
              />
            </div>

            <div className="mt-8 flex flex-col items-center justify-center ">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-xs font-semibold 
                tracking-widest 
                text-white uppercase transition duration-150 ease-in-out 
                bg-gray-950 border border-transparent rounded-md 
                active:bg-gray-700 false"
              >
                Login
              </button>
              <a
                className="text-sm text-gray-100 underline hover:text-gray-900 pt-2"
                href="/register"
              >
                Don't have an account? Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
