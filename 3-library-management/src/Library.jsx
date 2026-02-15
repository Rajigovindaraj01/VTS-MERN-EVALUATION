import React, { useState, useEffect } from "react";
import "./Library.css";

function Library({ user, onLogout }) {
  const storageKey = `books_${user.username}`;
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem(storageKey));
    if (storedBooks) setBooks(storedBooks);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(books));
  }, [books, storageKey]);

  const addBook = () => {
    if (!title || !author) return alert("Fill all fields");

    const duplicate = books.find(
      (b) => b.title.toLowerCase() === title.toLowerCase()
    );
    if (duplicate) return alert("Duplicate title not allowed");

    setBooks([...books, { title, author, available: true }]);
    setTitle("");
    setAuthor("");
  };

  const borrowBook = (title) => {
    setBooks(
      books.map((b) =>
        b.title === title ? { ...b, available: false } : b
      )
    );
  };

  const returnBook = (title) => {
    setBooks(
      books.map((b) =>
        b.title === title ? { ...b, available: true } : b
      )
    );
  };

  const availableBooks = books.filter((b) => b.available);
  const borrowedBooks = books.filter((b) => !b.available);

  return (
    <div className="library-container">
      <div className="top-bar">
        <h2>Welcome, {user.username} 👋</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="form-section">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="add-btn" onClick={addBook}>
          Add
        </button>
      </div>

      <div className="book-section">
        <h3>Available Books</h3>
        {availableBooks.map((book, index) => (
          <div key={index} className="book-card">
            <span>{book.title} - {book.author}</span>
            <button className="borrow-btn" onClick={() => borrowBook(book.title)}>
              Borrow
            </button>
          </div>
        ))}
      </div>

      <div className="book-section">
        <h3>Borrowed Books</h3>
        {borrowedBooks.map((book, index) => (
          <div key={index} className="book-card">
            <span>{book.title} - {book.author}</span>
            <button className="return-btn" onClick={() => returnBook(book.title)}>
              Return
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
