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
  specs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    battery: string;
    charging: string;
    camera: string;
  };
};

export type NewsArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  author: string;
};

export type Review = {
  slug: string;
  title: string;
  score: number;
  excerpt: string;
  author: string;
  publishedAt: string;
};

export const manufacturers: Manufacturer[] = [
  {
    slug: 'samsung',
    name: 'Samsung',
    country: 'South Korea',
    description: 'Global Android leader with premium and mainstream ranges spanning Galaxy S, Z, and A series.',
    website: 'https://www.samsung.com'
  },
  {
    slug: 'google',
    name: 'Google',
    country: 'United States',
    description: 'AI-first Android brand focused on camera innovation and clean software experiences.',
    website: 'https://store.google.com'
  },
  {
    slug: 'apple',
    name: 'Apple',
    country: 'United States',
    description: 'Premium hardware and tightly integrated iOS ecosystem specialist.',
    website: 'https://www.apple.com'
  },
  {
    slug: 'oneplus',
    name: 'OnePlus',
    country: 'China',
    description: 'Performance-focused manufacturer known for fast charging and value-oriented flagship phones.',
    website: 'https://www.oneplus.com'
  },
  {
    slug: 'nothing',
    name: 'Nothing',
    country: 'United Kingdom',
    description: 'Design-led brand known for transparent industrial styling and clean Android experiences.',
    website: 'https://www.nothing.tech'
  }
];

export const phones: Phone[] = [
  {
    slug: 'samsung-galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    manufacturer: 'samsung',
    price: '$1,299',
    announcementDate: '2025-01-10',
    releaseDate: '2025-01-24',
    status: 'Released',
    os: 'Android 15 / One UI 7',
    display: '6.9-inch 2K AMOLED',
    chipset: 'Snapdragon 8 Elite',
    battery: '5000 mAh',
    camera: '200MP + 50MP + 50MP + 10MP',
    rating: 4.9,
    highlights: ['Titanium frame', 'AI photo editing', 'Ultra-wide 5x zoom'],
    specs: {
      display: '6.9-inch QHD+ Dynamic AMOLED 2X, 120Hz',
      processor: 'Snapdragon 8 Elite for Galaxy',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB / 1TB',
      battery: '5000mAh',
      charging: '45W wired, 15W wireless',
      camera: '200MP main, 50MP ultrawide, 50MP periscope, 10MP telephoto'
    }
  },
  {
    slug: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    manufacturer: 'google',
    price: '$999',
    announcementDate: '2025-08-13',
    releaseDate: '2025-08-22',
    status: 'Released',
    os: 'Android 15',
    display: '6.3-inch LTPO OLED',
    chipset: 'Google Tensor G4',
    battery: '5050 mAh',
    camera: '50MP + 48MP + 48MP',
    rating: 4.8,
    highlights: ['AI call screening', 'Gemini features', 'Excellent computational photography'],
    specs: {
      display: '6.3-inch OLED, 120Hz, 2856 x 1280',
      processor: 'Google Tensor G4',
      ram: '16GB',
      storage: '128GB / 256GB / 512GB',
      battery: '5050mAh',
      charging: '27W wired, 23W wireless',
      camera: '50MP main, 48MP ultrawide, 48MP telephoto'
    }
  },
  {
    slug: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    manufacturer: 'apple',
    price: '$999',
    announcementDate: '2025-09-09',
    releaseDate: '2025-09-20',
    status: 'Released',
    os: 'iOS 18',
    display: '6.3-inch Super Retina XDR',
    chipset: 'Apple A18 Pro',
    battery: '3582 mAh',
    camera: '48MP + 48MP + 12MP',
    rating: 4.8,
    highlights: ['A18 Pro', 'Camera Control', 'USB-C 10Gbps'],
    specs: {
      display: '6.3-inch LTPO OLED, 120Hz',
      processor: 'Apple A18 Pro',
      ram: '8GB',
      storage: '128GB / 256GB / 512GB / 1TB',
      battery: '3582mAh',
      charging: 'USB-C PD 2.0, MagSafe',
      camera: '48MP Fusion, 48MP ultrawide, 12MP telephoto'
    }
  },
  {
    slug: 'oneplus-12',
    name: 'OnePlus 12',
    manufacturer: 'oneplus',
    price: '$799',
    announcementDate: '2024-12-05',
    releaseDate: '2024-12-13',
    status: 'Released',
    os: 'Android 14 / ColorOS 14',
    display: '6.82-inch BOE OLED',
    chipset: 'Snapdragon 8 Gen 3',
    battery: '5400 mAh',
    camera: '50MP + 48MP + 64MP',
    rating: 4.7,
    highlights: ['120Hz AMOLED', 'Very fast charging', 'Strong value'],
    specs: {
      display: '6.82-inch 2K OLED, 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB',
      battery: '5400mAh',
      charging: '100W wired, 50W wireless',
      camera: '50MP main, 48MP ultrawide, 64MP periscope'
    }
  },
  {
    slug: 'nothing-phone-2',
    name: 'Nothing Phone (2)',
    manufacturer: 'nothing',
    price: '$599',
    announcementDate: '2023-07-11',
    releaseDate: '2023-07-21',
    status: 'Released',
    os: 'Android 14',
    display: '6.7-inch OLED',
    chipset: 'Snapdragon 8+ Gen 1',
    battery: '4700 mAh',
    camera: '50MP + 50MP',
    rating: 4.6,
    highlights: ['Glyph interface', 'Clean Android', 'Strong mid-range value'],
    specs: {
      display: '6.7-inch OLED, 120Hz',
      processor: 'Snapdragon 8+ Gen 1',
      ram: '12GB',
      storage: '256GB / 512GB',
      battery: '4700mAh',
      charging: '45W wired',
      camera: '50MP main, 50MP ultrawide'
    }
  }
];

