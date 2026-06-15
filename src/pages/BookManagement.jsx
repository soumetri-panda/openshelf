import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import books from "../data/books";
import "../styles/bookmanagement.css";

function BookManagement() {

  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      <div className="book-management">

        <h2>📚 Book Management</h2>

        <input
          type="text"
          placeholder="Search by title, author or category..."
          className="form-control mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="book-form">

          <input
            type="text"
            placeholder="Book Name"
            className="form-control"
          />

          <input
            type="text"
            placeholder="Author"
            className="form-control"
          />

          <input
            type="text"
            placeholder="Category"
            className="form-control"
          />

          <button className="btn-add">
            Add Book
          </button>

        </div>

        <div className="book-table">

          <table className="table">

            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredBooks.map((book) => (
                <tr key={book.id}>

                  <td>{book.title}</td>

                  <td>{book.author}</td>

                  <td>{book.category}</td>

                  <td>{book.status}</td>

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

export default BookManagement;