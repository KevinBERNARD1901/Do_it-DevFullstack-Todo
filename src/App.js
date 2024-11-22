import './App.css';
import React, { useState } from 'react';
import { Todos } from './todos';

function App(){
  return(
    <div className="app">
      <main className="content">
        <Todos />
      </main>
    </div>
  );
}

export default App
