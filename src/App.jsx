import "./App.css"
import { useState } from 'react'
import Login from './pages/Auth/Login'
import Register from "./pages/Auth/Register";
import Form from "./components/Form";

function App() {
  const [registered, setRegistered] = useState(false)
  console.log(registered)

  return (
    <div className="app-layout">

      <Form />

      {/* {registered
        ? <Login />
        : <Register />}

      <button
        onClick={() => {
          setRegistered(true)
        }}
      >
        Login
      </button> */}
    </div>
  )

}

export default App;
