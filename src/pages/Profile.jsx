import MainLayout from "../layouts/MainLayout";

function Profile() {
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

          <h4>Name : Student User</h4>

          <h4>Email : student@openshelf.com</h4>

          <h4>Role : Student</h4>

          <h4>Department : MCA</h4>

          <button
            className="btn btn-primary mt-3"
          >
            Edit Profile
          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default Profile;