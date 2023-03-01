import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Animals } from './components/Animals/Animals';
import { Outlet } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { IAnimal } from './models/IAnimal';

function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default App;
