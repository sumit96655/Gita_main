// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";

// import "./SearchBar.css";

// export const SearchBar = ({ setResults }) => {
//   const [input, setInput] = useState("");

//   const fetchData = (value) => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((user) => {
//           return (
//             value &&
//             user &&
//             user.name &&
//             user.name.toLowerCase().includes(value)
//           );
//         });
//         setResults(results);
//       });
//   };

//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value);
//   };

//   return (
//     <div className="input-wrapper ">
//       <FaSearch id="search-icon" />
//       <input
//         placeholder="Type to search..."
//         value={input}
//         onChange={(e) => handleChange(e.target.value)}
//       />
//     </div>
//   );
// };

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchResult } from "./SearchResult"; // Import the SearchResult component
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [results, setInternalResults] = useState([]); // Use internal state to manage results

  const fetchData = async (value) => {
    try {
      const formData = new FormData();
      formData.append('question', value);

      const response = await fetch(`http://127.0.0.1:5000/answer_to/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      if (Array.isArray(json.answer)) {
        setInternalResults(json.answer);
      } else {
        setInternalResults([json.answer]); // Wrap the non-array answer in an array
      }
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
  };

  const renderResults = () => {
    return results.map((result, index) => (
      <div key={index}>
        {/* Assuming 'answer' is a string, render it directly */}
        {result && typeof result.answer === 'string' ? result.answer : ""}
      </div>
    ));
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData(input);
    }
  };

  return (
    <div>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
      </div>

      {/* Render SearchResults */}
      <div>
        {renderResults()}
      </div>
    </div>
  );
};
