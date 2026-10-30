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

export type LatestDevice = {
  slug: string;
  name: string;
  brand: string;
};

export type DailyInterest = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  author: string;
};

export type TopFan = {
  rank: number;
  name: string;
  href: string;
};

export type PopularComparison = {
  title: string;
  href: string;
};

export type FeaturedVideo = {
  title: string;
  href: string;
  category: string;
  duration: string;
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
    slug: 'apple',
    name: 'Apple',
    country: 'United States',
    description: 'Premium hardware and tightly integrated iOS ecosystem specialist.',
    website: 'https://www.apple.com'
  },
  {
    slug: 'huawei',
    name: 'Huawei',
    country: 'China',
    description: 'Global telecommunications giant known for innovative camera technology and HarmonyOS.',
    website: 'https://www.huawei.com'
  },
  {
    slug: 'nokia',
    name: 'Nokia',
    country: 'Finland',
    description: 'Iconic mobile brand offering durable Android smartphones with clean software.',
    website: 'https://www.nokia.com'
  },
  {
    slug: 'sony',
    name: 'Sony',
    country: 'Japan',
    description: 'Premium multimedia-focused smartphones with pro-grade camera and display technology.',
    website: 'https://www.sony.com'
  },
  {
    slug: 'lg',
    name: 'LG',
    country: 'South Korea',
    description: 'Former major smartphone manufacturer known for innovative designs and displays.',
    website: 'https://www.lg.com'
  },
  {
    slug: 'htc',
    name: 'HTC',
    country: 'Taiwan',
    description: 'Pioneer in Android smartphones now focused on niche and VR-integrated devices.',
    website: 'https://www.htc.com'
  },
  {
    slug: 'motorola',
    name: 'Motorola',
    country: 'United States',
    description: 'Lenovo-owned brand delivering value-oriented phones with near-stock Android.',
    website: 'https://www.motorola.com'
  },
  {
    slug: 'lenovo',
    name: 'Lenovo',
    country: 'China',
    description: 'Global technology company producing smartphones and gaming-focused Legion devices.',
    website: 'https://www.lenovo.com'
  },
  {
    slug: 'xiaomi',
    name: 'Xiaomi',
    country: 'China',
    description: 'Value-driven brand offering flagship specs at competitive prices across multiple sub-brands.',
    website: 'https://www.mi.com'
  },
  {
    slug: 'google',
    name: 'Google',
    country: 'United States',
    description: 'AI-first Android brand focused on camera innovation and clean software experiences.',
    website: 'https://store.google.com'
  },
  {
    slug: 'honor',
    name: 'Honor',
    country: 'China',
    description: 'Former Huawei sub-brand now independent, delivering premium devices with MagicOS.',
    website: 'https://www.honor.com'
  },
  {
    slug: 'oppo',
    name: 'Oppo',
    country: 'China',
    description: 'Camera and fast-charging innovator with a strong presence in Asia and Europe.',
    website: 'https://www.oppo.com'
  },
  {
    slug: 'realme',
    name: 'Realme',
    country: 'China',
    description: 'Youth-focused brand offering aggressive specs-to-price ratio smartphones.',
    website: 'https://www.realme.com'
  },
  {
    slug: 'vivo',
    name: 'Vivo',
    country: 'China',
    description: 'Camera-centric brand with ZEISS optics partnership and premium X-series lineup.',
    website: 'https://www.vivo.com'
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
  },
  {
    slug: 'asus',
    name: 'Asus',
    country: 'Taiwan',
    description: 'Known for ROG Phone gaming series and Zenfone compact flagship smartphones.',
    website: 'https://www.asus.com'
  },
  {
    slug: 'zte',
    name: 'ZTE',
    country: 'China',
    description: 'Telecommunications company producing Axon and Blade series smartphones.',
    website: 'https://www.zte.com'
  },
  {
    slug: 'nubia',
    name: 'Nubia',
    country: 'China',
    description: 'ZTE sub-brand specializing in gaming phones and creative camera features.',
    website: 'https://www.nubia.com'
  },
  {
    slug: 'tcl',
    name: 'TCL',
    country: 'China',
    description: 'Display technology specialist producing affordable smartphones with quality screens.',
    website: 'https://www.tcl.com'
  },
  {
    slug: 'meizu',
    name: 'Meizu',
    country: 'China',
    description: 'Design-conscious Chinese brand now under Geely, known for Flyme OS.',
    website: 'https://www.meizu.com'
  },
  {
    slug: 'infinix',
    name: 'Infinix',
    country: 'China',
    description: 'Transsion-owned brand targeting emerging markets with feature-packed affordable phones.',
    website: 'https://www.infinixmobility.com'
  },
  {
    slug: 'tecno',
    name: 'Tecno',
    country: 'China',
    description: 'Transsion-owned brand popular in Africa and South Asia for budget-friendly smartphones.',
    website: 'https://www.tecno-mobile.com'
  },
  {
    slug: 'itel',
    name: 'Itel',
    country: 'China',
    description: 'Entry-level smartphone brand under Transsion Holdings for emerging markets.',
    website: 'https://www.itel-mobile.com'
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
  },
  {
    slug: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    manufacturer: 'apple',
    price: '$1,199',
    announcementDate: '2024-09-09',
    releaseDate: '2024-09-20',
    status: 'Released',
    os: 'iOS 18',
    display: '6.9-inch Super Retina XDR',
    chipset: 'Apple A18 Pro',
    battery: '4685 mAh',
    camera: '48MP + 48MP + 12MP',
    rating: 4.9,
    highlights: ['A18 Pro performance', '5x tetraprism zoom', 'Camera Control'],
    specs: {
      display: '6.9-inch LTPO OLED, 120Hz',
      processor: 'Apple A18 Pro',
      ram: '8GB',
      storage: '256GB / 512GB / 1TB',
      battery: '4685mAh',
      charging: '30W wired, MagSafe 25W',
      camera: '48MP Fusion, 48MP ultrawide, 12MP 5x telephoto'
    }
  },
  {
    slug: 'samsung-galaxy-s25',
    name: 'Samsung Galaxy S25',
    manufacturer: 'samsung',
    price: '$799',
    announcementDate: '2025-01-22',
    releaseDate: '2025-02-07',
    status: 'Released',
    os: 'Android 15 / One UI 7',
    display: '6.2-inch Dynamic AMOLED',
    chipset: 'Snapdragon 8 Elite',
    battery: '4000 mAh',
    camera: '50MP + 12MP + 10MP',
    rating: 4.7,
    highlights: ['Compact flagship', 'Galaxy AI tools', 'Seven years of updates'],
    specs: {
      display: '6.2-inch LTPO AMOLED, 120Hz',
      processor: 'Snapdragon 8 Elite for Galaxy',
      ram: '8GB / 12GB',
      storage: '128GB / 256GB / 512GB',
      battery: '4000mAh',
      charging: '25W wired, 15W wireless',
      camera: '50MP main, 12MP ultrawide, 10MP 3x telephoto'
    }
  },
  {
    slug: 'samsung-galaxy-z-fold6',
    name: 'Samsung Galaxy Z Fold6',
    manufacturer: 'samsung',
    price: '$1,899',
    announcementDate: '2024-07-10',
    releaseDate: '2024-07-24',
    status: 'Released',
    os: 'Android 14 / One UI 6.1',
    display: '7.6-inch Foldable AMOLED',
    chipset: 'Snapdragon 8 Gen 3',
    battery: '4400 mAh',
    camera: '50MP + 12MP + 10MP',
    rating: 4.6,
    highlights: ['Slim book-style foldable', 'S Pen support', 'Multitasking canvas'],
    specs: {
      display: '7.6-inch foldable AMOLED 2X, 120Hz',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12GB',
      storage: '256GB / 512GB / 1TB',
      battery: '4400mAh',
      charging: '25W wired, 15W wireless',
      camera: '50MP main, 12MP ultrawide, 10MP 3x telephoto'
    }
  },
  {
    slug: 'oneplus-13',
    name: 'OnePlus 13',
    manufacturer: 'oneplus',
    price: '$899',
    announcementDate: '2024-10-31',
    releaseDate: '2025-01-07',
    status: 'Released',
    os: 'Android 15 / OxygenOS 15',
    display: '6.82-inch LTPO AMOLED',
    chipset: 'Snapdragon 8 Elite',
    battery: '6000 mAh',
    camera: '50MP + 50MP + 50MP',
    rating: 4.8,
    highlights: ['6000mAh silicon-carbon battery', '100W charging', 'IP69 durability'],
    specs: {
      display: '6.82-inch QHD+ LTPO AMOLED, 120Hz',
      processor: 'Snapdragon 8 Elite',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB / 1TB',
      battery: '6000mAh',
      charging: '100W wired, 50W wireless',
      camera: '50MP main, 50MP ultrawide, 50MP 3x periscope'
    }
  },
  {
    slug: 'xiaomi-15-pro',
    name: 'Xiaomi 15 Pro',
    manufacturer: 'xiaomi',
    price: '$899',
    announcementDate: '2024-10-29',
    releaseDate: '2024-11-15',
    status: 'Released',
    os: 'Android 15 / HyperOS 2',
    display: '6.73-inch LTPO AMOLED',
    chipset: 'Snapdragon 8 Elite',
    battery: '5400 mAh',
    camera: '50MP + 50MP + 50MP',
    rating: 4.8,
    highlights: ['Leica-tuned cameras', 'HyperOS 2', '90W fast charging'],
    specs: {
      display: '6.73-inch QHD+ LTPO AMOLED, 120Hz',
      processor: 'Snapdragon 8 Elite',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB / 1TB',
      battery: '5400mAh',
      charging: '90W wired, 50W wireless',
      camera: '50MP main, 50MP ultrawide, 50MP 5x periscope'
    }
  },
  {
    slug: 'xiaomi-15-ultra',
    name: 'Xiaomi 15 Ultra',
    manufacturer: 'xiaomi',
    price: '$1,099',
    announcementDate: '2025-03-02',
    releaseDate: '2025-03-15',
    status: 'Released',
    os: 'Android 15 / HyperOS 2',
    display: '6.73-inch LTPO AMOLED',
    chipset: 'Snapdragon 8 Elite',
    battery: '6000 mAh',
    camera: '200MP + 50MP + 50MP + 50MP',
    rating: 4.9,
    highlights: ['200MP Leica main camera', 'Pro photography kit', '6000mAh battery'],
    specs: {
      display: '6.73-inch QHD+ LTPO AMOLED, 120Hz',
      processor: 'Snapdragon 8 Elite',
      ram: '16GB',
      storage: '512GB / 1TB',
      battery: '6000mAh',
      charging: '90W wired, 80W wireless',
      camera: '200MP main, 50MP ultrawide, 50MP 3x, 50MP 5x'
    }
  },
  {
    slug: 'samsung-galaxy-a56',
    name: 'Samsung Galaxy A56',
    manufacturer: 'samsung',
    price: '$499',
    announcementDate: '2025-03-02',
    releaseDate: '2025-03-10',
    status: 'Released',
    os: 'Android 15 / One UI 7',
    display: '6.7-inch Super AMOLED',
    chipset: 'Exynos 1580',
    battery: '5000 mAh',
    camera: '50MP + 12MP + 5MP',
    rating: 4.3,
    highlights: ['Six OS upgrades', 'Super AMOLED 120Hz', 'Slim metal frame'],
    specs: {
      display: '6.7-inch Super AMOLED, 120Hz',
      processor: 'Exynos 1580',
      ram: '8GB / 12GB',
      storage: '128GB / 256GB',
      battery: '5000mAh',
      charging: '45W wired',
      camera: '50MP main, 12MP ultrawide, 5MP macro'
    }
  },
  {
    slug: 'nothing-phone-3',
    name: 'Nothing Phone 3',
    manufacturer: 'nothing',
    price: '$799',
    announcementDate: '2025-07-15',
    releaseDate: '2025-07-15',
    status: 'Released',
    os: 'Android 15 / Nothing OS 3',
    display: '6.67-inch OLED',
    chipset: 'Snapdragon 8s Gen 4',
    battery: '5000 mAh',
    camera: '50MP + 50MP + 50MP',
    rating: 4.6,
    highlights: ['Glyph Matrix interface', 'Transparent design', 'Clean software'],
    specs: {
      display: '6.67-inch OLED, 120Hz',
      processor: 'Snapdragon 8s Gen 4',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB',
      battery: '5000mAh',
      charging: '65W wired, 15W wireless',
      camera: '50MP main, 50MP ultrawide, 50MP 3x telephoto'
    }
  },
  {
    slug: 'vivo-x200-pro',
    name: 'Vivo X200 Pro',
    manufacturer: 'vivo',
    price: '$1,099',
    announcementDate: '2024-10-14',
    releaseDate: '2024-11-15',
    status: 'Released',
    os: 'Android 15 / OriginOS 5',
    display: '6.78-inch LTPO AMOLED',
    chipset: 'MediaTek Dimensity 9400',
    battery: '6000 mAh',
    camera: '50MP + 200MP + 50MP',
    rating: 4.8,
    highlights: ['200MP ZEISS telephoto', '6000mAh battery', 'True-to-life color'],
    specs: {
      display: '6.78-inch LTPO AMOLED, 120Hz',
      processor: 'MediaTek Dimensity 9400',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB / 1TB',
      battery: '6000mAh',
      charging: '90W wired, 30W wireless',
      camera: '50MP main, 200MP 3.7x periscope, 50MP ultrawide'
    }
  },
  {
    slug: 'honor-magic7-pro',
    name: 'Honor Magic7 Pro',
    manufacturer: 'honor',
    price: '$1,199',
    announcementDate: '2024-10-30',
    releaseDate: '2024-11-20',
    status: 'Released',
    os: 'Android 15 / MagicOS 9',
    display: '6.8-inch LTPO OLED',
    chipset: 'Snapdragon 8 Elite',
    battery: '5850 mAh',
    camera: '50MP + 200MP + 50MP',
    rating: 4.7,
    highlights: ['AI motion capture', '200MP periscope', 'Quad-curved display'],
    specs: {
      display: '6.8-inch LTPO OLED, 120Hz',
      processor: 'Snapdragon 8 Elite',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB / 1TB',
      battery: '5850mAh',
      charging: '100W wired, 80W wireless',
      camera: '50MP main, 200MP 3x periscope, 50MP ultrawide'
    }
  },
  {
    slug: 'oppo-find-x8',
    name: 'Oppo Find X8',
    manufacturer: 'oppo',
    price: '$1,099',
    announcementDate: '2024-10-24',
    releaseDate: '2024-11-21',
    status: 'Released',
    os: 'Android 15 / ColorOS 15',
    display: '6.59-inch LTPO AMOLED',
    chipset: 'MediaTek Dimensity 9400',
    battery: '5630 mAh',
    camera: '50MP + 50MP + 50MP',
    rating: 4.7,
    highlights: ['Hasselblad portrait mode', 'Compact flagship body', '80W charging'],
    specs: {
      display: '6.59-inch LTPO AMOLED, 120Hz',
      processor: 'MediaTek Dimensity 9400',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB / 1TB',
      battery: '5630mAh',
      charging: '80W wired, 50W wireless',
      camera: '50MP main, 50MP 3x periscope, 50MP ultrawide'
    }
  },
  {
    slug: 'realme-gt7-pro',
    name: 'Realme GT7 Pro',
    manufacturer: 'realme',
    price: '$799',
    announcementDate: '2024-11-04',
    releaseDate: '2024-11-26',
    status: 'Released',
    os: 'Android 15 / Realme UI 6',
    display: '6.78-inch LTPO AMOLED',
    chipset: 'Snapdragon 8 Elite',
    battery: '6500 mAh',
    camera: '50MP + 50MP + 8MP',
    rating: 4.6,
    highlights: ['6500mAh battery', 'IP69 rating', '1.5K display'],
    specs: {
      display: '6.78-inch 1.5K LTPO AMOLED, 120Hz',
      processor: 'Snapdragon 8 Elite',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB / 1TB',
      battery: '6500mAh',
      charging: '120W wired',
      camera: '50MP main, 50MP 3x periscope, 8MP ultrawide'
    }
  },
  {
    slug: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24',
    manufacturer: 'samsung',
    price: '$799',
    announcementDate: '2024-01-17',
    releaseDate: '2024-01-31',
    status: 'Released',
    os: 'Android 14 / One UI 6.1',
    display: '6.2-inch Dynamic AMOLED',
    chipset: 'Exynos 2400',
    battery: '4000 mAh',
    camera: '50MP + 12MP + 10MP',
    rating: 4.6,
    highlights: ['Compact form factor', 'Galaxy AI', 'Seven years of updates'],
    specs: {
      display: '6.2-inch LTPO AMOLED, 120Hz',
      processor: 'Exynos 2400',
      ram: '8GB',
      storage: '128GB / 256GB / 512GB',
      battery: '4000mAh',
      charging: '25W wired, 15W wireless',
      camera: '50MP main, 12MP ultrawide, 10MP 3x telephoto'
    }
  },
  {
    slug: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    manufacturer: 'apple',
    price: '$1,199',
    announcementDate: '2023-09-12',
    releaseDate: '2023-09-22',
    status: 'Released',
    os: 'iOS 17',
    display: '6.7-inch Super Retina XDR',
    chipset: 'Apple A17 Pro',
    battery: '4441 mAh',
    camera: '48MP + 12MP + 12MP',
    rating: 4.7,
    highlights: ['Titanium frame', '5x periscope zoom', 'Action button'],
    specs: {
      display: '6.7-inch LTPO OLED, 120Hz',
      processor: 'Apple A17 Pro',
      ram: '8GB',
      storage: '256GB / 512GB / 1TB',
      battery: '4441mAh',
      charging: '27W wired, MagSafe 15W',
      camera: '48MP main, 12MP ultrawide, 12MP 5x telephoto'
    }
  },
  {
    slug: 'google-pixel-9-pro-fold',
    name: 'Google Pixel 9 Pro Fold',
    manufacturer: 'google',
    price: '$1,799',
    announcementDate: '2024-08-13',
    releaseDate: '2024-09-04',
    status: 'Released',
    os: 'Android 14',
    display: '8.0-inch Foldable OLED',
    chipset: 'Google Tensor G4',
    battery: '4650 mAh',
    camera: '48MP + 10.8MP + 10.8MP',
    rating: 4.5,
    highlights: ['Slim foldable design', 'Gemini AI', 'Eight-inch inner display'],
    specs: {
      display: '8.0-inch foldable LTPO OLED, 120Hz',
      processor: 'Google Tensor G4',
      ram: '16GB',
      storage: '256GB / 512GB',
      battery: '4650mAh',
      charging: '21W wired, 7.5W wireless',
      camera: '48MP main, 10.8MP ultrawide, 10.8MP 5x telephoto'
    }
  }
];

