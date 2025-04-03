// src/App.js
import React, { useState } from 'react';
import Autocomplete from './components/Autocomplete'; // Import Autocomplete component
import LcsTable from './components/LcsTable'; // Import LcsTable component
import axios from 'axios';

function App() {
  const [query, setQuery] = useState(''); // User's input
  const [suggestions, setSuggestions] = useState([]); // Suggestions for autocomplete
  const [lcsTable, setLcsTable] = useState([]); // LCS Table (for visualizing dynamic programming table)

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Fetch autocomplete suggestions from backend (API)
    if (newQuery.length > 1) {
      axios
        .get(`http://localhost:5000/api/autocomplete?query=${newQuery}`)
        .then((response) => {
          setSuggestions(response.data); // Set autocomplete suggestions
        })
        .catch((error) => console.error("Error fetching suggestions:", error));
    } else {
      setSuggestions([]); // Clear suggestions if query is too short
    }
  };

  const handleLcsCalculation = () => {
    // Example LCS calculation (this should be based on your logic)
    const seq1 = "apple";
    const seq2 = "applepie";
    const dpTable = calculateLcs(seq1, seq2);
    setLcsTable(dpTable);
  };

  const calculateLcs = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    return dp; // Return the DP table
  };

  return (
    <div>
      <h1>Autocomplete and LCS Table</h1>

      {/* Autocomplete Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />

      {/* Display Autocomplete Suggestions */}
      <Autocomplete suggestions={suggestions} />

      {/* Button to calculate and show LCS Table */}
      <button onClick={handleLcsCalculation}>Calculate LCS</button>

      {/* Display LCS Table */}
      {lcsTable.length > 0 && <LcsTable table={lcsTable} />}
    </div>
  );
}

export default App;
