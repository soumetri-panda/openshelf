import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize PostgreSQL client
const databaseUrl = process.env.DATABASE_URL;
let pool = null;
let isMocked = true;

const isConfigured = 
  databaseUrl && 
  databaseUrl !== "postgresql://postgres:your-db-password@db.your-project-id.supabase.co:5432/postgres";

if (isConfigured) {
  try {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false
      }
    });
    // Test database connection
    await pool.query("SELECT NOW()");
    isMocked = false;
    console.log("🔌 Connected directly to Supabase PostgreSQL database successfully.");
  } catch (error) {
    console.error("❌ Failed to connect to Supabase PostgreSQL:", error.message);
    console.log("⚠️ Running in Mock Data Mode fallback.");
  }
} else {
  console.log("⚠️ DATABASE_URL not configured in backend/.env.");
  console.log("⚠️ Running in Mock Data Mode fallback. Define DATABASE_URL to use the real database.");
}

// ==========================================
// MOCK DATA STORAGE (Fallback Mode)
// ==========================================
let mockUsers = [
  { id: 1, student_id: "MCA001", name: "Snehasri Pati", email: "snehasri@openshelf.com", role: "Student", department: "MCA" },
  { id: 2, student_id: "MCA002", name: "Amit Sharma", email: "amit@openshelf.com", role: "Student", department: "MCA" },
  { id: 3, student_id: "MCA003", name: "Pooja Patel", email: "pooja@openshelf.com", role: "Student", department: "MCA" },
  { id: 4, student_id: "FAC001", name: "Ananya Das", email: "ananya@openshelf.com", role: "Faculty", department: "CSE" },
  { id: 5, student_id: "LIB001", name: "Rahul Kumar", email: "rahul@openshelf.com", role: "Librarian", department: "Library" },
  { id: 6, student_id: "ADM001", name: "Admin User", email: "admin@openshelf.com", role: "Admin", department: "Administration" }
];

let mockBooks = [
  { id: 1, title: "Clean Code", author: "Robert Martin", category: "Programming", status: "Available", image_url: "https://images-na.ssl-images-amazon.com/images/I/41xShCOK5mL._SX379_BO1,204,203,200_.jpg" },
  { id: 2, title: "Computer Networks", author: "Forouzan", category: "Networking", status: "Available", image_url: "https://images-na.ssl-images-amazon.com/images/I/51-P-H3r6FL._SX383_BO1,204,203,200_.jpg" },
  { id: 3, title: "Database System Concepts", author: "Korth", category: "Database", status: "Issued", image_url: "https://images-na.ssl-images-amazon.com/images/I/51%2B1eT1rYxL._SX384_BO1,204,203,200_.jpg" },
  { id: 4, title: "Java Complete Reference", author: "Herbert Schildt", category: "Programming", status: "Available", image_url: "https://images-na.ssl-images-amazon.com/images/I/514mS%2B2aP1L._SX382_BO1,204,203,200_.jpg" }
];

let mockDigitalResources = [
  { id: 1, title: "Database Management System", author: "Korth", department: "CSE", type: "E-Book", file_url: "#" },
  { id: 2, title: "Computer Networks", author: "Forouzan", department: "CSE", type: "E-Book", file_url: "#" },
  { id: 3, title: "Thermodynamics", author: "P.K. Nag", department: "CSE", type: "E-Book", file_url: "#" },
  { id: 4, title: "Machine Design", author: "R.S. Khurmi", department: "ECE", type: "Journal", file_url: "#" },
  { id: 5, title: "Digital Electronics", author: "Morris Mano", department: "ECE", type: "E-Book", file_url: "#" },
  { id: 6, title: "Structural Analysis", author: "R.C. Hibbeler", department: "Civil", type: "Research Paper", file_url: "#" }
];

let mockTransactions = [
  { id: 1, student_id: "MCA001", book_id: 1, book_title: "Clean Code", issue_date: "2026-06-14", due_date: "2026-06-28", status: "Issued", fine: 0 },
  { id: 2, student_id: "MCA002", book_id: 4, book_title: "Java Complete Reference", issue_date: "2026-06-10", due_date: "2026-06-24", status: "Returned", fine: 0 },
  { id: 3, student_id: "MCA003", book_id: 3, book_title: "Database System Concepts", issue_date: "2026-06-05", due_date: "2026-06-19", status: "Overdue", fine: 50 }
];

// Helper to format date (YYYY-MM-DD)
const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// ==========================================
// API ROUTES
// ==========================================

