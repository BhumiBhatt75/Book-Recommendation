// components/GenreSelection.jsx
import React from "react";

const genres = [
  "Fiction",
  "Romance",
  "Science Fiction & Fantasy",
  "Mystery & Thrillers",
  "Health & Fitness",
  "Biography & Autobiography",
  "History",
  "Children's",
  "Cookbooks",
  "Graphic Novels",
  "Poetry",
  "Self-Help",
  "Travel",
  "Religion & Spirituality",
  "Science",
  "Business & Economics",
  "Arts & Photography",
  "Computers & Technology",
  "Parenting",
  "Sports & Outdoors",
  "Western",
  "Dystopian",
  "Horror",
  "Literary Fiction",
  "Short Stories",
  "Humor",
  "True Crime",
  "Political Science",
  "Social Science",
  "Nature",
  "Memoir",
  "Anthology",
  "Fantasy",
  "Graphic Memoir",
  "Urban Fiction",
  "Historical Fiction",
  "Science & Nature",
  "Chick Lit",
  "Inspirational",
  "Magical Realism",
  // Add more genres as needed
];


const GenreSelection = ({ selectedGenres, setSelectedGenres }) => {
  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {genres.map((genre) => (
        <label key={genre} className="flex items-center">
          <input
            type="checkbox"
            checked={selectedGenres.includes(genre)}
            onChange={() => handleGenreToggle(genre)}
            className="mr-2"
          />
          <span className="text-lg">{genre}</span>
        </label>
      ))}
    </div>
  );
};

export default GenreSelection;