export const newsArticles: NewsArticle[] = [
  {
    slug: 'samsung-galaxy-s27-charging-certification',
    title: "New certification corroborates Samsung Galaxy S27's charging speed",
    category: 'Rumor',
    excerpt: 'The Samsung Galaxy S27 has received a new certification from Battery APC, corroborating earlier reports about its fast charging capabilities.',
    publishedAt: '2025-10-29',
    author: 'Ivan Kowalski'
  },
  {
    slug: 'meble-speed-5g-launch',
    title: 'Meble to launch its second smartphone, the Speed 5G',
    category: 'Launch',
    excerpt: 'Meble is gearing up to launch its second smartphone, the Speed 5G, a new budget-friendly 5G device aimed at value-conscious buyers.',
    publishedAt: '2025-10-29',
    author: 'Sagar Patel'
  },
  {
    slug: 'iqoo-16-global-launch-rumor',
    title: "Here's where the iQOO 16 is rumored to launch outside China",
    category: 'Rumor',
    excerpt: 'New reports suggest the iQOO 16 is set to launch in several markets outside China, with India and Europe among the first regions.',
    publishedAt: '2025-10-29',
    author: 'Ranjit Kumar'
  },
  {
    slug: 'super-vee-100-v50-pro-max-india-sale',
    title: 'Super Vee! 100 and Vee! V50 Pro Max go on sale in India',
    category: 'Launch',
    excerpt: 'The Super Vee! 100 and Vee! V50 Pro Max are now available for purchase in India, offering competitive specs at affordable price points.',
    publishedAt: '2025-10-28',
    author: 'Priya Sharma'
  },
  {
    slug: 'iqoo-pad-pro-m5-screen',
    title: "iQOO Pad Pro brings the Ultra's M5/4 screen and big battery for less",
    category: 'Launch',
    excerpt: 'The new iQOO Pad Pro features the same premium M5/4 display technology found in flagship tablets but at a significantly lower price point.',
    publishedAt: '2025-10-28',
    author: 'Chen Wei'
  },
  {
    slug: 'huawei-3-fold-wide-screen-leak',
    title: "Huawei's 3-fold board to debut with a wide screen phone, leak claims",
    category: 'Rumor',
    excerpt: 'A new leak suggests Huawei is preparing a tri-fold device that will debut alongside a wide-screen phone form factor.',
    publishedAt: '2025-10-28',
    author: 'Lin Zhang'
  },
  {
    slug: 'redmi-civi-neo-vs-huawei-flip-pricing',
    title: 'The new Redmi Civi Neo bats cost half as much as the Huawei Flip list',
    category: 'Comparison',
    excerpt: 'Xiaomi positions the new Redmi Civi Neo as a compelling alternative to the Huawei Flip, offering similar features at half the price.',
    publishedAt: '2025-10-28',
    author: 'Maya Chen'
  },
  {
    slug: 'huawei-xin-40-launch',
    title: 'Huawei Xin 40 quietly launches with a 108MP camera and 5,100mAh battery',
    category: 'Launch',
    excerpt: 'Huawei has quietly launched the Xin 40, featuring a 108MP main camera sensor and a large 5,100mAh battery for all-day usage.',
    publishedAt: '2025-10-27',
    author: 'Daniel Brooks'
  },
  {
    slug: '3k-buyers-chip-recovery-shortage-2026',
    title: '3K buyers expats count 175 members, warns that the recovery shortage will last through 2026',
    category: 'Industry',
    excerpt: 'Industry analysts warn that the ongoing chip recovery shortage is expected to persist through 2026, impacting device availability.',
    publishedAt: '2025-10-27',
    author: 'Nina Patel'
  },
  {
    slug: 'motorola-edge-x1-pro-android-17',
    title: 'Motorola Edge X1 Pro starts receiving the update to Android 17',
    category: 'Software',
    excerpt: 'Motorola has begun rolling out the Android 17 update to the Edge X1 Pro, bringing new features and security improvements.',
    publishedAt: '2025-10-27',
    author: 'Katherine Hall'
  },
  {
    slug: 'samsung-sleep-apnea-galaxy-watches-ring',
    title: "Samsung's sleep apnea detection gets better on the Galaxy Watches and Galaxy Ring",
    category: 'Wearable',
    excerpt: 'Samsung has improved its sleep apnea detection algorithm across Galaxy Watch and Galaxy Ring devices with enhanced accuracy.',
    publishedAt: '2025-10-26',
    author: 'Ari Gomez'
  },
  {
    slug: 'iqoo-neo12-9000mah-battery-185hz',
    title: 'iQOO Neo12 debuts with a 9,000mAh battery, 185Hz display',
    category: 'Launch',
    excerpt: 'The iQOO Neo12 arrives with a massive 9,000mAh battery and a 185Hz refresh rate display, setting new benchmarks for the mid-range segment.',
    publishedAt: '2025-10-26',
    author: 'Ranjit Kumar'
  }
];

