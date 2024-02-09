import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchResult } from "./SearchResult"; // Import the SearchResult component
import "./SearchBar.css";
import "./loader.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [results, setInternalResults] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const fetchData = async (value) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("question", value);

      const response = await fetch(`http://127.0.0.1:5000/search_chapter/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      if (Array.isArray(json.answer)) {
        setInternalResults(json.answer);
      } else {
        setInternalResults([json.answer]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      setLoading(false);
    }
  };

  const renderResults = () => {
    return results.map((result, index) => (
      <div key={index} className="bg-slate-600 p-6 rounded-lg text-white mt-5">
        {result && typeof result.answer === "string" ? result.answer : ""}
      </div>
    ));
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchData(input);
    }
  };

  return (
    <div>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          className="S-input"
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
      </div>
      <div>
        {/* Render search results or loader based on loading state */}
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <div className="jimu-primary-loading"></div>
            </div>
          </div>
        ) : (
          renderResults()
        )}
      </div>
    </div>
  );
};
