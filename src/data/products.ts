export interface ProductVariant {
  id: string;
  volumeMl: number;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  concentration: string;
  genderProfile: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  variants: ProductVariant[];
  rating?: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Chanel No. 5",
    brand: "Chanel",
    description: "The world's most iconic fragrance, a timeless blend of aldehydes and florals.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    concentration: "EDP",
    genderProfile: "Feminine",
    topNotes: ["Aldehydes", "Ylang-Ylang", "Neroli"],
    heartNotes: ["Rose", "Jasmine", "Lily of the Valley"],
    baseNotes: ["Sandalwood", "Vanilla", "Musk"],
    variants: [
      { id: "1-50", volumeMl: 50, price: 120, inStock: true },
      { id: "1-100", volumeMl: 100, price: 180, inStock: true },
    ],
    rating: 4.8
  },
  {
    id: "2",
    name: "Dior Sauvage",
    brand: "Dior",
    description: "A fresh and woody fragrance that captures the spirit of adventure.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    concentration: "EDT",
    genderProfile: "Masculine",
    topNotes: ["Calabrian Bergamot", "Pepper"],
    heartNotes: ["Sichuan Pepper", "Ambroxan"],
    baseNotes: ["Cedar", "Labdanum"],
    variants: [
      { id: "2-60", volumeMl: 60, price: 95, inStock: true },
      { id: "2-100", volumeMl: 100, price: 135, inStock: true },
      { id: "2-200", volumeMl: 200, price: 195, inStock: false },
    ],
    rating: 4.6
  },
  {
    id: "3",
    name: "Tom Ford Black Orchid",
    brand: "Tom Ford",
    description: "A luxurious and mysterious fragrance with dark, sensual notes.",
    imageUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
    concentration: "PARFUM",
    genderProfile: "Unisex",
    topNotes: ["Black Orchid", "Black Pepper"],
    heartNotes: ["Dark Chocolate", "Patchouli"],
    baseNotes: ["Sandalwood", "Vanilla", "Incense"],
    variants: [
      { id: "3-50", volumeMl: 50, price: 180, inStock: true },
      { id: "3-100", volumeMl: 100, price: 280, inStock: true },
    ],
    rating: 4.7
  },
  {
    id: "4",
    name: "Yves Saint Laurent Libre",
    brand: "YSL",
    description: "A bold and modern fragrance celebrating freedom and femininity.",
    imageUrl: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?w=400",
    concentration: "EDP",
    genderProfile: "Feminine",
    topNotes: ["Lavender", "Black Currant"],
    heartNotes: ["Orange Blossom", "Jasmine"],
    baseNotes: ["Vanilla", "Ambergris"],
    variants: [
      { id: "4-50", volumeMl: 50, price: 110, inStock: true },
      { id: "4-90", volumeMl: 90, price: 150, inStock: true },
    ],
    rating: 4.5
  },
  {
    id: "5",
    name: "Creed Aventus",
    brand: "Creed",
    description: "A legendary fragrance inspired by the dramatic life of a historic emperor.",
    imageUrl: "https://images.unsplash.com/photo-1587556930799-b8837c15d01f?w=400",
    concentration: "EDP",
    genderProfile: "Masculine",
    topNotes: ["Pineapple", "Black Currant", "Apple"],
    heartNotes: ["Rose", "Jasmine", "Pink Pepper"],
    baseNotes: ["Musk", "Oakmoss", "Vanilla"],
    variants: [
      { id: "5-50", volumeMl: 50, price: 250, inStock: true },
      { id: "5-100", volumeMl: 100, price: 380, inStock: true },
    ],
    rating: 4.9
  },
  {
    id: "6",
    name: "Maison Margiela Replica",
    brand: "Maison Margiela",
    description: "A unisex fragrance that captures the essence of a lazy Sunday morning.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
    concentration: "EDT",
    genderProfile: "Unisex",
    topNotes: ["Aldehydes", "Lily of the Valley"],
    heartNotes: ["Orange Blossom", "Rose"],
    baseNotes: ["White Musk", "Iris"],
    variants: [
      { id: "6-30", volumeMl: 30, price: 85, inStock: true },
      { id: "6-100", volumeMl: 100, price: 180, inStock: true },
    ],
    rating: 4.4
  },
  {
    id: "7",
    name: "Giorgio Armani Acqua di Gio",
    brand: "Giorgio Armani",
    description: "A fresh aquatic fragrance inspired by the Mediterranean sea.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    concentration: "EDT",
    genderProfile: "Masculine",
    topNotes: ["Marine Notes", "Bergamot"],
    heartNotes: ["Sea Notes", "Jasmine"],
    baseNotes: ["Cedar", "White Musk"],
    variants: [
      { id: "7-50", volumeMl: 50, price: 75, inStock: true },
      { id: "7-100", volumeMl: 100, price: 110, inStock: true },
      { id: "7-200", volumeMl: 200, price: 160, inStock: true },
    ],
    rating: 4.3
  },
  {
    id: "8",
    name: "Marc Jacobs Daisy",
    brand: "Marc Jacobs",
    description: "A fresh and playful fragrance that captures the spirit of youth.",
    imageUrl: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?w=400",
    concentration: "EDT",
    genderProfile: "Feminine",
    topNotes: ["Violet Leaf", "Grapefruit"],
    heartNotes: ["Rose", "Jasmine"],
    baseNotes: ["Musk", "Vanilla"],
    variants: [
      { id: "8-30", volumeMl: 30, price: 55, inStock: true },
      { id: "8-50", volumeMl: 50, price: 75, inStock: true },
      { id: "8-100", volumeMl: 100, price: 110, inStock: false },
    ],
    rating: 4.2
  },
  {
    id: "9",
    name: "Versace Bright Crystal",
    brand: "Versace",
    description: "A luminous floral fragrance that sparkles with feminine elegance.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    concentration: "EDT",
    genderProfile: "Feminine",
    topNotes: ["Yuzu", "Water Notes"],
    heartNotes: ["Peony", "Magnolia"],
    baseNotes: ["Amber", "Musk"],
    variants: [
      { id: "9-50", volumeMl: 50, price: 65, inStock: true },
      { id: "9-90", volumeMl: 90, price: 95, inStock: true },
    ],
    rating: 4.3
  },
  {
    id: "10",
    name: "Calvin Klein Euphoria",
    brand: "Calvin Klein",
    description: "A seductive and mysterious fragrance that embodies modern femininity.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    concentration: "EDP",
    genderProfile: "Feminine",
    topNotes: ["Pomegranate", "Persimmon"],
    heartNotes: ["Black Orchid", "Champaca Flower"],
    baseNotes: ["Mahogany", "Amber"],
    variants: [
      { id: "10-50", volumeMl: 50, price: 70, inStock: true },
      { id: "10-100", volumeMl: 100, price: 110, inStock: true },
    ],
    rating: 4.1
  },
  {
    id: "11",
    name: "Hugo Boss The Scent",
    brand: "Hugo Boss",
    description: "A bold and confident fragrance that defines modern masculinity.",
    imageUrl: "https://images.unsplash.com/photo-1587556930799-b8837c15d01f?w=400",
    concentration: "EDT",
    genderProfile: "Masculine",
    topNotes: ["Ginger", "Maninka Fruit"],
    heartNotes: ["Lavender", "Cinnamon"],
    baseNotes: ["Leather", "Vanilla"],
    variants: [
      { id: "11-50", volumeMl: 50, price: 60, inStock: true },
      { id: "11-100", volumeMl: 100, price: 90, inStock: true },
    ],
    rating: 4.4
  },
  {
    id: "12",
    name: "Burberry Hero",
    brand: "Burberry",
    description: "A fresh and woody fragrance that celebrates the modern hero.",
    imageUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
    concentration: "EDT",
    genderProfile: "Masculine",
    topNotes: ["Bergamot", "Black Pepper"],
    heartNotes: ["Cedar", "Geranium"],
    baseNotes: ["Vetiver", "Ambergris"],
    variants: [
      { id: "12-50", volumeMl: 50, price: 85, inStock: true },
      { id: "12-100", volumeMl: 100, price: 125, inStock: true },
    ],
    rating: 4.5
  },
  {
    id: "13",
    name: "Hermès Terre d'Hermès",
    brand: "Hermès",
    description: "A sophisticated unisex fragrance inspired by the earth's elements.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
    concentration: "EDT",
    genderProfile: "Unisex",
    topNotes: ["Orange", "Grapefruit"],
    heartNotes: ["Flint", "Rose"],
    baseNotes: ["Benzoin", "Patchouli"],
    variants: [
      { id: "13-50", volumeMl: 50, price: 120, inStock: true },
      { id: "13-100", volumeMl: 100, price: 180, inStock: true },
    ],
    rating: 4.7
  },
  {
    id: "14",
    name: "Jo Malone London Peony & Blush Suede",
    brand: "Jo Malone London",
    description: "A romantic and luxurious fragrance with peony and suede notes.",
    imageUrl: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?w=400",
    concentration: "EDC",
    genderProfile: "Feminine",
    topNotes: ["Red Apple"],
    heartNotes: ["Peony", "Rose"],
    baseNotes: ["Suede", "Musk"],
    variants: [
      { id: "14-30", volumeMl: 30, price: 80, inStock: true },
      { id: "14-100", volumeMl: 100, price: 140, inStock: true },
    ],
    rating: 4.6
  },
  {
    id: "15",
    name: "Tom Ford Oud Wood",
    brand: "Tom Ford",
    description: "A luxurious and mysterious fragrance with rare oud wood.",
    imageUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
    concentration: "EDP",
    genderProfile: "Unisex",
    topNotes: ["Rosewood", "Cardamom"],
    heartNotes: ["Oud Wood", "Sandalwood"],
    baseNotes: ["Tonka Bean", "Vanilla"],
    variants: [
      { id: "15-50", volumeMl: 50, price: 200, inStock: true },
      { id: "15-100", volumeMl: 100, price: 320, inStock: true },
    ],
    rating: 4.8
  },
  {
    id: "16",
    name: "Chanel Coco Mademoiselle",
    brand: "Chanel",
    description: "A modern and sophisticated fragrance for the contemporary woman.",
    imageUrl: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?w=400",
    concentration: "EDP",
    genderProfile: "Feminine",
    topNotes: ["Orange", "Bergamot"],
    heartNotes: ["Rose", "Jasmine"],
    baseNotes: ["Patchouli", "Vanilla"],
    variants: [
      { id: "16-50", volumeMl: 50, price: 110, inStock: true },
      { id: "16-100", volumeMl: 100, price: 170, inStock: true },
    ],
    rating: 4.7
  },
  {
    id: "17",
    name: "Dior Homme Intense",
    brand: "Dior",
    description: "A powerful and elegant fragrance that defines modern masculinity.",
    imageUrl: "https://images.unsplash.com/photo-1587556930799-b8837c15d01f?w=400",
    concentration: "EDP",
    genderProfile: "Masculine",
    topNotes: ["Lavender", "Bergamot"],
    heartNotes: ["Iris", "Amber"],
    baseNotes: ["Leather", "Vanilla"],
    variants: [
      { id: "17-50", volumeMl: 50, price: 100, inStock: true },
      { id: "17-100", volumeMl: 100, price: 150, inStock: true },
    ],
    rating: 4.6
  },
  {
    id: "18",
    name: "Lancôme La Vie Est Belle",
    brand: "Lancôme",
    description: "A joyful and optimistic fragrance that celebrates life's beauty.",
    imageUrl: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?w=400",
    concentration: "EDP",
    genderProfile: "Feminine",
    topNotes: ["Iris", "Blackcurrant"],
    heartNotes: ["Rose", "Jasmine"],
    baseNotes: ["Praline", "Vanilla"],
    variants: [
      { id: "18-50", volumeMl: 50, price: 90, inStock: true },
      { id: "18-75", volumeMl: 75, price: 120, inStock: true },
    ],
    rating: 4.4
  },
  {
    id: "19",
    name: "Versace Eros",
    brand: "Versace",
    description: "A passionate and seductive fragrance inspired by Greek mythology.",
    imageUrl: "https://images.unsplash.com/photo-1587556930799-b8837c15d01f?w=400",
    concentration: "EDT",
    genderProfile: "Masculine",
    topNotes: ["Mint", "Green Apple"],
    heartNotes: ["Tonka Bean", "Ambroxan"],
    baseNotes: ["Vanilla", "Musk"],
    variants: [
      { id: "19-50", volumeMl: 50, price: 70, inStock: true },
      { id: "19-100", volumeMl: 100, price: 100, inStock: true },
    ],
    rating: 4.3
  },
  {
    id: "20",
    name: "Byredo Gypsy Water",
    brand: "Byredo",
    description: "A bohemian and free-spirited fragrance with woody and spicy notes.",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
    concentration: "EDP",
    genderProfile: "Unisex",
    topNotes: ["Bergamot", "Juniper"],
    heartNotes: ["Incense", "Pine Needles"],
    baseNotes: ["Vanilla", "Sandalo"],
    variants: [
      { id: "20-50", volumeMl: 50, price: 150, inStock: true },
      { id: "20-100", volumeMl: 100, price: 220, inStock: true },
    ],
    rating: 4.5
  }
];
