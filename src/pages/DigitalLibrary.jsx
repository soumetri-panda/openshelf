import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import digitalResources from "../data/digitalResources";
import "../styles/resources.css";

function DigitalLibrary() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const filteredResources = digitalResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.author.toLowerCase().includes(search.toLowerCase()) ||
      resource.department.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      resource.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <MainLayout>
      <div className="resources-container">
      

        <h2>📚 Digital Library</h2>
        <div className="dashboard-grid">

  <div className="dashboard-card">
    <h4>📘 E-Books</h4>
    <h2>250</h2>
  </div>

  <div className="dashboard-card">
    <h4>📄 Journals</h4>
    <h2>80</h2>
  </div>

  <div className="dashboard-card">
    <h4>📝 Research Papers</h4>
    <h2>120</h2>
  </div>

  <div className="dashboard-card">
    <h4>🎓 Thesis</h4>
    <h2>45</h2>
  </div>

</div>

        <div className="library-filters">

          <input
            type="text"
            placeholder="Search by Title, Author or Department..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="Civil">Civil</option>
          </select>

        </div>

       <div className="book-grid">

  {filteredResources.map((resource) => (

    <div
      className="book-card"
      key={resource.id}
    >

      <div className="book-cover">
        {resource.type === "E-Book" ? "📘" : "📄"}
      </div>

      <h4>{resource.title}</h4>

      <p>{resource.author}</p>

      <p>
        <strong>{resource.department}</strong>
      </p>

      <p>{resource.type}</p>

      <button className="reserve-btn">
        Read Online
      </button>

      <button
        className="reserve-btn"
        style={{ marginTop: "10px" }}
      >
        Download
      </button>

    </div>

  ))}

</div>
      </div>
    </MainLayout>
  );
}

export default DigitalLibrary;