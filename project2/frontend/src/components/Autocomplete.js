// src/components/Autocomplete.js
import React from 'react';

function Autocomplete({ suggestions }) {
  return (
    <ul>
      {suggestions.map((word, index) => (
        <li key={index}>{word}</li>
      ))}
    </ul>
  );
}

export default Autocomplete;
