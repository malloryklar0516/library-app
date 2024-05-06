import Book from "./Book";
import { useQuery } from "@apollo/client";
import { useState } from 'react';
import { ALLBOOKS } from "../utils/queries";
export default function Books() {
const {loading, data} = useQuery(ALLBOOKS);
const books = data?.books || [];

    const [bookList, setBookList] = useState([
        {
            bookName: `test book`, 
            bookAuthor: `test author`, 
            reaction: 'test',
        }
    ]);
    
    return (
        <div className={`books`}>
            {books.length > 0 ? (
                <div className={`booksContainer`}>
                    {books.map((book, bookIndex) => {
                        return <Book key={bookIndex} book={book} />
                    })}
                </div>
            ) : (
                <div className={`noBooks`}>No Books</div>
            )}
        </div>
    )
}
