import MainLayout from "../layouts/MainLayout";
import "../styles/dashboard.css";

function AdminDashboard() {
  return (
    <MainLayout>

      <div className="dashboard-container">

        <h2>⚙️ Admin Dashboard</h2>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h4>Total Books</h4>
            <h2>1200</h2>
          </div>

          <div className="dashboard-card">
            <h4>Total Students</h4>
            <h2>850</h2>
          </div>

          <div className="dashboard-card">
            <h4>Total Faculty</h4>
            <h2>75</h2>
          </div>

          <div className="dashboard-card">
            <h4>Total Librarians</h4>
            <h2>5</h2>
          </div>

          <div className="dashboard-card">
            <h4>Books Issued</h4>
            <h2>220</h2>
          </div>

          <div className="dashboard-card">
            <h4>Fine Revenue</h4>
            <h2>₹12,500</h2>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default AdminDashboard;