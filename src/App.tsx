import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Home, Search, BookOpen, Moon, Sun, Library, X, FileUp, Star, Quote, Users, Hash, ChevronDown, Headphones, Trophy, Heart, Mail, Globe, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { books, genres, Book as BookType } from './data/books';
import { authors, demoTags } from './data/authors';
import PDFReader from './components/PDFReader';
import BookInfo from './components/BookInfo';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'info' | 'reader' | 'pdf'>('home');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [showSidebar, setShowSidebar] = useState(false);
  const [bookmarks, setBookmarks] = useState<{ [key: string]: number[] }>({});
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showAudio, setShowAudio] = useState(false);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Top 10 books sorted by rating
  const topBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 10);

  // Get related books (same genre, excluding current book)
  const getRelatedBooks = (book: BookType) => {
    return books.filter(b => b.genre === book.genre && b.id !== book.id);
  };

  const openBookInfo = (book: BookType) => {
    setSelectedBook(book);
    setCurrentPage('info');
  };

  const startReading = () => {
    setCurrentPage('reader');
    setCurrentChapter(0);
  };

  const goHome = () => {
    setCurrentPage('home');
    setSelectedBook(null);
    setShowSidebar(false);
  };

  const toggleBookmark = (bookId: string, chapterId: number) => {
    setBookmarks(prev => {
      const bookBookmarks = prev[bookId] || [];
      if (bookBookmarks.includes(chapterId)) {
        return { ...prev, [bookId]: bookBookmarks.filter(id => id !== chapterId) };
      }
      return { ...prev, [bookId]: [...bookBookmarks, chapterId] };
    });
  };

  const isBookmarked = (bookId: string, chapterId: number) => {
    return bookmarks[bookId]?.includes(chapterId) || false;
  };

  const handleTagClick = (tagName: string) => {
    // Map tags to genres where possible
    const genreMap: { [key: string]: string } = {
      'Philosophy': 'Philosophy',
      'Fiction': 'Fiction',
      'Mystery': 'Mystery',
      'Romance': 'Romance',
      'Classic': 'All',
      'Adventure': 'Fiction',
      'Drama': 'Philosophy',
      'Epic': 'Fiction',
      'Fantasy': 'Fiction',
      'War': 'Philosophy',
      'History': 'Philosophy',
    };
    
    const mappedGenre = genreMap[tagName] || 'All';
    setSelectedGenre(mappedGenre);
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuthorClick = (authorName: string) => {
    setSearchQuery(authorName);
    setSelectedGenre('All');
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-amber-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-amber-50/90 border-amber-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
              <div className="p-2 rounded-lg bg-amber-600">
                <Book className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                BookVerse
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setCurrentPage('pdf')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 'pdf'
                    ? 'bg-red-500 text-white'
                    : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-amber-100 text-gray-700'
                }`}
              >
                <FileUp className="w-4 h-4" />
                <span className="hidden sm:inline">PDF Reader</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-amber-100 text-amber-700'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {currentPage === 'home' ? (
                <div className="flex items-center gap-2">
                  <Library className="w-5 h-5 text-amber-600" />
                  <span className="font-medium hidden sm:inline">Library</span>
                </div>
              ) : (
                <button
                  onClick={goHome}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                >
                  <Home className="w-5 h-5 text-amber-600" />
                  <span className="font-medium hidden sm:inline">Library</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <div className="relative overflow-hidden">
              <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50'}`}></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
                >
                  <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Your Digital Library
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-lg sm:text-xl max-w-2xl mx-auto mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Discover, read, and enjoy timeless classics — or upload your own PDF books.
                </motion.p>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap justify-center gap-3 mb-6"
                >
                  <button
                    onClick={() => setCurrentPage('pdf')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-red-500/20"
                  >
                    <FileUp className="w-4 h-4" />
                    Read a PDF Book
                  </button>
                  <a
                    href="#library"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' : 'bg-white hover:bg-amber-50 text-gray-800 border border-amber-200 shadow-sm'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Browse Library
                  </a>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-xl mx-auto relative"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                      darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500' : 'bg-white border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-500'
                    }`}
                  />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8"
                >
                  <a href="#tags" className={`inline-flex items-center gap-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>Explore Tags & Authors</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* ========== TOP 10 BOOKS SECTION ========== */}
            <div id="top-books" className={`py-12 border-b ${darkMode ? 'border-gray-800 bg-gradient-to-b from-gray-900 to-gray-900/50' : 'border-amber-100 bg-gradient-to-b from-amber-50 to-white'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="w-6 h-6 text-amber-500" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Top 10 Books</h2>
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Our highest-rated books — handpicked for you
                  </p>
                </motion.div>

                {/* Top 10 Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {topBooks.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => openBookInfo(book)}
                      className="group cursor-pointer relative"
                    >
                      {/* Rank Badge */}
                      <div className={`absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                        darkMode ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-white text-gray-700 border border-amber-200'
                      }`}>
                        #{index + 1}
                      </div>

                      {/* Book Card */}
                      <div className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                        darkMode
                          ? 'bg-gray-800 border border-gray-700 hover:border-amber-600/50 hover:shadow-amber-600/10'
                          : 'bg-white border border-amber-100 hover:border-amber-300 hover:shadow-amber-200/50'
                      }`}>
                        {/* Cover */}
                        <div className="relative aspect-[2/3] overflow-hidden">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              <span className="text-white text-sm font-bold">{book.rating}</span>
                            </div>
                            <button className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors">
                              READ NOW
                            </button>
                          </div>
                        </div>
                        {/* Info */}
                        <div className="p-3">
                          <h3 className="font-bold text-sm leading-tight mb-1 truncate">{book.title}</h3>
                          <p className={`text-xs truncate mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{book.author}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <span className="text-xs font-semibold">{book.rating}</span>
                            </div>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {book.genre}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========== TRENDING TAGS SECTION ========== */}
            <div id="tags" className={`py-12 border-b ${darkMode ? 'border-gray-800' : 'border-amber-100'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Hash className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Trending Tags</h2>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Browse by topic — click any tag to filter books
                  </p>
                </motion.div>

                {/* Tags Grid - 20 tags */}
                <div className="flex flex-wrap justify-center gap-3">
                  {demoTags.map((tag, index) => (
                    <motion.button
                      key={tag.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTagClick(tag.name)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all ${
                        selectedGenre === tag.name
                          ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                          : darkMode
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                            : 'bg-white text-gray-700 hover:bg-amber-50 border border-amber-200 hover:border-amber-400 shadow-sm'
                      }`}
                    >
                      <span className="text-base">{tag.icon}</span>
                      <span>{tag.name}</span>
                      {tag.count > 0 && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          selectedGenre === tag.name
                            ? 'bg-white/20'
                            : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {tag.count}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* ========== FEATURED AUTHORS SECTION ========== */}
            <div className={`py-12 border-b ${darkMode ? 'border-gray-800' : 'border-amber-100'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Featured Authors</h2>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    10 legendary writers — click any author to see their books
                  </p>
                </motion.div>

                {/* Authors Grid - 10 authors in 5x2 layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {authors.map((author, index) => (
                    <motion.div
                      key={author.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      onClick={() => handleAuthorClick(author.name)}
                      className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                        darkMode
                          ? 'bg-gray-800 border border-gray-700 hover:border-amber-600/50'
                          : 'bg-white border border-amber-100 hover:border-amber-300 hover:shadow-amber-200/50'
                      }`}
                    >
                      {/* Author Avatar */}
                      <div className={`relative h-28 bg-gradient-to-br ${author.color} flex items-center justify-center overflow-hidden`}>
                        <span className="text-4xl font-bold text-white/90 group-hover:scale-110 transition-transform duration-300">
                          {author.initials}
                        </span>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Quote className="w-4 h-4 text-white/80" />
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="p-3">
                        <h3 className="font-bold text-sm leading-tight mb-0.5 truncate">{author.name}</h3>
                        <div className="flex items-center gap-1 mb-1.5">
                          <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {author.nationality}
                          </span>
                          <span className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                          <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {author.era}
                          </span>
                        </div>
                        <p className={`text-[11px] line-clamp-2 mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {author.bio}
                        </p>
                        {/* Quote */}
                        <div className={`text-[10px] italic line-clamp-2 pt-2 border-t ${
                          darkMode ? 'border-gray-700 text-gray-500' : 'border-amber-100 text-gray-500'
                        }`}>
                          "{author.quote}"
                        </div>
                        {/* Genre badge */}
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                            darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {author.genre}
                          </span>
                          <span className={`text-[9px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========== LIBRARY SECTION ========== */}
            <div id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                  Book Library
                  <span className={`text-sm font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ({filteredBooks.length} books)
                  </span>
                </h2>
                <div className={`flex items-center gap-1 p-1 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-200'}`}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'grid' ? 'bg-amber-600 text-white' : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'table' ? 'bg-amber-600 text-white' : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Table
                  </button>
                </div>
              </div>

              {/* Genre Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedGenre === genre
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                        : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              {/* Books Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                  {filteredBooks.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => openBookInfo(book)}
                      className="group cursor-pointer"
                    >
                      {/* 3D Book Container */}
                      <div className="book-3d relative mx-auto" style={{ perspective: '1000px' }}>
                        <div className="book-3d-inner relative transition-transform duration-500 group-hover:rotate-y-[-8deg] group-hover:translate-x-1">
                          {/* Book Cover */}
                          <div className="book-cover relative aspect-[2/3] rounded-r-md rounded-l-sm overflow-hidden shadow-book">
                            <img 
                              src={book.coverImage} 
                              alt={book.title} 
                              className="w-full h-full object-cover"
                            />
                            {/* Book spine highlight */}
                            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent"></div>
                            {/* Glossy effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                              <span className="text-white text-xs font-bold mb-1 leading-tight">{book.title}</span>
                              <span className="text-white/80 text-[10px]">{book.author}</span>
                              <div className="mt-2 flex items-center gap-1">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span className="text-white text-xs">{book.rating}</span>
                              </div>
                              <button className="mt-2 w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold rounded transition-colors">
                                READ NOW
                              </button>
                            </div>
                          </div>
                          {/* Book spine (side) */}
                          <div className="absolute top-0 -left-1 w-2 h-full bg-gradient-to-r from-gray-800 to-gray-600 rounded-l-sm shadow-md transform -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* Book pages (right side) */}
                          <div className="absolute top-1 -right-1 w-1 h-[calc(100%-8px)] bg-gradient-to-r from-gray-200 to-gray-100 rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                      {/* Book info below */}
                      <div className="mt-3 text-center">
                        <h3 className="font-bold text-sm leading-tight mb-0.5 truncate">{book.title}</h3>
                        <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{book.author}</p>
                        <div className="flex items-center justify-center gap-2 mt-1.5">
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-medium">{book.rating}</span>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                            {book.genre}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-amber-200'}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={darkMode ? 'bg-gray-800' : 'bg-amber-100/50'}>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Cover</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Title</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">Author</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Genre</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Rating</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Pages</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-amber-100'}`}>
                        {filteredBooks.map((book, index) => (
                          <motion.tr
                            key={book.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`cursor-pointer transition-colors ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-amber-50'}`}
                            onClick={() => openBookInfo(book)}
                          >
                            <td className="px-4 py-3">
                              <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover rounded-md shadow-sm" />
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-semibold text-sm">{book.title}</div>
                              <div className={`text-xs sm:hidden ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{book.author}</div>
                            </td>
                            <td className={`px-4 py-3 text-sm hidden sm:table-cell ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{book.author}</td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>{book.genre}</span>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-medium">{book.rating}</span>
                              </div>
                            </td>
                            <td className={`px-4 py-3 text-sm hidden lg:table-cell ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{book.pages}</td>
                            <td className="px-4 py-3">
                              <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm">View</button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {filteredBooks.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No books found. Try a different search or tag.</p>
                </div>
              )}
            </div>

            {/* ========== ABOUT SECTION ========== */}
            <div className={`py-16 border-t ${darkMode ? 'border-gray-800' : 'border-amber-100'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto text-center mb-12"
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Book className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">About BookVerse</h2>
                  </div>
                  <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    BookVerse is your premier digital library destination, bringing timeless literary classics to your fingertips. 
                    Our mission is to make great literature accessible to everyone, everywhere. Whether you're a student, a casual reader, 
                    or a lifelong bibliophile, BookVerse offers a curated collection of the world's most influential works.
                  </p>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={`p-6 rounded-2xl text-center ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-amber-100 shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Curated Collection</h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Every book in our library is carefully selected for its literary merit, cultural significance, and enduring relevance. 
                      From ancient philosophy to modern fiction, discover works that have shaped human thought.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={`p-6 rounded-2xl text-center ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-amber-100 shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-4">
                      <Headphones className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Read & Listen</h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Enjoy our books with a comfortable reading experience featuring adjustable fonts, bookmarks, and chapter navigation. 
                      Plus, use our built-in audio reader to listen to books on the go.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={`p-6 rounded-2xl text-center sm:col-span-2 lg:col-span-1 ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-amber-100 shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                      <FileUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Upload Your PDFs</h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Have your own digital books? Upload any PDF and read it right in your browser with our built-in PDF reader. 
                      No downloads, no installations — just seamless reading.
                    </p>
                  </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
                >
                  {[
                    { label: 'Books', value: books.length + '+', icon: '📚' },
                    { label: 'Authors', value: authors.length + '+', icon: '✍️' },
                    { label: 'Chapters', value: books.reduce((sum, b) => sum + b.chapters.length, 0) + '+', icon: '📖' },
                    { label: 'Genres', value: genres.length - 1, icon: '🏷️' },
                  ].map((stat, i) => (
                    <div key={i} className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-amber-50'}`}>
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-2xl font-bold text-amber-600">{stat.value}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* ========== SITE FOOTER ========== */}
            <footer className={`border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-amber-50 border-amber-200'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Brand */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-amber-600">
                        <Book className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        BookVerse
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Your digital library for timeless classics. Read, discover, and enjoy the world's greatest literature — all in one place.
                    </p>
                    <div className="flex items-center gap-3">
                      <a href="#" className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-amber-500' : 'hover:bg-amber-100 text-gray-500 hover:text-amber-600'}`}>
                        <Globe className="w-4 h-4" />
                      </a>
                      <a href="#" className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-amber-500' : 'hover:bg-amber-100 text-gray-500 hover:text-amber-600'}`}>
                        <Mail className="w-4 h-4" />
                      </a>
                      <a href="#" className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-amber-500' : 'hover:bg-amber-100 text-gray-500 hover:text-amber-600'}`}>
                        <Heart className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-amber-600">Quick Links</h4>
                    <ul className="space-y-2">
                      {[
                        { label: 'Home', href: '#' },
                        { label: 'Top Books', href: '#top-books' },
                        { label: 'Library', href: '#library' },
                        { label: 'Authors', href: '#tags' },
                        { label: 'PDF Reader', action: () => setCurrentPage('pdf') },
                      ].map((link, i) => (
                        <li key={i}>
                          {link.action ? (
                            <button
                              onClick={link.action}
                              className={`text-sm flex items-center gap-1.5 transition-colors ${darkMode ? 'text-gray-400 hover:text-amber-500' : 'text-gray-600 hover:text-amber-600'}`}
                            >
                              <ArrowRight className="w-3 h-3" />
                              {link.label}
                            </button>
                          ) : (
                            <a
                              href={link.href}
                              className={`text-sm flex items-center gap-1.5 transition-colors ${darkMode ? 'text-gray-400 hover:text-amber-500' : 'text-gray-600 hover:text-amber-600'}`}
                            >
                              <ArrowRight className="w-3 h-3" />
                              {link.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Genres */}
                  <div>
                    <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-amber-600">Genres</h4>
                    <ul className="space-y-2">
                      {genres.filter(g => g !== 'All').map((genre, i) => (
                        <li key={i}>
                          <button
                            onClick={() => { setSelectedGenre(genre); document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className={`text-sm flex items-center gap-1.5 transition-colors ${darkMode ? 'text-gray-400 hover:text-amber-500' : 'text-gray-600 hover:text-amber-600'}`}
                          >
                            <ArrowRight className="w-3 h-3" />
                            {genre}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Info */}
                  <div>
                    <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-amber-600">Information</h4>
                    <ul className="space-y-2">
                      {[
                        { label: 'About Us', href: '#' },
                        { label: 'Privacy Policy', href: '#' },
                        { label: 'Terms of Service', href: '#' },
                        { label: 'Contact', href: '#' },
                      ].map((link, i) => (
                        <li key={i}>
                          <a
                            href={link.href}
                            className={`text-sm flex items-center gap-1.5 transition-colors ${darkMode ? 'text-gray-400 hover:text-amber-500' : 'text-gray-600 hover:text-amber-600'}`}
                          >
                            <ArrowRight className="w-3 h-3" />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  darkMode ? 'border-gray-800' : 'border-amber-200'
                }`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    © 2026 BookVerse. All rights reserved. Made with ❤️ for book lovers everywhere.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      <Shield className="w-3.5 h-3.5" />
                      <span>Secure Reading</span>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      <Globe className="w-3.5 h-3.5" />
                      <span>Free & Open</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}

        {currentPage === 'info' && selectedBook && (
          <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <BookInfo 
              book={selectedBook} 
              darkMode={darkMode} 
              onBack={goHome} 
              onRead={startReading}
              relatedBooks={getRelatedBooks(selectedBook)}
              onBookClick={openBookInfo}
            />
          </motion.div>
        )}

        {currentPage === 'pdf' && (
          <motion.div key="pdf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <PDFReader darkMode={darkMode} onBack={goHome} />
          </motion.div>
        )}

        {currentPage === 'reader' && selectedBook && (
          <motion.div key="reader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex h-[calc(100vh-64px)]">
            <AnimatePresence>
              {showSidebar && (
                <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} className={`fixed inset-y-0 left-0 z-40 w-80 pt-16 overflow-y-auto ${darkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-amber-200'}`}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Chapters</h3>
                      <button onClick={() => setShowSidebar(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-1">
                      {selectedBook.chapters.map((chapter, index) => (
                        <button key={chapter.id} onClick={() => { setCurrentChapter(index); setShowSidebar(false); }} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${currentChapter === index ? 'bg-amber-600 text-white' : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-amber-50 text-gray-700'}`}>
                          <span className="font-medium">{chapter.id}.</span>
                          <span className="truncate">{chapter.title}</span>
                          {isBookmarked(selectedBook.id, chapter.id) && <span className="ml-auto text-amber-500">🔖</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col overflow-hidden">
              <div className={`flex items-center justify-between px-4 sm:px-6 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-amber-200'}`}>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowSidebar(!showSidebar)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}><Library className="w-5 h-5" /></button>
                  <div className="flex items-center gap-3">
                    <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-10 h-14 object-cover rounded-md shadow-md hidden sm:block" />
                    <div>
                      <h2 className="font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-xs">{selectedBook.title}</h2>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedBook.chapters[currentChapter]?.title}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className={`px-2 py-1 rounded text-xs font-bold ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}>A-</button>
                  <button onClick={() => setFontSize(Math.min(28, fontSize + 2))} className={`px-2 py-1 rounded text-sm font-bold ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}>A+</button>
                  <button onClick={() => toggleBookmark(selectedBook.id, selectedBook.chapters[currentChapter].id)} className={`p-2 rounded-lg transition-colors ${isBookmarked(selectedBook.id, selectedBook.chapters[currentChapter].id) ? 'text-amber-500' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}>🔖</button>
                  <button 
                    onClick={() => setShowAudio(!showAudio)} 
                    className={`p-2 rounded-lg transition-colors ${showAudio ? 'bg-amber-600 text-white' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                    title="Toggle Audio Reader"
                  >
                    <Headphones className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
                  {/* Audio Player */}
                  <AnimatePresence>
                    {showAudio && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="mb-8"
                      >
                        <AudioPlayer
                          text={selectedBook.chapters[currentChapter]?.content || ''}
                          darkMode={darkMode}
                          chapterTitle={selectedBook.chapters[currentChapter]?.title || ''}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div key={currentChapter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{selectedBook.chapters[currentChapter]?.title}</h1>
                    <div className={`leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}>
                      {selectedBook.chapters[currentChapter]?.content}
                    </div>
                  </motion.div>

                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-dashed border-amber-300/50">
                    <button onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))} disabled={currentChapter === 0} className={`px-5 py-2.5 rounded-xl font-medium transition-all ${currentChapter === 0 ? 'opacity-30 cursor-not-allowed' : darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-amber-100 hover:bg-amber-200 text-amber-800'}`}>← Previous</button>
                    <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{currentChapter + 1} of {selectedBook.chapters.length}</span>
                    <button onClick={() => setCurrentChapter(Math.min(selectedBook.chapters.length - 1, currentChapter + 1))} disabled={currentChapter === selectedBook.chapters.length - 1} className={`px-5 py-2.5 rounded-xl font-medium transition-all ${currentChapter === selectedBook.chapters.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/30'}`}>Next →</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
