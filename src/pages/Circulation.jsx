import MainLayout from "../layouts/MainLayout";
import transactions from "../data/transactions";
import "../styles/circulation.css";

function Circulation() {

  const borrowedBooks = transactions.filter(
    (book) => book.status === "Issued"
  );

  const overdueBooks = transactions.filter(
    (book) => book.status === "Overdue"
  );

  return (
    <MainLayout>

      <div className="circulation-container">

        <h2>📖 Circulation Management</h2>

        <div className="stats-row">

          <div className="stat-card">
            <h4>Borrowed Books</h4>
            <h2>{borrowedBooks.length}</h2>
          </div>

          <div className="stat-card">
            <h4>Overdue Books</h4>
            <h2>{overdueBooks.length}</h2>
          </div>

          <div className="stat-card">
            <h4>Total Fine</h4>
            <h2>
              ₹
              {transactions.reduce(
                (sum, item) => sum + item.fine,
                0
              )}
            </h2>
          </div>

        </div>

        <div className="table-section">

          <table className="table table-striped">

            <thead>

              <tr>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Fine</th>
              </tr>

            </thead>

            <tbody>

              {transactions.map((transaction) => (

                <tr key={transaction.id}>

                  <td>{transaction.book}</td>

                  <td>{transaction.issueDate}</td>

                  <td>{transaction.dueDate}</td>

                  <td>{transaction.status}</td>

                  <td>₹{transaction.fine}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}

export default Circulation;