import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import books from "../data/books";
import "../styles/resources.css";

function Resources() {

  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      <div className="resources-container">

        <h2>📚 OpenShelf Resources</h2>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search Books..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="book-grid">

          {filteredBooks.map((book) => (

            <div
              className="book-card"
              key={book.id}
            >

              <div className="book-cover">
                📘
              </div>

              <h4>{book.title}</h4>

              <p>{book.author}</p>

              <p>
                <strong>
                  {book.category}
                </strong>
              </p>

              <span
                className={
                  book.status === "Available"
                    ? "available"
                    : "issued"
                }
              >
                {book.status}
              </span>

              <button className="reserve-btn">
                Reserve
              </button>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default Resources;