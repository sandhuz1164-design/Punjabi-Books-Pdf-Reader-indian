export interface Author {
  id: string;
  name: string;
  initials: string;
  color: string;
  nationality: string;
  era: string;
  bio: string;
  bookCount: number;
  genre: string;
  quote: string;
}

export const authors: Author[] = [
  {
    id: "sun-tzu",
    name: "Sun Tzu",
    initials: "ST",
    color: "from-red-500 to-orange-500",
    nationality: "Chinese",
    era: "5th Century BC",
    bio: "Ancient Chinese military strategist, philosopher, and writer who lived during the Eastern Zhou period.",
    bookCount: 1,
    genre: "Philosophy",
    quote: "The supreme art of war is to subdue the enemy without fighting."
  },
  {
    id: "marcus-aurelius",
    name: "Marcus Aurelius",
    initials: "MA",
    color: "from-blue-500 to-indigo-600",
    nationality: "Roman",
    era: "121–180 AD",
    bio: "Roman Emperor and Stoic philosopher whose personal writings are a significant source of ancient Stoic philosophy.",
    bookCount: 1,
    genre: "Philosophy",
    quote: "The happiness of your life depends upon the quality of your thoughts."
  },
  {
    id: "lewis-carroll",
    name: "Lewis Carroll",
    initials: "LC",
    color: "from-purple-500 to-pink-500",
    nationality: "English",
    era: "1832–1898",
    bio: "English writer, mathematician, and photographer, best known for his whimsical fantasy literature.",
    bookCount: 1,
    genre: "Fiction",
    quote: "If you don't know where you are going, any road will get you there."
  },
  {
    id: "arthur-conan-doyle",
    name: "Arthur Conan Doyle",
    initials: "AD",
    color: "from-gray-700 to-gray-900",
    nationality: "Scottish",
    era: "1859–1930",
    bio: "British writer and physician who created the character Sherlock Holmes, one of the most iconic in fiction.",
    bookCount: 1,
    genre: "Mystery",
    quote: "When you have eliminated the impossible, whatever remains must be the truth."
  },
  {
    id: "jane-austen",
    name: "Jane Austen",
    initials: "JA",
    color: "from-pink-400 to-rose-500",
    nationality: "English",
    era: "1775–1817",
    bio: "English novelist known for her six major novels which interpret, critique, and comment on the British landed gentry.",
    bookCount: 1,
    genre: "Romance",
    quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."
  },
  {
    id: "f-scott-fitzgerald",
    name: "F. Scott Fitzgerald",
    initials: "FF",
    color: "from-amber-500 to-yellow-600",
    nationality: "American",
    era: "1896–1940",
    bio: "American novelist widely regarded as one of the greatest American writers of the 20th century.",
    bookCount: 1,
    genre: "Fiction",
    quote: "So we beat on, boats against the current, borne back ceaselessly into the past."
  },
  {
    id: "miguel-cervantes",
    name: "Miguel de Cervantes",
    initials: "MC",
    color: "from-orange-600 to-red-700",
    nationality: "Spanish",
    era: "1547–1616",
    bio: "Spanish novelist, poet, and playwright, author of Don Quixote, widely considered the first modern novel.",
    bookCount: 1,
    genre: "Fiction",
    quote: "The truth may be stretched thin, but it never breaks, and it always surfaces above lies, as oil floats on water."
  },
  {
    id: "william-shakespeare",
    name: "William Shakespeare",
    initials: "WS",
    color: "from-emerald-600 to-teal-700",
    nationality: "English",
    era: "1564–1616",
    bio: "English playwright, poet, and actor, widely regarded as the greatest writer in the English language.",
    bookCount: 37,
    genre: "Drama",
    quote: "To be, or not to be, that is the question."
  },
  {
    id: "homer",
    name: "Homer",
    initials: "HO",
    color: "from-cyan-600 to-blue-800",
    nationality: "Greek",
    era: "8th Century BC",
    bio: "Legendary ancient Greek epic poet credited with authoring the Iliad and the Odyssey.",
    bookCount: 2,
    genre: "Epic",
    quote: "Of all creatures that breathe and move upon the earth, nothing is bred that is weaker than man."
  },
  {
    id: "leo-tolstoy",
    name: "Leo Tolstoy",
    initials: "LT",
    color: "from-violet-600 to-purple-800",
    nationality: "Russian",
    era: "1828–1910",
    bio: "Russian writer regarded as one of the greatest authors of all time, best known for War and Peace and Anna Karenina.",
    bookCount: 12,
    genre: "Literary Fiction",
    quote: "Everyone thinks of changing the world, but no one thinks of changing himself."
  }
];
