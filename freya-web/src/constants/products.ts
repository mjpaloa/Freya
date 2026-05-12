export interface Product {
  id: string;
  name: string;
  category: 'Ultrasound' | 'X-Ray' | 'Endoscopy' | 'CT Scan' | 'MRI' | 'Healthcare IT' | 'Bone Densitometry';
  description: string;
  image: string;
  features: string[];
}

export const products: Product[] = [
  // ── MRI ──────────────────────────────────────────────
  {
    id: 'echelon-smart-zerohelium',
    name: 'Fujifilm ECHELON Smart ZeroHelium',
    category: 'MRI',
    description: 'High-field 1.5T MRI system with ZeroHelium cooling technology, eliminating the need for liquid helium refills and drastically reducing operational costs.',
    image: '/assets/products/fujifilm-echelon-smart-zerohelium_02.webp',
    features: ['1.5T Superconductive', 'ZeroHelium Technology', 'SoftSound Suite', 'Low Running Costs']
  },
  {
    id: 'echelon-smart-synergydrive',
    name: 'Fujifilm ECHELON Smart with SynergyDrive',
    category: 'MRI',
    description: 'High-field 1.5T MRI system featuring SynergyDrive for faster exams, quiet scanning technology, and advanced clinical applications.',
    image: '/assets/products/ECHELON-Smart-with-Synergy-Drive.png',
    features: ['1.5T Superconductive', 'SynergyDrive Workflow', 'SoftSound Suite', 'Advanced Clinical Apps']
  },
  {
    id: 'aperto-lucent',
    name: 'Fujifilm APERTO Lucent with SynergyDrive',
    category: 'MRI',
    description: 'Open MRI system with a permanent magnet, offering high performance and patient comfort. SynergyDrive provides efficient and high-speed exam workflow.',
    image: '/assets/products/APERTO-Lucent-with-SynergyDrive.png',
    features: ['0.4T Open Magnet', 'Prime Technology', 'SynergyDrive', 'Patient Comfort Design']
  },

  // ── Ultrasound ───────────────────────────────────────
  {
    id: 'arietta-650',
    name: 'Fujifilm Arietta 650',
    category: 'Ultrasound',
    description: 'Expertly designed to optimize productivity with DeepInsight technology for high-quality diagnostic imaging.',
    image: '/assets/products/thumb_arietta-65_ov_01.jpg',
    features: ['DeepInsight Technology', 'High productivity design', 'Superior image quality']
  },
  {
    id: 'arietta-850',
    name: 'Fujifilm Arietta 850',
    category: 'Ultrasound',
    description: 'Designed for high expectations, providing high-quality diagnostic imaging to a wide range of clinical areas. Features greater examination efficiency and superior image quality.',
    image: '/assets/products/Arietta-850cover.jpg',
    features: ['OLED Monitor', 'Pure Image Technology', 'Virtual Sonography', 'Symphonic Technology']
  },
  {
    id: 'arietta-50le',
    name: 'Fujifilm Arietta 50LE',
    category: 'Ultrasound',
    description: 'Compact and versatile ultrasound system designed for point-of-care applications with excellent image quality and portability.',
    image: '/assets/products/thumb_arietta-50_01.jpg',
    features: ['Compact Design', 'Point-of-Care', 'High Image Quality', 'Portable']
  },
  {
    id: 'arietta-65',
    name: 'Fujifilm Arietta 65',
    category: 'Ultrasound',
    description: 'Mid-range ultrasound system delivering high image quality and clinical versatility for a wide range of diagnostic applications.',
    image: '/assets/products/thumb_arietta-65_ov_01.jpg',
    features: ['High Image Quality', 'Clinical Versatility', 'Ergonomic Design', 'Advanced Imaging Modes']
  },
  {
    id: 'lisendo-880le',
    name: 'Fujifilm LISENDO 880LE',
    category: 'Ultrasound',
    description: 'Premium cardiovascular ultrasound system with advanced cardiac imaging features for comprehensive echocardiography examinations.',
    image: '/assets/products/thumb_lisendo-880le_ov_01.jpeg',
    features: ['Cardiovascular Imaging', 'Advanced Echo', 'High Frame Rate', 'eFocusing Technology']
  },

  // ── X-Ray Imaging Devices ───────────────────────────
  {
    id: 'fdr-cross',
    name: 'Fujifilm FDR Cross C-Arm',
    category: 'X-Ray',
    description: 'A versatile hybrid C-arm and portable X-ray solution. Designed to provide high-quality imaging for both surgical and fluoroscopic applications in a compact footprint.',
    image: '/assets/products/Fujifilm-FDR-Cross-C-Arm.png',
    features: ['Wireless DR Panel', 'Hybrid Functionality', 'Compact Mobility', 'Antibacterial Coating']
  },
  {
    id: 'se-lite',
    name: 'Fujifilm SE Lite',
    category: 'X-Ray',
    description: 'Lightweight and compact DR panel system for portable and bedside X-ray imaging with superior image quality.',
    image: '/assets/products/fujifilm-fdr-se-lite-dr-panel-1000x1000-1.webp',
    features: ['Lightweight Panel', 'Wireless DR', 'Bedside Imaging', 'Compact Design']
  },
  {
    id: 'drypix-lite-v2',
    name: 'Fujifilm DRYPIX Lite (V2)',
    category: 'X-Ray',
    description: 'Compact dry laser imager producing high-quality diagnostic prints. Upgraded version with improved throughput and reliability.',
    image: '/assets/products/thumb_drypix-lite_01.jpeg',
    features: ['Dry Laser Printing', 'Compact Size', 'High Throughput', 'Low Maintenance']
  },
  {
    id: 'drypix-lite',
    name: 'Fujifilm DRYPIX Lite',
    category: 'X-Ray',
    description: 'Compact and affordable dry laser imager delivering consistent, high-quality diagnostic film output for various clinical environments.',
    image: '/assets/products/thumb_drypix-lite_01.jpeg',
    features: ['Dry Laser Printing', 'Compact Size', 'Consistent Output', 'Easy Operation']
  },
  {
    id: 'drypix-smart',
    name: 'Fujifilm DRYPIX Smart',
    category: 'X-Ray',
    description: 'High-speed dry laser imager with smart features for efficient film output. Supports multiple film sizes with automatic sorting.',
    image: '/assets/products/thumb_drypix-smart_01.jpeg',
    features: ['High Speed Output', 'Multi-Size Support', 'Smart Sorting', 'Reliable Performance']
  },
  {
    id: 'amulet-innovality',
    name: 'Fujifilm AMULET Innovality',
    category: 'X-Ray',
    description: 'Advanced digital mammography system with high-resolution imaging and tomosynthesis capability for improved breast cancer detection.',
    image: '/assets/products/thumb_amulet-innovality_01.jpeg',
    features: ['Digital Mammography', 'Tomosynthesis', 'High Resolution', 'Patient Comfort']
  },
  {
    id: 'fdr-d-evo-ii',
    name: 'Fujifilm FDR D-EVO II',
    category: 'X-Ray',
    description: 'Next-generation digital radiography detector with advanced image processing for outstanding image quality and dose efficiency.',
    image: '/assets/products/thumb_fdr-d-evo-2-c24_01.jpg',
    features: ['ISS Technology', 'Noise Reduction', 'Dose Efficiency', 'Lightweight Panel']
  },
  {
    id: 'fdr-go-plus',
    name: 'Fujifilm FDR Go PLUS',
    category: 'X-Ray',
    description: 'Mobile X-ray system with wireless DR panel for bedside and emergency room imaging with excellent maneuverability.',
    image: '/assets/products/FDR-Go-PLUS_.jpeg',
    features: ['Mobile X-Ray', 'Wireless DR Panel', 'Easy Maneuverability', 'Bedside Imaging']
  },
  {
    id: 'fdr-smart-x',
    name: 'Fujifilm FDR Smart X',
    category: 'X-Ray',
    description: 'Versatile digital radiography system offering high image quality and streamlined workflow for general radiography applications.',
    image: '/assets/products/FDR-Smart-X.jpeg',
    features: ['Digital Radiography', 'High Image Quality', 'Streamlined Workflow', 'Versatile Positioning']
  },
  {
    id: 'skanray-skanmobile',
    name: 'SKanRay SKanMobile',
    category: 'X-Ray',
    description: 'Cost-effective mobile X-ray unit designed for portability and ease of use in various clinical settings including ICU and emergency.',
    image: '/assets/products/SKANMOBILE.png',
    features: ['Mobile Design', 'Cost-Effective', 'Easy Operation', 'ICU Compatible']
  },
  {
    id: 'amulet-felicia',
    name: 'Fujifilm Amulet Felicia',
    category: 'X-Ray',
    description: 'Digital mammography system designed with patient comfort in mind, featuring gentle compression and high-quality imaging for accurate diagnosis.',
    image: '/assets/products/AMULET-Felicia1.jpeg',
    features: ['Gentle Compression', 'Digital Mammography', 'Patient Comfort', 'High Image Quality']
  },
  {
    id: 'fcr-prima-tm',
    name: 'Fujifilm FCR PRIMA Tm',
    category: 'X-Ray',
    description: 'Tabletop computed radiography reader with compact design, delivering reliable and fast CR processing for small to mid-size facilities.',
    image: '/assets/products/FCR-PRIMA-Tm__.jpeg',
    features: ['Tabletop CR', 'Compact Design', 'Fast Processing', 'Reliable Output']
  },
  {
    id: 'fcr-prima-t2',
    name: 'Fujifilm FCR PRIMA T2',
    category: 'X-Ray',
    description: 'High-performance computed radiography system with dual-cassette processing for efficient workflow in busy radiology departments.',
    image: '/assets/products/FCR-PRIMA-T2__.jpeg',
    features: ['Dual-Cassette CR', 'High Throughput', 'Efficient Workflow', 'Quality Imaging']
  },

  // ── CT Scan ──────────────────────────────────────────
  {
    id: 'scenaria-view',
    name: 'Fujifilm Scenaria View',
    category: 'CT Scan',
    description: 'Advanced 64/128-slice CT system with high-speed rotation and low-dose imaging capabilities. Features Visionary A reconstruction for crystal clear results.',
    image: '/assets/products/thumb_scenariaview_ov_01.jpg',
    features: ['128-Slice Imaging', '80cm Wide Bore', 'Visionary A Reconstruction', 'Intelli IPV']
  },
  {
    id: 'supria-128',
    name: 'Fujifilm Supria 128 slice (CT Scan)',
    category: 'CT Scan',
    description: 'High-performance 128-slice CT scanner delivering exceptional image quality with advanced dose reduction technology for comprehensive diagnostics.',
    image: '/assets/products/thum_supria-grande-fr_01.jpg',
    features: ['128-Slice Imaging', 'Advanced Dose Reduction', 'High Speed Scanning', 'Wide Clinical Range']
  },
  {
    id: 'supria-32',
    name: 'Fujifilm Supria 32 slice (Compact low dose CT Scan)',
    category: 'CT Scan',
    description: 'Compact 32-slice CT scanner optimized for low-dose imaging, ideal for smaller facilities seeking reliable CT capabilities.',
    image: '/assets/products/thumb_supria-32_01.jpg',
    features: ['32-Slice Imaging', 'Low Dose Technology', 'Compact Footprint', 'Cost-Effective']
  },

  // ── Endoscopy ────────────────────────────────────────
  {
    id: 'eluxeo-7000',
    name: 'Fujifilm ELUXEO® 7000 System',
    category: 'Endoscopy',
    description: 'Next-generation endoscopy system with Multi-Light technology. Provides superior visualization with LCI and BLI modes for better lesion detection.',
    image: '/assets/products/ELUXEO-Processor-Image_2.png',
    features: ['Multi-Light Source', 'LCI / BLI Visualization', 'One-Step Connector', 'High-Definition Imaging']
  },
  {
    id: 'eluxeo-6000',
    name: 'Fujifilm ELUXEO® 6000 System',
    category: 'Endoscopy',
    description: 'Advanced endoscopy platform with ELUXEO technology for enhanced mucosal visualization and improved lesion characterization.',
    image: '/assets/products/pic_6000system_01.jpeg',
    features: ['ELUXEO Technology', 'BLI / LCI Modes', 'Versatile Platform', 'High Image Quality']
  },
  {
    id: 'epx-3500hd',
    name: 'Fujifilm Electronic Video Endoscopy System EPX-3500HD',
    category: 'Endoscopy',
    description: 'Reliable HD video endoscopy system designed for clinical versatility, delivering clear and detailed endoscopic imaging.',
    image: '/assets/products/thumb_epx-3500hd_01.png',
    features: ['HD Video', 'Clinical Versatility', 'Clear Imaging', 'Reliable Performance']
  },

  // ── Healthcare IT ────────────────────────────────────
  {
    id: 'synapse-3d',
    name: 'Fujifilm Synapse® 3D',
    category: 'Healthcare IT',
    description: 'Advanced 3D medical image processing and visualization software for post-processing CT, MRI and other modality data.',
    image: '/assets/products/thumb_3d_01.jpeg',
    features: ['3D Visualization', 'Multi-Modality', 'Advanced Processing', 'Clinical Tools']
  },
  {
    id: 'synapse-vna',
    name: 'Fujifilm Synapse® VNA',
    category: 'Healthcare IT',
    description: 'Vendor Neutral Archive solution for enterprise-wide medical image management, providing unified storage and access across departments.',
    image: '/assets/products/thumb_vna_01.jpeg',
    features: ['Vendor Neutral', 'Enterprise Archive', 'Unified Storage', 'Cross-Department Access']
  },
  {
    id: 'synapse-pacs',
    name: 'Fujifilm Synapse® PACS',
    category: 'Healthcare IT',
    description: 'Comprehensive Picture Archiving and Communication System for efficient storage, retrieval, and distribution of medical images.',
    image: '/assets/products/thumb_pacs_01.jpeg',
    features: ['Image Archive', 'Fast Retrieval', 'Web Distribution', 'Workflow Integration']
  },

  // ── Bone Densitometry ────────────────────────────────
  {
    id: 'fdx-visionary-a',
    name: 'Fujifilm FDX Visionary A',
    category: 'Bone Densitometry',
    description: 'Advanced bone densitometry system for accurate bone mineral density measurement, supporting osteoporosis screening and diagnosis.',
    image: '/assets/products/img_FDX-Visionary-A_thumb.jpeg',
    features: ['Bone Densitometry', 'DXA Technology', 'Osteoporosis Screening', 'Accurate Measurement']
  },
];
