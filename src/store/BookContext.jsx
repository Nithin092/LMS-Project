import { createContext, useEffect ,useState} from "react";


export const BookContext = createContext();

export const BookProvider = ({children}) => {

  const [books, setBooks] = useState([]);
  
  const incrementBookCopy = (bookId)=>{
    console.log("⬆️ incrementBookCopy called for bookId:", bookId);
    setBooks((prevBooks) =>
      prevBooks.map((book)=>
      book.id === bookId ?{...book,remainingCopies: Number(book.remainingCopies+1)} : book)
    )}
    
  const decrementBookCopy = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          if (book.remainingCopies > 0) {
            return { ...book, remainingCopies: Number (book.remainingCopies) - 1, };
          } else {
            alert("No copies left");
            return book;
          }
        }
        return book;
      })
    );
  }
  
  useEffect(() => {
  const storedBooks = localStorage.getItem("books");
  if(storedBooks){
    setBooks(JSON.parse(storedBooks));
  }
  }, [])
  
  useEffect(() => {
  localStorage.setItem("books", JSON.stringify(books));
  },[books]);

  const addBook = (book) => {
  setBooks((prev) => [
    ...prev,
    {
      ...book,
      id: Date.now(),
      totalCopies: Number(book.totalCopies),      // ensure number
      remainingCopies: Number(book.totalCopies),  // copies = total at start
    },
  ]);
};


  const updateBook = (id, updatedBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

 const deleteBook = (id) => {
  setBooks((prev) => prev.filter((book) => book.id !== id));
  
};

  
  

  return (
    <BookContext.Provider value={{books , addBook, updateBook, deleteBook , decrementBookCopy,incrementBookCopy }}>
      {children}
    </BookContext.Provider>
  )
}