export const reviews: Review[] = [
  {
    slug: 'vivo-x500-pro-max-review',
    title: 'vivo X500 Pro Max review',
    score: 9.0,
    excerpt: 'The vivo X500 Pro Max delivers an exceptional camera system with ZEISS optics, a stunning display, and flagship performance that rivals the best.',
    author: 'Editorial Team',
    publishedAt: '2025-10-28'
  },
  {
    slug: 'galaxy-tab-s10-ultra-review',
    title: 'Galaxy Tab S10 Ultra review',
    score: 8.8,
    excerpt: 'Samsung refines its tablet flagship with a brighter display, faster processor, and improved S Pen latency for creative professionals.',
    author: 'Ari Gomez',
    publishedAt: '2025-10-25'
  },
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

const brandName = (slug: string) => manufacturers.find((brand) => brand.slug === slug)?.name ?? slug;

export const latestDevices: LatestDevice[] = [...phones]
  .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
  .slice(0, 12)
  .map((phone) => ({
    slug: phone.slug,
    name: phone.name,
    brand: brandName(phone.manufacturer)
  }));

export const dailyInterests: DailyInterest[] = [
  {
    slug: 'samsung-galaxy-s27-charging-certification',
    title: "New certification corroborates Samsung Galaxy S27's charging speed",
    category: 'Rumor',
    excerpt: 'The Samsung Galaxy S27 has received a new certification from Battery APC.',
    publishedAt: '2025-10-29',
    author: 'Ivan Kowalski'
  },
  {
    slug: 'iqoo-neo12-9000mah-battery-185hz',
    title: 'iQOO Neo12 debuts with a 9,000mAh battery, 185Hz display',
    category: 'Launch',
    excerpt: 'The iQOO Neo12 sets new benchmarks with its massive battery and fast display.',
    publishedAt: '2025-10-26',
    author: 'Ranjit Kumar'
  },
  {
    slug: 'huawei-3-fold-wide-screen-leak',
    title: "Huawei's 3-fold board to debut with a wide screen phone, leak claims",
    category: 'Rumor',
    excerpt: 'Huawei is preparing a tri-fold device alongside a wide-screen phone form factor.',
    publishedAt: '2025-10-28',
    author: 'Lin Zhang'
  }
];

export const topFans: TopFan[] = [
  {
    rank: 1,
    name: 'Samsung Galaxy S25 Ultra',
    href: '/phones/samsung-galaxy-s25-ultra'
  },
  {
    rank: 2,
    name: 'iPhone 16 Pro Max',
    href: '/phones/iphone-16-pro-max'
  },
  {
    rank: 3,
    name: 'Samsung Galaxy S25',
    href: '/phones/samsung-galaxy-s25'
  },
  {
    rank: 4,
    name: 'Google Pixel 9 Pro',
    href: '/phones/google-pixel-9-pro'
  },
  {
    rank: 5,
    name: 'OnePlus 13',
    href: '/phones/oneplus-13'
  },
  {
    rank: 6,
    name: 'Samsung Galaxy Z Fold6',
    href: '/phones/samsung-galaxy-z-fold6'
  },
  {
    rank: 7,
    name: 'Xiaomi 15 Pro',
    href: '/phones/xiaomi-15-pro'
  },
  {
    rank: 8,
    name: 'Nothing Phone 3',
    href: '/phones/nothing-phone-3'
  },
  {
    rank: 9,
    name: 'iPhone 16 Pro',
    href: '/phones/iphone-16-pro'
  },
  {
    rank: 10,
    name: 'Samsung Galaxy A56',
    href: '/phones/samsung-galaxy-a56'
  }
];

export const popularComparisons: PopularComparison[] = [
  {
    title: 'Samsung Galaxy S25 Ultra vs iPhone 16 Pro Max',
    href: '/compare?phones=samsung-galaxy-s25-ultra,iphone-16-pro-max'
  },
  {
    title: 'Samsung Galaxy S25 vs Samsung Galaxy S24',
    href: '/compare?phones=samsung-galaxy-s25,samsung-galaxy-s24'
  },
  {
    title: 'Google Pixel 9 Pro vs Samsung Galaxy S25',
    href: '/compare?phones=google-pixel-9-pro,samsung-galaxy-s25'
  },
  {
    title: 'OnePlus 13 vs Samsung Galaxy S25 Ultra',
    href: '/compare?phones=oneplus-13,samsung-galaxy-s25-ultra'
  },
  {
    title: 'Xiaomi 15 Ultra vs Vivo X200 Pro',
    href: '/compare?phones=xiaomi-15-ultra,vivo-x200-pro'
  },
  {
    title: 'iPhone 16 Pro Max vs iPhone 15 Pro Max',
    href: '/compare?phones=iphone-16-pro-max,iphone-15-pro-max'
  },
  {
    title: 'Samsung Galaxy Z Fold6 vs Google Pixel 9 Pro Fold',
    href: '/compare?phones=samsung-galaxy-z-fold6,google-pixel-9-pro-fold'
  },
  {
    title: 'Nothing Phone 3 vs OnePlus 13',
    href: '/compare?phones=nothing-phone-3,oneplus-13'
  }
];

export const featuredVideos: FeaturedVideo[] = [
  {
    title: 'vivo X500 Pro Max video review',
    href: '/reviews/vivo-x500-pro-max-review',
    category: 'Review',
    duration: '12:08'
  },
  {
    title: 'Samsung Galaxy S25 Ultra vs iPhone 16 Pro Max camera comparison',
    href: '/compare?phones=samsung-galaxy-s25-ultra,iphone-16-pro-max',
    category: 'Camera',
    duration: '08:42'
  },
  {
    title: 'Top 5 phones to buy in late 2025',
    href: '/phones',
    category: 'Buying guide',
    duration: '06:15'
  },
  {
    title: 'iQOO Neo12 battery and display first impressions',
    href: '/news/iqoo-neo12-9000mah-battery-185hz',
    category: 'First look',
    duration: '04:31'
  }
];

export const bottomBanner = {
  title: 'The flagship season buyer’s guide is here',
  eyebrow: 'TechAtlas guide',
  summary: 'Six months with the phones that matter, ranked by the things you actually notice every day.',
  href: '/reviews'
};

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

export function getLatestDeviceBySlug(slug: string) {
  return latestDevices.find((device) => device.slug === slug);
}
