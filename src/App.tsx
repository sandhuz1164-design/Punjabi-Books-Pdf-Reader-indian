import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Home, Search, BookOpen, Moon, Sun, Library, X, FileUp, Star } from 'lucide-react';
import { books, genres, Book as BookType } from './data/books';
import PDFReader from './components/PDFReader';
import BookInfo from './components/BookInfo';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'info' | 'reader' | 'pdf'>('home');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [showSidebar, setShowSidebar] = useState(false);
  const [bookmarks, setBookmarks] = useState<{ [key: string]: number[] }>({});

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-amber-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-amber-50/90 border-amber-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 cursor-pointer" onClick={goHome}>
              <div className="p-1.5 rounded-lg bg-amber-600">
                <Book className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                BookVerse
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('pdf')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 'pdf'
                    ? 'bg-red-500 text-white'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-amber-100 text-gray-700'
                }`}
              >
                <FileUp className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-amber-100 text-amber-700'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {currentPage !== 'home' && (
                <button
                  onClick={goHome}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                >
                  <Home className="w-4 h-4 text-amber-600" />
                  <span className="font-medium hidden sm:inline text-sm">Library</span>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Compact Hero */}
            <div className="relative overflow-hidden">
              <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50'}`}></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Your Digital Library
                  </span>
                </h1>
                <p className={`text-sm sm:text-base max-w-lg mx-auto mb-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Read classics or upload your own PDFs
                </p>

                {/* Search */}
                <div className="max-w-md mx-auto relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 text-sm transition-all focus:outline-none ${
                      darkMode
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:border-amber-500'
                        : 'bg-white border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Genre Filter - Compact */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
              <div className="flex flex-wrap gap-1.5">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedGenre === genre
                        ? 'bg-amber-600 text-white'
                        : darkMode
                          ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                          : 'bg-white text-gray-600 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* COMPACT BOOK GRID - 7 per row, small covers */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 sm:gap-3">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => openBookInfo(book)}
                    className="group cursor-pointer"
                  >
                    {/* Small Cover */}
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-200 group-hover:scale-[1.03]">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-white text-[10px] font-medium">{book.rating}</span>
                        </div>
                        <span className="text-white/80 text-[9px] mt-0.5">Click to read</span>
                      </div>
                    </div>
                    {/* Tiny Info */}
                    <div className="mt-1.5 px-0.5">
                      <h3 className="font-semibold text-[11px] leading-tight truncate">{book.title}</h3>
                      <p className={`text-[10px] truncate ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {book.author}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No books found
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className={`border-t mt-8 py-6 ${darkMode ? 'border-gray-800' : 'border-amber-200'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-600">
                      <Book className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      BookVerse
                    </span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Read classics online or upload your own PDF books
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCurrentPage('pdf')}
                      className={`text-xs font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                        darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-amber-100 hover:bg-amber-200 text-amber-700'
                      }`}
                    >
                      <FileUp className="w-3 h-3" />
                      Upload PDF
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}

        {currentPage === 'info' && selectedBook && (
          <motion.div
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BookInfo
              book={selectedBook}
              darkMode={darkMode}
              onBack={goHome}
              onRead={startReading}
            />
          </motion.div>
        )}

        {currentPage === 'pdf' && (
          <motion.div
            key="pdf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PDFReader darkMode={darkMode} onBack={goHome} />
          </motion.div>
        )}

        {currentPage === 'reader' && selectedBook && (
          <motion.div
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-[calc(100vh-56px)]"
          >
            {/* Sidebar */}
            <AnimatePresence>
              {showSidebar && (
                <motion.div
                  initial={{ x: -280, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -280, opacity: 0 }}
                  className={`fixed inset-y-0 left-0 z-40 w-72 pt-14 overflow-y-auto ${
                    darkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-amber-200'
                  }`}
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-sm">Chapters</h3>
                      <button onClick={() => setShowSidebar(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-0.5">
                      {selectedBook.chapters.map((chapter, index) => (
                        <button
                          key={chapter.id}
                          onClick={() => { setCurrentChapter(index); setShowSidebar(false); }}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${
                            currentChapter === index
                              ? 'bg-amber-600 text-white'
                              : darkMode
                                ? 'hover:bg-gray-700 text-gray-300'
                                : 'hover:bg-amber-50 text-gray-700'
                          }`}
                        >
                          <span className="font-medium">{chapter.id}.</span>
                          <span className="truncate">{chapter.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reader Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Reader Header */}
              <div className={`flex items-center justify-between px-3 py-2 border-b ${
                darkMode ? 'border-gray-700' : 'border-amber-200'
              }`}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                  >
                    <Library className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedBook.coverImage}
                      alt={selectedBook.title}
                      className="w-8 h-11 object-cover rounded shadow hidden sm:block"
                    />
                    <div>
                      <h2 className="font-bold text-xs sm:text-sm truncate max-w-[180px] sm:max-w-xs">
                        {selectedBook.title}
                      </h2>
                      <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {selectedBook.chapters[currentChapter]?.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                    className={`px-1.5 py-0.5 rounded text-xs font-bold ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => toggleBookmark(selectedBook.id, selectedBook.chapters[currentChapter].id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isBookmarked(selectedBook.id, selectedBook.chapters[currentChapter].id)
                        ? 'text-amber-500'
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'
                    }`}
                  >
                    🔖
                  </button>
                </div>
              </div>

              {/* Reading Area */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
                  <motion.div
                    key={currentChapter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                      {selectedBook.chapters[currentChapter]?.title}
                    </h1>
                    <div
                      className={`leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                    >
                      {selectedBook.chapters[currentChapter]?.content}
                    </div>
                  </motion.div>

                  {/* Chapter Navigation */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-dashed border-amber-300/50">
                    <button
                      onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                      disabled={currentChapter === 0}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentChapter === 0
                          ? 'opacity-30 cursor-not-allowed'
                          : darkMode
                            ? 'bg-gray-800 hover:bg-gray-700 text-white'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                      }`}
                    >
                      ← Prev
                    </button>
                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {currentChapter + 1} / {selectedBook.chapters.length}
                    </span>
                    <button
                      onClick={() => setCurrentChapter(Math.min(selectedBook.chapters.length - 1, currentChapter + 1))}
                      disabled={currentChapter === selectedBook.chapters.length - 1}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentChapter === selectedBook.chapters.length - 1
                          ? 'opacity-30 cursor-not-allowed'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      Next →
                    </button>
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
