import MainLayout from "../layouts/MainLayout";
import "../styles/dashboard.css";

function LibrarianDashboard() {
  return (
    <MainLayout>

      <div className="dashboard-container">

        <h2>📚 Librarian Dashboard</h2>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h4>Total Books</h4>
            <h2>1200</h2>
          </div>

          <div className="dashboard-card">
            <h4>Issued Today</h4>
            <h2>35</h2>
          </div>

          <div className="dashboard-card">
            <h4>Returned Today</h4>
            <h2>21</h2>
          </div>

          <div className="dashboard-card">
            <h4>Pending Requests</h4>
            <h2>12</h2>
          </div>

        </div>

        <div className="quick-actions">

          <button className="action-btn">
            Add Book
          </button>

          <button className="action-btn">
            Issue Book
          </button>

          <button className="action-btn">
            Return Book
          </button>

          <button className="action-btn">
            Manage Users
          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default LibrarianDashboard;