export const newsArticles: NewsArticle[] = [
  {
    slug: 'ai-photo-tooling-rising',
    title: 'AI Photo Tooling Is Redefining Flagship Camera Experiences',
    category: 'Camera',
    excerpt: 'Manufacturers are blending computational photography, live previews, and generative editing into the premium experience.',
    publishedAt: '2025-01-17',
    author: 'Maya Chen'
  },
  {
    slug: 'battery-breakthroughs-2025',
    title: 'Battery Breakthroughs and Charging Speeds Keep Raising the Bar',
    category: 'Battery',
    excerpt: 'Fast charging, larger cells, and silicon-carbon chemistry are becoming standard in top-tier devices.',
    publishedAt: '2025-01-12',
    author: 'Daniel Brooks'
  },
  {
    slug: 'foldables-are-maturing',
    title: 'Foldables Are Maturing Beyond the Niche',
    category: 'Industry',
    excerpt: 'Refined hinges, larger cover screens, and durability updates are changing adoption curves.',
    publishedAt: '2024-12-06',
    author: 'Nina Patel'
  }
];

export const reviews: Review[] = [
  {
    slug: 'samsung-galaxy-s25-ultra-review',
    title: 'Samsung Galaxy S25 Ultra review',
    score: 9.5,
    excerpt: 'A polished, feature-rich flagship that balances performance, camera range, and AI tooling.',
    author: 'Editorial Team',
    publishedAt: '2025-02-01'
  },
  {
    slug: 'google-pixel-9-pro-review',
    title: 'Google Pixel 9 Pro review',
    score: 9.2,
    excerpt: 'The Pixel 9 Pro remains one of the most refined camera-first Android phones around.',
    author: 'Ari Gomez',
    publishedAt: '2025-01-29'
  },
  {
    slug: 'oneplus-12-review',
    title: 'OnePlus 12 review',
    score: 8.9,
    excerpt: 'A performance-first phone with excellent value, quick charging, and strong display quality.',
    author: 'Katherine Hall',
    publishedAt: '2025-01-19'
  }
];

export function getPhoneBySlug(slug: string) {
  return phones.find((phone) => phone.slug === slug);
}

export function getPhonesByManufacturer(slug: string) {
  return phones.filter((phone) => phone.manufacturer === slug);
}

export function getLatestPhones() {
  return phones.slice(0, 4);
}

export function getArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function getReviewBySlug(slug: string) {
  return reviews.find((review) => review.slug === slug);
}
