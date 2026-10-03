import "./App.css"
import { useState } from 'react'
import Login from './pages/Auth/Login'
import Register from "./pages/Auth/Register";
import ResetPassword from './pages/Auth/ResetPassword';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState('register')

  const handleResetPassword = form => {
    console.log('Reset Password Attempt:', form);
  };

  return (
    <div className="app-layout">
      <Header onNavigate={setCurrentPage} />

      <main className="main-center-content">
        {currentPage === 'login' ? (
          <Login />
        ) : currentPage === 'reset-password' ? (
          <ResetPassword onResetPassword={handleResetPassword} />
        ) : (
          <Register />
        )}
      </main>

      <Footer />
    </div>
  )

}

export default App;
