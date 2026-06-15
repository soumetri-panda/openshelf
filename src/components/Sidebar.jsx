import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">

            <h3 className="logo">
                📚 OpenShelf
            </h3>

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
                    <Link to="/">
                        🚪 Logout
                    </Link>
                </li>

                <li>
                    <Link to="/book-management">
                        📚 Book Management
                    </Link>
                </li>

                <li>
                    <Link to="/user-management">
                        👥 User Management
                    </Link>
                </li>

                <li>
                    <Link to="/issue-return">
                        🔄 Issue / Return
                    </Link>
                </li>

            </ul>

        </div>
    );
}

export default Sidebar;