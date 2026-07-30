export interface MerchProduct {
  id: string;
  name: string;
  code: string;
  drop: string;
  price: string;
  description: string;
  sizes: string[];
  images: string[];
  status: 'available' | 'coming-soon' | 'sold-out';
  purchaseUrl?: string;
  featured: boolean;
}

export const merch: MerchProduct[] = [
  {
    id: 'tee-001',
    name: 'OVERSIZED TEE',
    code: 'KORNER 001',
    drop: 'DROP 01',
    price: '$65',
    description: 'Heavyweight 100% cotton. Boxy oversized cut. Screen-printed by hand in Los Angeles.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/12002937/pexels-photo-12002937.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    status: 'coming-soon',
    featured: true,
  },
  {
    id: 'hoodie-001',
    name: 'HEAVYWEIGHT HOODIE',
    code: 'KORNER 002',
    drop: 'DROP 01',
    price: '$120',
    description: '450gsm brushed fleece. Tonal embroidered mark. Made to be lived in.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/8206502/pexels-photo-8206502.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    status: 'coming-soon',
    featured: false,
  },
  {
    id: 'print-001',
    name: 'LIMITED PHOTO PRINT',
    code: 'KORNER 003',
    drop: 'DROP 01',
    price: '$45',
    description: 'Archival giclée print on cotton rag. Edition of 50. Signed and numbered.',
    sizes: ['A4', 'A3'],
    images: [
      'https://images.pexels.com/photos/19153723/pexels-photo-19153723.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    status: 'coming-soon',
    featured: false,
  },
  {
    id: 'white-tee-001',
    name: 'WHITE TEE',
    code: 'KORNER 004',
    drop: 'DROP 01',
    price: '$55',
    description: 'Boxy fit on washed white cotton. Minimal mark on the chest.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/29811574/pexels-photo-29811574.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    status: 'coming-soon',
    featured: false,
  },
];
