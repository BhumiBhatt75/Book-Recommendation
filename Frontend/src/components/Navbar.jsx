import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, BookOpen, User } from "lucide-react"; // Import User icon


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const location = useLocation();

  const genres = ["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Romance", "Thriller"];

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.toLowerCase()}`);
    setIsGenreDropdownOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <nav className="relative bg-gradient-to-br from-gray-900 to-black text-white shadow-md overflow-hidden">
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-900 to-transparent opacity-50"
          style={{
            backgroundPosition: `${mousePosition.x}px ${mousePosition.y}px`,
            transition: "background-position 0.3s ease-out",
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-white hover:text-purple-300 transition duration-300">
                <BookOpen className="h-8 w-8" />
                <span className="text-2xl font-light tracking-wide">BookNook</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-purple-300 px-3 py-2 text-sm font-medium transition duration-300">Home</Link>
              <Link to="/about" className="text-white hover:text-purple-300 px-3 py-2 text-sm font-medium transition duration-300">About</Link>
              <Link to="/contact" className="text-white hover:text-purple-300 px-3 py-2 text-sm font-medium transition duration-300">Contact</Link>
              <div className="relative">
                <button
                  onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                  className="text-white hover:text-purple-300 px-3 py-2 text-sm font-medium transition duration-300 flex items-center"
                >
                  Genres <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isGenreDropdownOpen && (
                  <div className="absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {genres.map((genre) => (
                        <a
                          key={genre}
                          href={`/genre/${genre.toLowerCase()}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-900"
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault();
                            handleGenreClick(genre);
                          }}
                        >
                          {genre}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="border border-purple-300 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300 text-sm font-medium">
                Sign Up
              </Link>
              {/* User Profile Icon */}
              <Link to="/userProfile" className="text-white hover:text-purple-300 transition duration-300">
                <User className="h-6 w-6" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300">Home</Link>
              <Link to="/about" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300">About</Link>
              <Link to="/contact" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300">Contact</Link>
              <button
                onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300 w-full text-left flex justify-between items-center"
              >
                Genres <ChevronDown className="h-4 w-4" />
              </button>
              {isGenreDropdownOpen && (
                <div className="pl-4">
                  {genres.map((genre) => (
                    <a
                      key={genre}
                      href={`/genre/${genre.toLowerCase()}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 transition duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        handleGenreClick(genre);
                      }}
                    >
                      {genre}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 space-x-3">
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 transition duration-300">Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 transition duration-300">Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Subtle Text Box Below Navbar */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-2 text-center shadow-md">
        <p className="text-sm font-light italic">Discover readers' top choices of books from the past 5 years</p>
      </div>
    </>
  );
};

export default Navbar;
