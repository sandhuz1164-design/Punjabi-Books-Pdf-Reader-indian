import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Home, Search, BookOpen, Moon, Sun, Library, X, FileUp } from 'lucide-react';
import { books, genres, Book as BookType } from './data/books';
import PDFReader from './components/PDFReader';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'reader' | 'pdf'>('home');
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

  const openBook = (book: BookType) => {
    setSelectedBook(book);
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
              {/* PDF Reader Button */}
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
        {currentPage === 'home' ? (
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
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
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
                  className={`text-lg sm:text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Discover, read, and enjoy timeless classics — or upload your own PDF books.
                  A beautiful reading experience awaits.
                </motion.p>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap justify-center gap-3 mb-8"
                >
                  <button
                    onClick={() => setCurrentPage('pdf')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                  >
                    <FileUp className="w-4 h-4" />
                    Read a PDF Book
                  </button>
                  <a
                    href="#library"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                      darkMode
                        ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                        : 'bg-white hover:bg-amber-50 text-gray-800 border border-amber-200 shadow-sm'
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
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search books or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-0 ${
                      darkMode
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500'
                        : 'bg-white border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-500'
                    }`}
                  />
                </motion.div>
              </div>
            </div>

            {/* Genre Filter */}
            <div id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedGenre === genre
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                        : darkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-white text-gray-600 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Books Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => openBook(book)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                      darkMode
                        ? 'bg-gray-800 border border-gray-700 hover:border-amber-600/50 hover:shadow-amber-600/10'
                        : 'bg-white border border-amber-100 hover:border-amber-300 hover:shadow-amber-200/50'
                    }`}
                  >
                    <div className={`h-48 flex items-center justify-center text-7xl ${
                      darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-amber-50 to-orange-50'
                    }`}>
                      <span className="group-hover:scale-110 transition-transform duration-300">{book.cover}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-lg leading-tight mb-1">{book.title}</h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>by {book.author}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {book.genre}
                        </span>
                      </div>
                      <p className={`mt-3 text-sm line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {book.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                          <span className="text-amber-500">★</span>
                          <span className="text-sm font-medium">{book.rating}</span>
                        </div>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {book.chapters.length} chapters
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No books found. Try a different search or genre.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ) : currentPage === 'pdf' ? (
          <motion.div
            key="pdf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PDFReader darkMode={darkMode} onBack={goHome} />
          </motion.div>
        ) : (
          <motion.div
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-[calc(100vh-64px)]"
          >
            {/* Sidebar */}
            <AnimatePresence>
              {showSidebar && (
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className={`fixed inset-y-0 left-0 z-40 w-80 pt-16 overflow-y-auto ${
                    darkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-amber-200'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Chapters</h3>
                      <button onClick={() => setShowSidebar(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {selectedBook?.chapters.map((chapter, index) => (
                        <button
                          key={chapter.id}
                          onClick={() => { setCurrentChapter(index); setShowSidebar(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                            currentChapter === index
                              ? 'bg-amber-600 text-white'
                              : darkMode
                                ? 'hover:bg-gray-700 text-gray-300'
                                : 'hover:bg-amber-50 text-gray-700'
                          }`}
                        >
                          <span className="font-medium">{chapter.id}.</span>
                          <span className="truncate">{chapter.title}</span>
                          {isBookmarked(selectedBook?.id || '', chapter.id) && (
                            <span className="ml-auto text-amber-500">🔖</span>
                          )}
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
              <div className={`flex items-center justify-between px-4 sm:px-6 py-3 border-b ${
                darkMode ? 'border-gray-700' : 'border-amber-200'
              }`}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                  >
                    <Library className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-xs">
                      {selectedBook?.title}
                    </h2>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {selectedBook?.chapters[currentChapter]?.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                    className={`px-2 py-1 rounded text-xs font-bold ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                    className={`px-2 py-1 rounded text-sm font-bold ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => selectedBook && toggleBookmark(selectedBook.id, selectedBook.chapters[currentChapter].id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked(selectedBook?.id || '', selectedBook?.chapters[currentChapter]?.id || 0)
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
                <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
                  <motion.div
                    key={currentChapter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                      {selectedBook?.chapters[currentChapter]?.title}
                    </h1>
                    <div
                      className={`leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                    >
                      {selectedBook?.chapters[currentChapter]?.content}
                    </div>
                  </motion.div>

                  {/* Chapter Navigation */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-dashed border-amber-300/50">
                    <button
                      onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                      disabled={currentChapter === 0}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                        currentChapter === 0
                          ? 'opacity-30 cursor-not-allowed'
                          : darkMode
                            ? 'bg-gray-800 hover:bg-gray-700 text-white'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                      }`}
                    >
                      ← Previous
                    </button>
                    <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {currentChapter + 1} of {selectedBook?.chapters.length}
                    </span>
                    <button
                      onClick={() => setCurrentChapter(Math.min((selectedBook?.chapters.length || 1) - 1, currentChapter + 1))}
                      disabled={currentChapter === (selectedBook?.chapters.length || 1) - 1}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                        currentChapter === (selectedBook?.chapters.length || 1) - 1
                          ? 'opacity-30 cursor-not-allowed'
                          : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/30'
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
