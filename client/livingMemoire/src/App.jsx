import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/AppRouter';
import AppRouter from './components/AppRouter';

function App() {
  
  return (
    <div className='app-div'>
      <AppRouter/>
    </div>
  )
}

export default App
