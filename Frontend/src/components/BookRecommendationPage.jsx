import React, { useState } from "react";
import GenreSelection from "../components/GenreSelection";
import BookSearch from "../components/BookSearch";

const BookRecommendationPage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div>
      <GenreSelection setSelectedGenres={setSelectedGenres} />
      <BookSearch selectedGenres={selectedGenres} />{" "}
      {/* Ensure this is correct */}
    </div>
  );
};

export default BookRecommendationPage;
