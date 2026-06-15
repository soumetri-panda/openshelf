import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import users from "../data/users";
import "../styles/usermanagement.css";

function UserManagement() {

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      <div className="user-management">

        <h2>👥 User Management</h2>

        <input
          type="text"
          placeholder="Search Users..."
          className="form-control mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="user-form">

          <input
            type="text"
            placeholder="Full Name"
            className="form-control"
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control"
          />

          <select className="form-control">
            <option>Student</option>
            <option>Faculty</option>
            <option>Librarian</option>
            <option>Admin</option>
          </select>

          <button className="add-user-btn">
            Add User
          </button>

        </div>

        <div className="user-table">

          <table className="table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr key={user.id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>

                    <button className="edit-btn">
                      Edit
                    </button>

                    <button className="delete-btn">
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}

export default UserManagement;