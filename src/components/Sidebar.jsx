import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import logo from "../assets/logo.png";

import "../styles/sidebar.css";

function Sidebar() {

  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
  };

  return (
    <div className="sidebar">

      <div className="sidebar-logo">

        <img
          src={logo}
          alt="OpenShelf"
          className="sidebar-logo-img"
        />

        <h3>OpenShelf</h3>

      </div>

      <ul>

        <li>
          <Link to="/dashboard">
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/resources">
            📚 Resources
          </Link>
        </li>

        <li>
          <Link to="/circulation">
            🔄 Circulation
          </Link>
        </li>

        <li>
          <Link to="/profile">
            👤 Profile
          </Link>
        </li>

        <li>
          <Link to="/digital-library">
            <FaBookOpen />
            &nbsp; Digital Library
          </Link>
        </li>

        {(userRole === "Admin" ||
          userRole === "Librarian") && (
          <li>
            <Link to="/book-management">
              📚 Book Management
            </Link>
          </li>
        )}

        {userRole === "Admin" && (
          <li>
            <Link to="/user-management">
              👥 User Management
            </Link>
          </li>
        )}

        {(userRole === "Admin" ||
          userRole === "Librarian") && (
          <li>
            <Link to="/issue-return">
              🔄 Issue / Return
            </Link>
          </li>
        )}

        <li>
          <Link
            to="/"
            onClick={handleLogout}
          >
            🚪 Logout
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;