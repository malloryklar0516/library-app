import { Link } from "react-router-dom";
// import {Navbar} from "react-bootstrap";
function Header() {
    return (
    <header>
        <h1>Book App</h1>
        <nav className="dropdown">
            <Link to="/" className="headerText">Home</Link>
            <Link to="/signup" className="headerText">Sign Up</Link>
            <Link to="/login" className="headerText">Login</Link>
        </nav>
    </header>
    );
  }

  export default Header;