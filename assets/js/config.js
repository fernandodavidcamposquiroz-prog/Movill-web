/**
 * ============================================================================
 * MOBILOOK — Configuración Editable de Tienda (Ancón, Lima - Perú)
 * ============================================================================
 * Edita aquí el número de WhatsApp, dirección, horarios o precios en Soles (S/)
 * sin necesidad de modificar el HTML ni el diseño.
 */

window.MOBILOOK_CONFIG = {
  brand: {
    name: 'MOBILOOK',
    tagline: 'Estilo y Protección para tu celular',
    currencySymbol: 'S/',
    country: 'Perú',
    district: 'Ancón, Lima Norte',
    address: 'Av. José Carlos Mariátegui / Zona Comercial de Ancón (Ref. cerca al Parque Central)',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ancon+Lima+Peru',
    hours: 'Lunes a Sábado: 9:30 a.m. – 8:30 p.m. · Domingos: 10:00 a.m. – 6:00 p.m.',
    // Reemplazar con el número real de WhatsApp de la tienda (51 + 9 dígitos)
    whatsappNumber: '51999000000',
    whatsappDisplay: '+51 999 000 000',
    instagramHandle: '@mobilook.pe',
    tiktokHandle: '@mobilook.pe',
    comboDiscountRate: 0.15, // 15% de descuento al armar un combo en el Studio
    isDemoProposal: true
  },

  deviceCatalog: {
    Samsung: [
      'Galaxy A56 5G',
      'Galaxy A55 5G',
      'Galaxy A35 / A36',
      'Galaxy A16 / A15',
      'Galaxy S25 Ultra',
      'Galaxy S24 / S24 FE'
    ],
    Xiaomi: [
      'Redmi Note 15 Pro',
      'Redmi Note 14 Pro',
      'Redmi Note 14',
      'Redmi Note 13 / 13 Pro',
      'POCO X7 Pro',
      'Xiaomi 14T'
    ],
    iPhone: [
      'iPhone 17 Pro Max',
      'iPhone 16 Pro Max',
      'iPhone 16 / 16 Pro',
      'iPhone 15 / 15 Pro',
      'iPhone 14 / 14 Pro',
      'iPhone 13'
    ],
    Motorola: [
      'Moto G85 5G',
      'Moto G55 / G35',
      'Moto Edge 50 Fusion',
      'Moto Edge 60',
      'Moto G24'
    ],
    Honor: [
      'Honor X9c',
      'Honor Magic 7 Lite',
      'Honor 200 Lite',
      'Honor X7c'
    ]
  },

  products: [
    {
      id: 'case-magsafe-cobalt',
      name: 'Funda MagSafe Translúcida Pro',
      shortDesc: 'Imán N52 de alta sujeción, borde elevado anti-caídas y acabado mate antihuellas.',
      category: 'fundas',
      pillar: 'estilo',
      price: 45,
      oldPrice: 55,
      badge: 'Top Ventas',
      badgeType: 'cobalt',
      protection: 4,
      image: 'assets/img/prod-magsafe-cobalt.webp',
      brands: ['iPhone', 'Samsung', 'Xiaomi'],
      colors: [
        { name: 'Azul Cobalto', hex: '#1B38B8' },
        { name: 'Cristal Mate', hex: '#DCE3F5' },
        { name: 'Negro Humo', hex: '#1E2433' },
        { name: 'Titanio Gris', hex: '#7D879E' }
      ],
      specs: [
        'Aro magnético MagSafe integrado (compatible con carga inalámbrica)',
        'Policarbonato rígido anti-amarilleo + bordes flexibles TPU',
        'Bisel elevado de 1.5 mm para proteger pantalla y cámaras'
      ]
    },
    {
      id: 'case-armor-shield',
      name: 'Carcasa Armor Antigolpes Pro',
      shortDesc: 'Doble capa con esquinas Air-Cushion diseñadas para absorber caídas fuertes.',
      category: 'fundas',
      pillar: 'proteccion',
      price: 39,
      oldPrice: 49,
      badge: 'Uso Rudo',
      badgeType: 'dark',
      protection: 5,
      image: 'assets/img/prod-rugged-armor.webp',
      brands: ['Samsung', 'Xiaomi', 'Motorola', 'Honor', 'iPhone'],
      colors: [
        { name: 'Obsidiana / Cobalto', hex: '#141B2D' },
        { name: 'Azul Marino', hex: '#17308F' },
        { name: 'Gris Grafito', hex: '#4B5568' }
      ],
      specs: [
        'Esquinas reforzadas con cámara de aire contra impactos',
        'Laterales texturizados antideslizantes de agarre seguro',
        'Botones táctiles independientes de respuesta precisa'
      ]
    },
    {
      id: 'case-silicone-soft',
      name: 'Funda Silicona Liquid Soft-Touch',
      shortDesc: 'Tacto sedoso premium, interior de microfibra suave y colores en tendencia.',
      category: 'fundas',
      pillar: 'estilo',
      price: 25,
      oldPrice: 32,
      badge: 'Favorita',
      badgeType: 'cobalt',
      protection: 3,
      image: 'assets/img/prod-silicone-soft.webp',
      brands: ['iPhone', 'Samsung', 'Xiaomi', 'Motorola', 'Honor'],
      colors: [
        { name: 'Azul MOBILOOK', hex: '#1B38B8' },
        { name: 'Blanco Glaciar', hex: '#E9EEF9' },
        { name: 'Grafito Mate', hex: '#2D3446' },
        { name: 'Lila Lavanda', hex: '#9486D9' },
        { name: 'Verde Menta', hex: '#4EB59B' }
      ],
      specs: [
        'Forro interno de gamuza microfibra que evita rayar la tapa trasera',
        'Fácil limpieza contra manchas y polvo diario',
        'Perfil delgado que respeta la ergonomía original del celular'
      ]
    },
    {
      id: 'mica-hidrogel-pro',
      name: 'Mica Hidrogel Corte a Medida',
      shortDesc: 'Autoregenerable para pantallas planas o curvas. Instalación gratis sin burbujas.',
      category: 'micas',
      pillar: 'proteccion',
      price: 29,
      oldPrice: 35,
      badge: 'Instalación Gratis',
      badgeType: 'emerald',
      protection: 4,
      image: 'assets/img/prod-micas-kit.webp',
      brands: ['Samsung', 'Xiaomi', 'iPhone', 'Motorola', 'Honor'],
      colors: [
        { name: 'HD Transparente', hex: '#D6E4FF' },
        { name: 'Mate Gamer Anti-Huellas', hex: '#94A3B8' },
        { name: 'Anti-Espía Privacidad', hex: '#1E293B' }
      ],
      specs: [
        'Corte láser exacto para cualquier modelo, incluso bordes curvos',
        'No se triza ni astilla; autorrepara microrayaduras en 24h',
        '100% compatible con huella ultrasónica y óptica en pantalla'
      ]
    },
    {
      id: 'mica-vidrio-9h',
      name: 'Mica Vidrio Templado 9H Full Cover',
      shortDesc: 'Máxima dureza frente a caídas frontales con cobertura de borde a borde.',
      category: 'micas',
      pillar: 'proteccion',
      price: 18,
      oldPrice: null,
      badge: 'Esencial',
      badgeType: 'dark',
      protection: 5,
      image: 'assets/img/prod-micas-kit.webp',
      brands: ['iPhone', 'Samsung', 'Xiaomi', 'Motorola', 'Honor'],
      colors: [
        { name: 'Cristal 9H Full', hex: '#E2EAFF' },
        { name: 'Privacidad 9H', hex: '#111827' }
      ],
      specs: [
        'Dureza real 9H con recubrimiento oleofóbico anti-grasa',
        'Adhesivo Full Glue que mantiene la sensibilidad táctil al 100%',
        'Te la instalamos gratis en nuestra tienda de Ancón'
      ]
    },
    {
      id: 'lens-guard-sapphire',
      name: 'Protectores de Lentes Aluminio + Zafiro',
      shortDesc: 'Anillos individuales metálicos que blindan tus cámaras sin perder nitidez en fotos.',
      category: 'micas',
      pillar: 'estilo',
      price: 22,
      oldPrice: 28,
      badge: 'Detalle Pro',
      badgeType: 'cobalt',
      protection: 5,
      image: 'assets/img/prod-lens-guard.webp',
      brands: ['iPhone', 'Samsung', 'Xiaomi'],
      colors: [
        { name: 'Cobalto Metálico', hex: '#1B38B8' },
        { name: 'Titanio Negro', hex: '#1E2330' },
        { name: 'Plata Natural', hex: '#CBD5E1' }
      ],
      specs: [
        'Vidrio templado óptico anti-reflejo (no altera el flash nocturno)',
        'Marco de aleación de aluminio mecanizado al color de tu equipo',
        'Fácil colocación sin interferir con fundas estándar'
      ]
    },
    {
      id: 'charger-gan-35w',
      name: 'Kit Carga Rápida 35W + Cable Trenzado',
      shortDesc: 'Cargador compacto con protección térmica inteligente + cable USB-C reforzado 1.5 m.',
      category: 'energia',
      pillar: 'proteccion',
      price: 49,
      oldPrice: 62,
      badge: 'Carga Rápida',
      badgeType: 'emerald',
      protection: 4,
      image: 'assets/img/prod-charger-audio.webp',
      brands: ['Samsung', 'Xiaomi', 'iPhone', 'Motorola', 'Honor'],
      colors: [
        { name: 'Blanco + Cable Cobalto', hex: '#1B38B8' },
        { name: 'Blanco Puro', hex: '#E8EEF8' }
      ],
      specs: [
        'Chip de protección contra sobrecarga y picos de voltaje',
        'Compatible con Power Delivery (PD) y Quick Charge',
        'Cable trenzado de nylon resistente a más de 10,000 dobleces'
      ]
    },
    {
      id: 'tws-buds-air',
      name: 'Audífonos Inalámbricos TWS Minimal',
      shortDesc: 'Bluetooth 5.3 estable, estuche compacto y hasta 24 horas de batería combinada.',
      category: 'energia',
      pillar: 'estilo',
      price: 69,
      oldPrice: 85,
      badge: 'Nuevo',
      badgeType: 'cobalt',
      protection: 3,
      image: 'assets/img/prod-charger-audio.webp',
      brands: ['Samsung', 'Xiaomi', 'iPhone', 'Motorola', 'Honor'],
      colors: [
        { name: 'Blanco Perla', hex: '#F1F5FB' },
        { name: 'Azul Noche', hex: '#172554' }
      ],
      specs: [
        'Emparejamiento instantáneo con Android y iPhone',
        'Controles táctiles para música, llamadas y asistente de voz',
        'Estuche con carga rápida USB-C y resistencia a salpicaduras IPX4'
      ]
    }
  ],

  studioOptions: {
    cases: [
      {
        id: 'studio-magsafe',
        name: 'MagSafe Translúcida',
        price: 45,
        styleScore: 95,
        protectionScore: 84,
        hasRing: true,
        tag: 'Estilo + MagSafe'
      },
      {
        id: 'studio-armor',
        name: 'Armor Uso Rudo',
        price: 39,
        styleScore: 78,
        protectionScore: 98,
        hasRing: false,
        tag: 'Máxima Resistencia'
      },
      {
        id: 'studio-silicone',
        name: 'Silicona Soft-Touch',
        price: 25,
        styleScore: 92,
        protectionScore: 72,
        hasRing: false,
        tag: 'Delgada y Suave'
      }
    ],
    finishes: [
      { id: 'cobalto', name: 'Azul Cobalto', body: '#1B38B8', edge: '#0F227A', accent: '#6B8BFF', textLight: true },
      { id: 'obsidiana', name: 'Negro Obsidiana', body: '#161C2E', edge: '#0A0E19', accent: '#3B82F6', textLight: true },
      { id: 'glaciar', name: 'Blanco Glaciar', body: '#ECF1FA', edge: '#C7D3EB', accent: '#1B38B8', textLight: false },
      { id: 'grafito', name: 'Titanio Grafito', body: '#4A556E', edge: '#2C3448', accent: '#93C5FD', textLight: true },
      { id: 'menta', name: 'Verde Menta', body: '#3EA38D', edge: '#247362', accent: '#D1FAE5', textLight: true }
    ],
    micas: [
      { id: 'mica-hidrogel-hd', name: 'Hidrogel HD (Instalación gratis)', price: 29, protectionBoost: 8 },
      { id: 'mica-vidrio-9h', name: 'Vidrio Templado 9H Full Cover', price: 18, protectionBoost: 10 },
      { id: 'mica-privacidad', name: 'Hidrogel Privacidad Anti-Espía', price: 35, protectionBoost: 9 }
    ],
    extras: [
      { id: 'extra-none', name: 'Sin accesorio adicional', price: 0 },
      { id: 'extra-lens', name: 'Protectores de Lentes Aluminio', price: 22 },
      { id: 'extra-charger', name: 'Kit Carga Rápida 35W + Cable', price: 49 }
    ]
  }
};
