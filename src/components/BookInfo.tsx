import { motion } from 'framer-motion';
import { ArrowLeft, Star, BookOpen, FileText, Clock, User, BookMarked } from 'lucide-react';
import { Book } from '../data/books';

interface BookInfoProps {
  book: Book;
  darkMode: boolean;
  onBack: () => void;
  onRead: () => void;
}

export default function BookInfo({ book, darkMode, onBack, onRead }: BookInfoProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
          darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-amber-100 text-gray-700'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Library</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className={`rounded-2xl overflow-hidden shadow-2xl ${
            darkMode ? 'shadow-amber-600/10' : 'shadow-amber-200/50'
          }`}>
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Right: Book Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Title & Author */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              {book.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {book.author}
                </span>
              </div>
              <span className={`text-sm px-3 py-1 rounded-full ${
                darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
              }`}>
                {book.genre}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-2xl font-bold">{book.rating}</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold">{book.pages}</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pages</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold">{book.chapters.length}</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Chapters</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-purple-500" />
                <span className="text-2xl font-bold">{Math.round(book.pages / 30)}h</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Read Time</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-amber-600" />
              About this Book
            </h2>
            <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {book.description}
            </p>
          </div>

          {/* Read Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRead}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 transition-all flex items-center justify-center gap-3"
          >
            <BookOpen className="w-6 h-6" />
            Start Reading
          </motion.button>

          {/* Chapter List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Chapters</h2>
            <div className="space-y-2">
              {book.chapters.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={onRead}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    darkMode
                      ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-amber-600/50'
                      : 'bg-white hover:bg-amber-50 border border-amber-100 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                      darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {chapter.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{chapter.title}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {chapter.content.split(' ').slice(0, 15).join(' ')}...
                      </p>
                    </div>
                    <BookOpen className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
