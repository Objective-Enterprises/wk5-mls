import "./Header.css"

function Header({ onNavigate }) {
  const isAuthenticated = false;

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="title">ThreadHive</h1>
      </div>
      <nav className="header-right" aria-label="Authentication">
        {isAuthenticated ? (
          <button type="button" onClick={() => onNavigate('login')}>
            Logout
          </button>
        ) : (
          <>
            <button type="button" onClick={() => onNavigate('login')}>
              Login
            </button>
            <button type="button" onClick={() => onNavigate('register')}>
              Register
            </button>
            <button type="button" onClick={() => onNavigate('reset-password')}>
              Forgot Password
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;