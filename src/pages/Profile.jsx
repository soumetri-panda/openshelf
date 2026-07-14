import MainLayout from "../layouts/MainLayout";
import authService from "../services/authService";

function Profile() {
  const currentUser = authService.getCurrentUser() || {
    name: "Student User",
    email: "student@openshelf.com",
    role: "Student",
    department: "MCA"
  };

  return (
    <MainLayout>

      <div
        style={{
          minHeight: "100vh",
          padding: "30px",
          background:
            "linear-gradient(135deg,#dceeff,#ffd6e7)"
        }}
      >

        <h2>👤 My Profile</h2>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            marginTop: "20px"
          }}
        >

          <h4>Name : {currentUser.name}</h4>

          <h4 className="mt-3">Email : {currentUser.email}</h4>

          <h4 className="mt-3">Role : {currentUser.role}</h4>

          <h4 className="mt-3">Department : {currentUser.department || "N/A"}</h4>

          <button
            className="btn btn-primary mt-4"
          >
            Edit Profile
          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default Profile;