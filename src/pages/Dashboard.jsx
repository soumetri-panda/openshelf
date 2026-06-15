import MainLayout from "../layouts/MainLayout";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <MainLayout>

      <div className="dashboard-container">

        <h2>Welcome to OpenShelf 📚</h2>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h4>Borrowed Books</h4>
            <h2>12</h2>
          </div>

          <div className="dashboard-card">
            <h4>Reserved Books</h4>
            <h2>4</h2>
          </div>

          <div className="dashboard-card">
            <h4>Fine Due</h4>
            <h2>₹50</h2>
          </div>

          <div className="dashboard-card">
            <h4>Digital Resources</h4>
            <h2>125</h2>
          </div>

        </div>

        <div className="dashboard-grid mt-4">

          <div className="dashboard-card">
            <h4>Total Books</h4>
            <h2>1200</h2>
          </div>

          <div className="dashboard-card">
            <h4>Available Books</h4>
            <h2>980</h2>
          </div>

          <div className="dashboard-card">
            <h4>Active Users</h4>
            <h2>350</h2>
          </div>

          <div className="dashboard-card">
            <h4>Books Issued</h4>
            <h2>220</h2>
          </div>

        </div>

        <div className="activity-section">

          <h4>Recent Activity</h4>

          <ul>
            <li>📚 Reserved Clean Code</li>
            <li>📖 Borrowed Computer Networks</li>
            <li>💰 Fine Paid ₹50</li>
            <li>📘 New E-book Added</li>
          </ul>

        </div>

        <div className="quick-actions">

          <button className="action-btn">
            Search Books
          </button>

          <button className="action-btn">
            Reserve Book
          </button>

          <button className="action-btn">
            Digital Library
          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;