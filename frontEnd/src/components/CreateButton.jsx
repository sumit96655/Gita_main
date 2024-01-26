import React from "react";
import Add from "../icons/Add";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";


const CreateButton = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  return (
    <div
      onClick={() => navigate("/layout/ask")}
      className="flex items-center gap-2 bg-purple-700 rounded-md shadow-sm px-8 py-2 my-5 cursor-pointer"
    >
      <Add />
      <span className="text-white">Start a New Topic</span>
    </div>
  );
};

export default CreateButton;
