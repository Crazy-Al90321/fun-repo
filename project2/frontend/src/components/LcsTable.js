// src/components/LcsTable.js
import React from 'react';

function LcsTable({ table }) {
  return (
    <div>
      <h2>LCS Table</h2>
      <table border="1">
        <tbody>
          {table.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LcsTable;
