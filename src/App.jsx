import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [Password, setPassword] = useState('')
  const [length , setlength] = useState(8)
  const [numbersAllowed , setnumbersAllowed] = useState(false)
  const [charAllowed , setcharAllowed] = useState(false)

  // generate password
  const passwordGenerator = useCallback(()=>{
    let str = ""
    let pass = ''
    str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbersAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numbersAllowed,charAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numbersAllowed, charAllowed])

  // useRef hook and copy function

  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current.select()
window.navigator.clipboard.writeText(Password)
  },[Password])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <div>
          <h1 className='text-white text-center my-3'>
            Password Generator
          </h1>
        </div>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          className="outline-none w-full py-1 px-3"
          readOnly
          value={Password}
          ref={passwordRef}
           />
           <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer'
            onClick={copyPasswordToClipboard}
           >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={8}
          max={25}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setlength(e.target.value)}
          />
          <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numbersAllowed}
          onClick={()=>setnumbersAllowed(prev=>!prev)}
           />
          <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          onClick={()=>setcharAllowed(prev=>!prev)}
           />
          <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
