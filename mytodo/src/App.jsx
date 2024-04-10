import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './Comp/Main'


  
 export default function App() {
  return (
     <div>
      <h1  className="text-black text-5xl font-semibold text-blue-500" > TO DO LIST</h1>
      <br />
     <Main />
     </div>
  )
}



