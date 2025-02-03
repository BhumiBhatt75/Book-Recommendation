//key = AIzaSyAXre62RqHGMloHBmG4z_YJtzKWHpILPL4;
// components/Recommendations.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchBooksByGenre = async (genre) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}key=AIzaSyAXre62RqHGMloHBmG4z_YJtzKWHpILPL4`
    );
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const getRecommendations = async (userGenres) => {
  const recommendedBooks = [];
  for (const genre of userGenres) {
    const books = await fetchBooksByGenre(genre);
    recommendedBooks.push(...books);
  }
  return Array.from(new Set(recommendedBooks.map((b) => b.id))).map((id) =>
    recommendedBooks.find((b) => b.id === id)
  );
};

const Recommendations = ({ userGenres }) => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (userGenres.length > 0) {
        const books = await getRecommendations(userGenres);
        setRecommendedBooks(books);
      }
    };

    fetchRecommendations();
  }, [userGenres]);

  return (
    <div>
      <h2>Recommended Books</h2>
      <ul>
        {recommendedBooks.length > 0 ? (
          recommendedBooks.map((book) => (
            <li key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
              <p>Author(s): {book.volumeInfo.authors?.join(", ")}</p>
              <p>Published: {book.volumeInfo.publishedDate}</p>
              <a
                href={book.volumeInfo.infoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Books
              </a>
            </li>
          ))
        ) : (
          <p>No recommendations available for the selected genres.</p>
        )}
      </ul>
    </div>
  );
};

export default Recommendations;
