import MainLayout from "../layouts/MainLayout";
import transactions from "../data/transactions";
import "../styles/issuereturn.css";

function IssueReturn() {
  return (
    <MainLayout>

      <div className="issue-return-container">

        <h2>📖 Issue & Return Books</h2>

        <div className="issue-form">

          <input
            type="text"
            placeholder="Student ID"
            className="form-control"
          />

          <input
            type="text"
            placeholder="Book ID"
            className="form-control"
          />

          <button className="issue-btn">
            Issue Book
          </button>

          <button className="return-btn">
            Return Book
          </button>

        </div>

        <div className="records-table">

          <table className="table">

            <thead>
              <tr>
                <th>Student</th>
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

                  <td>{transaction.student}</td>

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

export default IssueReturn;