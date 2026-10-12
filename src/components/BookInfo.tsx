import { motion } from 'framer-motion';
import { ArrowLeft, Star, BookOpen, FileText, Clock, User, BookMarked, Library } from 'lucide-react';
import { Book } from '../data/books';

interface BookInfoProps {
  book: Book;
  darkMode: boolean;
  onBack: () => void;
  onRead: () => void;
  relatedBooks?: Book[];
  onBookClick?: (book: Book) => void;
}

export default function BookInfo({ book, darkMode, onBack, onRead, relatedBooks = [], onBookClick }: BookInfoProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
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

      {/* Related Books Section */}
      {relatedBooks.length > 0 && (
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Library className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold">You Might Also Like</h2>
            </div>
            <p className={`text-sm leading-relaxed mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover more captivating books in the <span className="font-semibold text-amber-600">{book.genre}</span> genre. 
              These carefully selected titles share similar themes, writing styles, and literary merit with <em>{book.title}</em>.
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Perfect for readers who enjoyed {book.title} by {book.author}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {relatedBooks.map((relBook, index) => (
              <motion.div
                key={relBook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.08 }}
                onClick={() => onBookClick?.(relBook)}
                className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  darkMode
                    ? 'bg-gray-800 border border-gray-700 hover:border-amber-600/50 hover:shadow-amber-900/20'
                    : 'bg-white border border-amber-100 hover:border-amber-400 hover:shadow-amber-200/60'
                }`}
              >
                {/* Book Cover */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={relBook.coverImage}
                    alt={`${relBook.title} by ${relBook.author}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs leading-relaxed line-clamp-2 mb-2">
                        {relBook.description.slice(0, 80)}...
                      </p>
                      <button className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors">
                        Read Now
                      </button>
                    </div>
                  </div>
                  {/* Rating badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg backdrop-blur-sm text-xs font-bold flex items-center gap-1 ${
                    darkMode ? 'bg-black/60 text-white' : 'bg-white/90 text-gray-900'
                  }`}>
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {relBook.rating}
                  </div>
                </div>
                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-2 min-h-[2.5rem]">
                    {relBook.title}
                  </h3>
                  <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    by {relBook.author}
                  </p>
                  <div className={`flex items-center justify-between pt-2 border-t border-dashed border-opacity-30 ${darkMode ? 'border-gray-600' : 'border-amber-200'}`}>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                      darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {relBook.genre}
                    </span>
                    <span className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {relBook.pages} pages
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* If no related books of same genre, show "You might also like" */}
          {relatedBooks.length === 0 && (
            <div className={`text-center py-8 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-amber-50'}`}>
              <BookOpen className={`w-10 h-10 mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No related books found in this genre yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
