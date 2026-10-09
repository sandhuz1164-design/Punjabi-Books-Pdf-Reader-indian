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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className={`flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg text-sm transition-colors ${
          darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-amber-100 text-gray-700'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back</span>
      </motion.button>

      {/* Compact Layout */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Small Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-shrink-0"
        >
          <div className={`w-40 sm:w-48 rounded-xl overflow-hidden shadow-lg ${
            darkMode ? 'shadow-amber-600/10' : 'shadow-amber-200/50'
          }`}>
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex-1 space-y-4"
        >
          {/* Title & Author */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
              {book.title}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {book.author}
                </span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
              }`}>
                {book.genre}
              </span>
            </div>
          </div>

          {/* Stats - Compact Row */}
          <div className="flex flex-wrap gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'}`}>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-bold">{book.rating}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'}`}>
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold">{book.pages}p</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'}`}>
              <BookOpen className="w-4 h-4 text-green-500" />
              <span className="text-sm font-bold">{book.chapters.length}ch</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'}`}>
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-bold">{Math.round(book.pages / 30)}h</span>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {book.description}
          </p>

          {/* Read Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRead}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm rounded-lg shadow-lg shadow-amber-600/30 transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Start Reading
          </motion.button>
        </motion.div>
      </div>

      {/* Chapter List */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-amber-600" />
          Chapters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {book.chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={onRead}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-amber-600/50'
                  : 'bg-white hover:bg-amber-50 border border-amber-100 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs ${
                  darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                }`}>
                  {chapter.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{chapter.title}</h3>
                  <p className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {chapter.content.split(' ').slice(0, 10).join(' ')}...
                  </p>
                </div>
                <BookOpen className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
