import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import logo from "../assets/logo.png";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* Navbar */}
      <nav className="landing-navbar">

        <div className="landing-logo">
          <img src={logo} alt="OpenShelf Logo" />
          <span>OpenShelf</span>
        </div>

        <div className="nav-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => navigate("/login")}
          >
            Sign Up
          </button>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="hero-section">

        <h1>
          The Future of Library Management
        </h1>

        <p>
          OpenShelf brings modern technology to academic
          libraries. Manage books, digital resources,
          circulation, and users through one unified
          platform.
        </p>

        <div className="hero-buttons">

          <button
            className="explore-btn"
            onClick={() => navigate("/login")}
          >
            Explore Demo
          </button>

           <button
            className="more-btn"
            onClick={() => navigate("/login")}
          >
            Know More
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

        </div>

      </section>

      {/* Features */}
      <section className="features-section">

        <div className="feature-card">
          <h3>📚 Digital Catalog</h3>
          <p>Search and manage books instantly</p>
        </div>

        <div className="feature-card">
          <h3>🔄 Smart Circulation</h3>
          <p>Issue, Return and Reserve books</p>
        </div>

        <div className="feature-card">
          <h3>📊 Analytics</h3>
          <p>Library insights and reports</p>
        </div>

        <div className="feature-card">
          <h3>💻 Digital Library</h3>
          <p>E-books, Journals and Thesis</p>
        </div>

        <div className="feature-card">
          <h3>👥 Multi-Role Access</h3>
          <p>Student, Faculty, Librarian, Admin</p>
        </div>

        <div className="feature-card">
          <h3>🔐 Secure Access</h3>
          <p>Role-based authentication system</p>
        </div>

      </section>

      {/* Statistics */}
      <section className="stats-section">

        <div className="stat-card">
          <h2>5000+</h2>
          <p>Books</p>
        </div>

        <div className="stat-card">
          <h2>1200+</h2>
          <p>Digital Resources</p>
        </div>

        <div className="stat-card">
          <h2>350+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>System Availability</p>
        </div>

      </section>

      {/* Footer */}
      <footer className="landing-footer">

        <h3>OpenShelf Library ERP</h3>

        <p>
          Built using React.js • Node.js • Express.js • PostgreSQL
        </p>

      </footer>

    </div>
  );
}

export default Landing;