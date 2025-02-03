import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Book, Search, ChevronRight } from 'lucide-react';

const GenreSelectionPage = () => {
  const { setSelectedGenres } = useUser();
  const [selectedGenres, setSelectedGenresLocal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const allGenres = [
    "Fiction", "Mystery", "Thriller", "Romance", "Science Fiction", "Fantasy",
    "Horror", "Historical Fiction", "Young Adult", "Children's", "Biography",
    "Autobiography", "Memoir", "Self-Help", "Business", "History", "Travel",
    "Cooking", "Art", "Philosophy", "Psychology", "Science", "Poetry", "Drama"
  ];

  const filteredGenres = allGenres.filter(genre =>
    genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenreToggle = (genre) => {
    setSelectedGenresLocal(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSubmit = () => {
    if (selectedGenres.length < 3) {
      alert("Please select at least 3 genres to continue.");
      return;
    }
    setSelectedGenres(selectedGenres);
    navigate("/books");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && selectedGenres.length >= 3) {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedGenres]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-blue-900 to-blue-800 p-5">
      <div className="relative w-full max-w-3xl p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920&text=Book+Collage')"}}></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            Discover Your Literary Universe
          </h1>
          <p className="text-center text-indigo-200 mb-8 text-lg">
            Embark on your reading journey by selecting at least 3 genres that spark your interest!
          </p>
          
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full border-2 border-indigo-300 bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 max-h-64 overflow-y-auto pr-4 custom-scrollbar">
            {filteredGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedGenres.includes(genre)
                    ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                    : "bg-white/30 text-indigo-100 hover:bg-white/50 hover:text-white"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedGenres.map((genre) => (
              <span
                key={genre}
                className="bg-indigo-700 text-indigo-100 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full py-4 text-white font-bold text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center ${
              selectedGenres.length >= 3
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={selectedGenres.length < 3}
          >
            <Book className="mr-2" />
            Get Recommendations ({selectedGenres.length}/3)
            <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreSelectionPage;