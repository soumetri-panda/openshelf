import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import bookService from "../services/bookService";
import circulationService from "../services/circulationService";
import "../styles/resources.css";

function Resources() {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    booksIssued: 0,
    activeUsers: 0
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        const [booksData, statsData] = await Promise.all([
          bookService.getBooks(),
          circulationService.getStats()
        ]);
        setBooks(booksData);
        setStats(statsData);
      } catch (err) {
        console.error("Error loading resources:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResourcesData();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(search.toLowerCase()) ||
    book.author?.toLowerCase().includes(search.toLowerCase()) ||
    book.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      <div className="resources-container">

        <h2>📚 OpenShelf Resources</h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading Physical Resources...</p>
          </div>
        ) : (
          <>
            {/* Stats */}

            <div className="resource-stats">

              <div className="stat-box">
                <h3>{stats.totalBooks}</h3>
                <p>Total Books</p>
              </div>

              <div className="stat-box">
                <h3>{stats.availableBooks}</h3>
                <p>Available</p>
              </div>

              <div className="stat-box">
                <h3>{stats.booksIssued}</h3>
                <p>Issued</p>
              </div>

              <div className="stat-box">
                <h3>{stats.activeUsers}</h3>
                <p>Active Readers</p>
              </div>

            </div>

            {/* Search */}

            <div className="search-box">

              <input
                type="text"
                placeholder="Search by Title, Author or Category..."
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* Books */}

            <div className="book-grid">

              {filteredBooks.map((book) => (

                <div
                  className="book-card"
                  key={book.id}
                >

                  <img
                    src={book.image_url || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2787&auto=format&fit=crop"}
                    alt={book.title}
                    className="book-cover"
                  />

                  <h4>{book.title}</h4>

                  <p>{book.author}</p>

                  <div className="category-badge">
                    {book.category}
                  </div>

                  <span
                    className={`status-pill ${
                      book.status === "Available"
                        ? "available"
                        : "issued"
                    }`}
                  >
                    {book.status}
                  </span>

                  <button className="reserve-btn">
                    Reserve
                  </button>

                </div>

              ))}

            </div>
          </>
        )}

      </div>

    </MainLayout>
  );
}

export default Resources;