// components/BookDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBookDetails = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      setBook(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching book details. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/search-results?query=${searchQuery}`);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-blue-950 min-h-screen py-6">
      <div className="bg-blue-200 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-start">
        <div className="mb-6 lg:mr-8 flex-shrink-0">
          {book.volumeInfo.imageLinks ? (
            <img
              src={book.volumeInfo.imageLinks.thumbnail} // Smaller image size
              alt={book.volumeInfo.title}
              className="rounded-lg max-w-lg"
              style={{ width: '250px', height: 'auto' }}
            />
          ) : (
            <div className="bg-gray-300 rounded-lg w-full h-100 flex items-center justify-center max-w-xs">
              <span className="text-gray-600">No Image Available</span>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2 font-serif">{book.volumeInfo.title}</h1>
          {book.volumeInfo.authors && (
            <p className="text-sm text-gray-600 font-serif mb-4">
              Authors: {book.volumeInfo.authors.join(", ")}
            </p>
          )}
          <p className="text-lg mb-4 font-serif">
            <strong>Published:</strong> {book.volumeInfo.publishedDate}
          </p>
          <p className="text-lg mb-4 font-serif">
            <strong>Publisher:</strong> {book.volumeInfo.publisher}
          </p>
          <p className="text-lg mb-4 font-serif">
            <strong>Page Count:</strong> {book.volumeInfo.pageCount}
          </p>
          <p className="text-lg mb-4 font-serif">
            <strong>Categories:</strong>{" "}
            {book.volumeInfo.categories?.join(", ") || "N/A"}
          </p>
          <h2 className="text-2xl font-semibold font-serif mb-2">Description</h2>
          <p className="text-gray-700 font-serif mb-4">
            {book.volumeInfo.description
              ? book.volumeInfo.description.replace(/<\/?[^>]+(>|$)/g, "")
              : "No description available."}
          </p>
        </div>
      </div>
      <footer className="bg-blue-940 text-white text-center py-6 mt-6">
        <div className="mb-4">
          <p className="text-lg">Explore a world of books</p>
          <p>&copy; {new Date().getFullYear()} BookNook. All rights reserved.</p>
        </div>
        <div className="mb-4">
          <a href="/about" className="hover:underline mx-2">About</a>
          <a href="/contact" className="hover:underline mx-2">Contact</a>
          <a href="/privacy" className="hover:underline mx-2">Privacy Policy</a>
        </div>
        <div className="flex justify-center items-center">
          <h5 className="text-sm mr-2">Follow Us:</h5>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img
              src="https://img.icons8.com/material-outlined/24/ffffff/facebook-new.png"
              alt="Facebook"
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img
              src="https://img.icons8.com/material-outlined/24/ffffff/twitter-squared.png"
              alt="Twitter"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img
              src="https://img.icons8.com/material-outlined/24/ffffff/instagram-new.png"
              alt="Instagram"
            />
          </a>
        </div>
      </footer>

    </div>
  );
};

export default BookDetails;
