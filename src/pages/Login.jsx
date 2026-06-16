import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Student");

 const handleLogin = () => {

  localStorage.setItem("role", role);

  if (role === "Admin") {
    navigate("/admin-dashboard");
  } else if (role === "Librarian") {
    navigate("/librarian-dashboard");
  } else {
    navigate("/dashboard");
  }
};

  return (
    <div className="login-bg">
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">

          <div className="col-md-5">

            <div className="card shadow-lg border-0 login-card">

              <div className="card-body p-5">

                <h2 className="text-center mb-2 title">
                  OpenShelf
                </h2>

                <p className="text-center text-muted mb-4">
                  Smart Library ERP System
                </p>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>

                <div className="mb-4">
                  <label>Role</label>

                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Student</option>
                    <option>Faculty</option>
                    <option>Librarian</option>
                    <option>Admin</option>
                  </select>
                </div>

                <button
                  className="btn login-btn w-100"
                  onClick={handleLogin}
                >
                  Login
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;