import { useState } from "react";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export default function Form() {
  const [registered, setRegistered] = useState(false)
  if (registered) {
    return <Login />
  }
  return (
    <>
      <Register />
      <button
        onClick={() => {
          setRegistered(true)
        }}
      >
        Login
      </button>
    </>
  );
}