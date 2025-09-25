import { createContext, useContext, useEffect, useState } from "react";
import { BookContext } from "./BookContext";

export const IssueContext = createContext();

export const IssueProvider = ({ children }) => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const { decrementBookCopy, incrementBookCopy } = useContext(BookContext);

  // Load issued books from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("issuedBooks");
    if (stored) {
      setIssuedBooks(JSON.parse(stored));
    }
  }, []);

  // Save issued books whenever they change
  useEffect(() => {
    localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));
  }, [issuedBooks]);

  // ✅ Issue a new book
  const issueBook = (bookData) => {
    if (bookData.remainingCopies <= 0) {
      alert("No copies left!");
      return;
    }

    setIssuedBooks((prev) => [
      ...prev,
      {
        id: Date.now(), // unique id
        bookId: bookData.bookId, // link to original book
        title: bookData.title,
        author:bookData.author,
        studentId: bookData.studentId,
        issueDate: bookData.issueDate,
        dueDate: bookData.dueDate,
        fine: 0,
      },
    ]);

    // decrease available copies
    decrementBookCopy(bookData.id);
  };


  const returnBook = (issuedId) => {
  console.log("🔄 returnBook called with issuedId:", issuedId);

  setIssuedBooks((prev) =>
    prev.map((ib) => {
      if (ib.id === issuedId) {
        // Calculate fine
        const today = new Date();
        const due = new Date(ib.dueDate);
        const diffDays = Math.max(
          0,
          Math.ceil((today - due) / (1000 * 60 * 60 * 24))
        );
        const fine = diffDays * 10;

        console.log(`💰 Fine for ${ib.studentId}: Rs. ${fine}`);

        // Increment available copies
        incrementBookCopy(ib.bookId);

        // Instead of removing, mark as returned
        return { ...ib, returned: true, returnDate: today.toISOString().split("T")[0], fine };
      }
      return ib;
    })
  );
};


  // ✅ Delete issued records by bookId (when a book itself is deleted)
  const deleteIssuedByBookId = (bookId) => {
    const updated = issuedBooks.filter((ib) => ib.bookId !== bookId);
    setIssuedBooks(updated);
    localStorage.setItem("issuedBooks", JSON.stringify(updated)); // sync
    return updated;
  };

  return (
    <IssueContext.Provider
      value={{ issuedBooks, issueBook, returnBook, deleteIssuedByBookId }}
    >
      {children}
    </IssueContext.Provider>
  );
};
