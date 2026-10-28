export type Manufacturer = {
  slug: string;
  name: string;
  country: string;
  description: string;
  website: string;
};

export type Phone = {
  slug: string;
  name: string;
  manufacturer: string;
  price: string;
  announcementDate: string;
  releaseDate: string;
  status: 'Upcoming' | 'Released' | 'Rumored';
  os: string;
  display: string;
  chipset: string;
  battery: string;
  camera: string;
  rating: number;
  highlights: string[];
};

export type Review = {
  slug: string;
  title: string;
  score: number;
  excerpt: string;
  author: string;
  publishedAt: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  author: string;
};
