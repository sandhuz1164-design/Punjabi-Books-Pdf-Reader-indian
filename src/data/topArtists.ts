export interface TopArtist {
  id: string;
  name: string;
  initials: string;
  color: string;
  genre: string;
  hits: number;
  appleMusicUrl: string;
}

export const topArtists: TopArtist[] = [
  {
    id: "karan-aujla",
    name: "Karan Aujla",
    initials: "KA",
    color: "from-purple-600 to-pink-600",
    genre: "Hip-Hop/Rap",
    hits: 7,
    appleMusicUrl: "https://music.apple.com/in/artist/karan-aujla/914892130"
  },
  {
    id: "arjan-dhillon",
    name: "Arjan Dhillon",
    initials: "AD",
    color: "from-blue-600 to-indigo-700",
    genre: "Punjabi Pop",
    hits: 6,
    appleMusicUrl: "https://music.apple.com/in/artist/arjan-dhillon/1426451834"
  },
  {
    id: "diljit-dosanjh",
    name: "Diljit Dosanjh",
    initials: "DD",
    color: "from-amber-500 to-orange-600",
    genre: "Punjabi/Pop",
    hits: 4,
    appleMusicUrl: "https://music.apple.com/in/artist/diljit-dosanjh/423087540"
  },
  {
    id: "sidhu-moose-wala",
    name: "Sidhu Moose Wala",
    initials: "SM",
    color: "from-red-600 to-rose-700",
    genre: "Hip-Hop/Rap",
    hits: 3,
    appleMusicUrl: "https://music.apple.com/in/artist/sidhu-moose-wala/1257856923"
  },
  {
    id: "shubh",
    name: "Shubh",
    initials: "SH",
    color: "from-emerald-600 to-teal-700",
    genre: "Punjabi Pop",
    hits: 3,
    appleMusicUrl: "https://music.apple.com/in/artist/shubh/1585737475"
  },
  {
    id: "amrinder-gill",
    name: "Amrinder Gill",
    initials: "AG",
    color: "from-cyan-600 to-blue-700",
    genre: "Punjabi Folk",
    hits: 3,
    appleMusicUrl: "https://music.apple.com/in/artist/amrinder-gill/205696074"
  },
  {
    id: "himmat-sandhu",
    name: "Himmat Sandhu",
    initials: "HS",
    color: "from-violet-600 to-purple-700",
    genre: "Punjabi Pop",
    hits: 3,
    appleMusicUrl: "https://music.apple.com/in/artist/himmat-sandhu/1251968836"
  },
  {
    id: "nirvair-pannu",
    name: "Nirvair Pannu",
    initials: "NP",
    color: "from-pink-500 to-rose-600",
    genre: "Punjabi Pop",
    hits: 3,
    appleMusicUrl: "https://music.apple.com/in/artist/nirvair-pannu/1476066543"
  },
  {
    id: "guru-randhawa",
    name: "Guru Randhawa",
    initials: "GR",
    color: "from-orange-500 to-red-600",
    genre: "Punjabi Pop",
    hits: 3,
    appleMusicUrl: "https://music.apple.com/in/artist/guru-randhawa/1107047514"
  },
  {
    id: "jordan-sandhu",
    name: "Jordan Sandhu",
    initials: "JS",
    color: "from-indigo-600 to-blue-800",
    genre: "Punjabi Pop",
    hits: 3,
    appleMusicUrl: "https://music.apple.com/in/artist/jordan-sandhu/1189926963"
  }
];
