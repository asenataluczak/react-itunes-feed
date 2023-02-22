import React from 'react';
import './App.scss';
import Album from "./Album";

function App() {
    const feed = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  return (
    <div className="App">
      <header className="App-header">
        <h1>iTunes top 100 albums</h1>
      </header>
        <Album feed={feed}></Album>
    </div>
  );
}

export default App;