// 1. AUTHENTICATION ROUTE
app.post("/api/auth/login", async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Email and role are required" });
  }

  if (isMocked) {
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
    );
    if (user) {
      return res.json(user);
    }
    return res.status(401).json({ error: "Invalid credentials" });
  } else {
    try {
      const resDb = await pool.query(
        "SELECT * FROM public.users WHERE LOWER(email) = LOWER($1) AND role = $2 LIMIT 1",
        [email, role]
      );
      
      const user = resDb.rows[0];
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

// 2. BOOKS ROUTES
app.get("/api/books", async (req, res) => {
  if (isMocked) {
    return res.json(mockBooks);
  } else {
    try {
      const resDb = await pool.query("SELECT * FROM public.books ORDER BY id ASC");
      return res.json(resDb.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.post("/api/books", async (req, res) => {
  const { title, author, category, image_url } = req.body;

  if (!title || !author || !category) {
    return res.status(400).json({ error: "Title, author, and category are required" });
  }

  const defaultImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2787&auto=format&fit=crop";

  if (isMocked) {
    const newBook = {
      id: mockBooks.length > 0 ? Math.max(...mockBooks.map((b) => b.id)) + 1 : 1,
      title,
      author,
      category,
      status: "Available",
      image_url: image_url || defaultImage
    };
    mockBooks.push(newBook);
    return res.status(201).json(newBook);
  } else {
    try {
      const resDb = await pool.query(
        "INSERT INTO public.books (title, author, category, status, image_url) VALUES ($1, $2, $3, 'Available', $4) RETURNING *",
        [title, author, category, image_url || defaultImage]
      );
      return res.status(201).json(resDb.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, category, status, image_url } = req.body;

  if (isMocked) {
    const bookIdx = mockBooks.findIndex((b) => b.id === parseInt(id));
    if (bookIdx === -1) return res.status(404).json({ error: "Book not found" });

    mockBooks[bookIdx] = {
      ...mockBooks[bookIdx],
      title: title !== undefined ? title : mockBooks[bookIdx].title,
      author: author !== undefined ? author : mockBooks[bookIdx].author,
      category: category !== undefined ? category : mockBooks[bookIdx].category,
      status: status !== undefined ? status : mockBooks[bookIdx].status,
      image_url: image_url !== undefined ? image_url : mockBooks[bookIdx].image_url
    };
    return res.json(mockBooks[bookIdx]);
  } else {
    try {
      const resDb = await pool.query(
        "UPDATE public.books SET title = COALESCE($1, title), author = COALESCE($2, author), category = COALESCE($3, category), status = COALESCE($4, status), image_url = COALESCE($5, image_url) WHERE id = $6 RETURNING *",
        [title, author, category, status, image_url, id]
      );
      return res.json(resDb.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;

  if (isMocked) {
    const bookIdx = mockBooks.findIndex((b) => b.id === parseInt(id));
    if (bookIdx === -1) return res.status(404).json({ error: "Book not found" });

    mockBooks.splice(bookIdx, 1);
    return res.json({ message: "Book deleted successfully" });
  } else {
    try {
      await pool.query("DELETE FROM public.books WHERE id = $1", [id]);
      return res.json({ message: "Book deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

// 3. USERS ROUTES
app.get("/api/users", async (req, res) => {
  if (isMocked) {
    return res.json(mockUsers);
  } else {
    try {
      const resDb = await pool.query("SELECT * FROM public.users ORDER BY id ASC");
      return res.json(resDb.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.post("/api/users", async (req, res) => {
  const { student_id, name, email, role, department } = req.body;

  if (!student_id || !name || !email || !role || !department) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isMocked) {
    const newIdx = mockUsers.length > 0 ? Math.max(...mockUsers.map((u) => u.id)) + 1 : 1;
    const newUser = { id: newIdx, student_id, name, email, role, department };
    mockUsers.push(newUser);
    return res.status(201).json(newUser);
  } else {
    try {
      const resDb = await pool.query(
        "INSERT INTO public.users (student_id, name, email, role, department) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [student_id, name, email, role, department]
      );
      return res.status(201).json(resDb.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { student_id, name, email, role, department } = req.body;

  if (isMocked) {
    const userIdx = mockUsers.findIndex((u) => u.id === parseInt(id));
    if (userIdx === -1) return res.status(404).json({ error: "User not found" });

    mockUsers[userIdx] = {
      ...mockUsers[userIdx],
      student_id: student_id !== undefined ? student_id : mockUsers[userIdx].student_id,
      name: name !== undefined ? name : mockUsers[userIdx].name,
      email: email !== undefined ? email : mockUsers[userIdx].email,
      role: role !== undefined ? role : mockUsers[userIdx].role,
      department: department !== undefined ? department : mockUsers[userIdx].department
    };
    return res.json(mockUsers[userIdx]);
  } else {
    try {
      const resDb = await pool.query(
        "UPDATE public.users SET student_id = COALESCE($1, student_id), name = COALESCE($2, name), email = COALESCE($3, email), role = COALESCE($4, role), department = COALESCE($5, department) WHERE id = $6 RETURNING *",
        [student_id, name, email, role, department, id]
      );
      return res.json(resDb.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  if (isMocked) {
    const userIdx = mockUsers.findIndex((u) => u.id === parseInt(id));
    if (userIdx === -1) return res.status(404).json({ error: "User not found" });

    mockUsers.splice(userIdx, 1);
    return res.json({ message: "User deleted successfully" });
  } else {
    try {
      await pool.query("DELETE FROM public.users WHERE id = $1", [id]);
      return res.json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

// 4. CIRCULATION/TRANSACTIONS ROUTES
app.get("/api/circulation", async (req, res) => {
  if (isMocked) {
    return res.json(mockTransactions);
  } else {
    try {
      const resDb = await pool.query(`
        SELECT t.id, t.student_id, t.book_id, t.issue_date, t.due_date, t.status, t.fine, b.title as book_title
        FROM public.transactions t
        LEFT JOIN public.books b ON t.book_id = b.id
        ORDER BY t.id ASC
      `);

      // Format date fields for React UI
      const formatted = resDb.rows.map((t) => ({
        id: t.id,
        student_id: t.student_id,
        book_id: t.book_id,
        book_title: t.book_title || "Unknown Book",
        issue_date: formatDate(t.issue_date),
        due_date: formatDate(t.due_date),
        status: t.status,
        fine: t.fine
      }));

      return res.json(formatted);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.get("/api/circulation/stats", async (req, res) => {
  if (isMocked) {
    const borrowed = mockTransactions.filter((t) => t.status === "Issued").length;
    const overdue = mockTransactions.filter((t) => t.status === "Overdue").length;
    const totalFine = mockTransactions.reduce((sum, t) => sum + t.fine, 0);
    const totalBooks = mockBooks.length;
    const availableBooks = mockBooks.filter((b) => b.status === "Available").length;
    const activeUsers = mockUsers.length;
    const booksIssued = mockTransactions.filter((t) => t.status === "Issued" || t.status === "Overdue").length;

    return res.json({
      borrowedCount: borrowed,
      overdueCount: overdue,
      totalFine,
      totalBooks,
      availableBooks,
      activeUsers,
      booksIssued
    });
  } else {
    try {
      const txRes = await pool.query("SELECT status, fine FROM public.transactions");
      const bkCount = await pool.query("SELECT COUNT(*) FROM public.books");
      const avCount = await pool.query("SELECT COUNT(*) FROM public.books WHERE status = 'Available'");
      const usCount = await pool.query("SELECT COUNT(*) FROM public.users");

      const txs = txRes.rows;
      const borrowed = txs.filter((t) => t.status === "Issued").length;
      const overdue = txs.filter((t) => t.status === "Overdue").length;
      const totalFine = txs.reduce((sum, t) => sum + (parseInt(t.fine) || 0), 0);
      const booksIssued = txs.filter((t) => t.status === "Issued" || t.status === "Overdue").length;

      return res.json({
        borrowedCount: borrowed,
        overdueCount: overdue,
        totalFine,
        totalBooks: parseInt(bkCount.rows[0].count) || 0,
        availableBooks: parseInt(avCount.rows[0].count) || 0,
        activeUsers: parseInt(usCount.rows[0].count) || 0,
        booksIssued
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.post("/api/circulation/issue", async (req, res) => {
  const { studentId, bookId } = req.body;

  if (!studentId || !bookId) {
    return res.status(400).json({ error: "studentId and bookId are required" });
  }

  if (isMocked) {
    const user = mockUsers.find((u) => u.student_id === studentId);
    if (!user) return res.status(404).json({ error: "Student not found" });

    const book = mockBooks.find((b) => b.id === parseInt(bookId));
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.status !== "Available") return res.status(400).json({ error: "Book is not available for issue" });

    book.status = "Issued";

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 14);

    const newTx = {
      id: mockTransactions.length > 0 ? Math.max(...mockTransactions.map((t) => t.id)) + 1 : 1,
      student_id: studentId,
      book_id: parseInt(bookId),
      book_title: book.title,
      issue_date: formatDate(issueDate),
      due_date: formatDate(dueDate),
      status: "Issued",
      fine: 0
    };
    mockTransactions.push(newTx);

    return res.status(201).json(newTx);
  } else {
    try {
      // 1. Verify Student
      const userRes = await pool.query("SELECT * FROM public.users WHERE student_id = $1", [studentId]);
      if (userRes.rows.length === 0) {
        return res.status(404).json({ error: "Student ID not found in database" });
      }

      // 2. Verify Book
      const bookRes = await pool.query("SELECT * FROM public.books WHERE id = $1", [bookId]);
      if (bookRes.rows.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      const book = bookRes.rows[0];
      if (book.status !== "Available") {
        return res.status(400).json({ error: "Book is not available for issue" });
      }

      // 3. Update Book Status to Issued
      await pool.query("UPDATE public.books SET status = 'Issued' WHERE id = $1", [bookId]);

      // 4. Create Transaction
      const issueDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(issueDate.getDate() + 14);

      const txRes = await pool.query(
        "INSERT INTO public.transactions (student_id, book_id, issue_date, due_date, status, fine) VALUES ($1, $2, $3, $4, 'Issued', 0) RETURNING *",
        [studentId, parseInt(bookId), formatDate(issueDate), formatDate(dueDate)]
      );

      const transaction = txRes.rows[0];
      transaction.book_title = book.title;

      return res.status(201).json(transaction);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.post("/api/circulation/return", async (req, res) => {
  const { studentId, bookId } = req.body;

  if (!studentId || !bookId) {
    return res.status(400).json({ error: "studentId and bookId are required" });
  }

  if (isMocked) {
    const tx = mockTransactions.find(
      (t) => t.student_id === studentId && t.book_id === parseInt(bookId) && (t.status === "Issued" || t.status === "Overdue")
    );
    if (!tx) return res.status(404).json({ error: "No active issue record found for this student and book" });

    const book = mockBooks.find((b) => b.id === parseInt(bookId));
    if (book) book.status = "Available";

    tx.status = "Returned";
    
    return res.json(tx);
  } else {
    try {
      // 1. Find active transaction
      const txRes = await pool.query(
        "SELECT * FROM public.transactions WHERE student_id = $1 AND book_id = $2 AND status IN ('Issued', 'Overdue') ORDER BY id DESC LIMIT 1",
        [studentId, bookId]
      );

      if (txRes.rows.length === 0) {
        return res.status(404).json({ error: "No active issue transaction found for this student and book" });
      }
      const tx = txRes.rows[0];

      // 2. Update Book Status to Available
      await pool.query("UPDATE public.books SET status = 'Available' WHERE id = $1", [bookId]);

      // 3. Update Transaction to Returned
      const updRes = await pool.query(
        "UPDATE public.transactions SET status = 'Returned' WHERE id = $1 RETURNING *",
        [tx.id]
      );

      return res.json(updRes.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

// 5. DIGITAL RESOURCES ROUTES
app.get("/api/digital-resources", async (req, res) => {
  if (isMocked) {
    return res.json(mockDigitalResources);
  } else {
    try {
      const resDb = await pool.query("SELECT * FROM public.digital_resources ORDER BY id ASC");
      return res.json(resDb.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

app.get("/api/digital-resources/counts", async (req, res) => {
  if (isMocked) {
    const ebooks = mockDigitalResources.filter((r) => r.type === "E-Book").length;
    const journals = mockDigitalResources.filter((r) => r.type === "Journal").length;
    const papers = mockDigitalResources.filter((r) => r.type === "Research Paper").length;
    const thesis = mockDigitalResources.filter((r) => r.type === "Thesis").length;

    return res.json({ ebooks, journals, papers, thesis });
  } else {
    try {
      const resDb = await pool.query("SELECT type FROM public.digital_resources");
      const data = resDb.rows;

      const ebooks = data.filter((r) => r.type === "E-Book").length;
      const journals = data.filter((r) => r.type === "Journal").length;
      const papers = data.filter((r) => r.type === "Research Paper").length;
      const thesis = data.filter((r) => r.type === "Thesis").length;

      return res.json({ ebooks, journals, papers, thesis });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
});
