const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const products = [
  // Khade Masale placeholders (if needed, though some might use AI PNGs)
  { name: 'elaichi.jpg', label: 'Green Cardamom', sublabel: 'Hari Elaichi', emoji: '💚', bg: '#1a5e35', accent: '#3d9e5f' },
  { name: 'badi-elaichi.jpg', label: 'Black Cardamom', sublabel: 'Badi Elaichi', emoji: '🟤', bg: '#2c1a0e', accent: '#6b3d1e' },
  { name: 'tez-patta.jpg', label: 'Bay Leaves', sublabel: 'Tez Patta', emoji: '🍃', bg: '#2d5a27', accent: '#5a9e50' },
  { name: 'sabut-dhaniya.jpg', label: 'Coriander Seeds', sublabel: 'Sabut Dhaniya', emoji: '🌿', bg: '#5a4a1a', accent: '#9e8030' },
  
  // Dry Fruits
  { name: 'badam.jpg', label: 'Premium Almonds', sublabel: 'Badam', emoji: '🥜', bg: '#6b3d1e', accent: '#b06830' },
  { name: 'kaju.jpg', label: 'Cashew Nuts', sublabel: 'Kaju', emoji: '🥜', bg: '#5c4a20', accent: '#a08035' },
  { name: 'pista.jpg', label: 'Pistachios', sublabel: 'Pista', emoji: '💚', bg: '#2d5a2a', accent: '#5a9e55' },
  { name: 'kishmish.jpg', label: 'Raisins', sublabel: 'Kishmish', emoji: '🍇', bg: '#5a1e3d', accent: '#9e3570' },
  { name: 'akhrot.jpg', label: 'Walnuts', sublabel: 'Akhrot', emoji: '🥜', bg: '#4a2a10', accent: '#8a5020' },
  { name: 'anjeer.jpg', label: 'Dried Figs', sublabel: 'Anjeer', emoji: '🍯', bg: '#5a2a1e', accent: '#9e4a35' },
  { name: 'khajoor.jpg', label: 'Medjool Dates', sublabel: 'Khajoor', emoji: '🌴', bg: '#3e2723', accent: '#5d4037' },
  { name: 'khumani.jpg', label: 'Dried Apricots', sublabel: 'Khumani', emoji: '🍑', bg: '#e65100', accent: '#f57c00' },
  { name: 'chilgoza.jpg', label: 'Pine Nuts', sublabel: 'Chilgoza', emoji: '🌲', bg: '#4e342e', accent: '#8d6e63' },
  { name: 'mixed-dry-fruits.jpg', label: 'Healthy Trail Mix', sublabel: 'Mixed Dry Fruits', emoji: '🥣', bg: '#3e2723', accent: '#b0bec5' },
  { name: 'gift-box.jpg', label: 'Festive Gift Box', sublabel: 'Premium Dry Fruits Box', emoji: '🎁', bg: '#b71c1c', accent: '#d32f2f' },
  { name: 'prunes.jpg', label: 'Dried Prunes', sublabel: 'Alu Bukhara', emoji: '🍇', bg: '#311b92', accent: '#512da8' },

  // Pooja Items
  { name: 'kapoor.jpg', label: 'Pure Camphor', sublabel: 'Bhimseni Kapoor', emoji: '✨', bg: '#1a2a5a', accent: '#3050a0' },
  { name: 'chandan.jpg', label: 'Sandalwood Powder', sublabel: 'Chandan', emoji: '🌸', bg: '#5a3a1a', accent: '#a07030' },
  { name: 'rui-batti.jpg', label: 'Cotton Wicks', sublabel: 'Rui Batti', emoji: '🕯️', bg: '#5a4a1e', accent: '#a08030' },
  { name: 'gangajal.jpg', label: 'Holy Ganga Water', sublabel: 'Gangajal', emoji: '💧', bg: '#006064', accent: '#00838f' },
  { name: 'kumkum-set.jpg', label: 'Kumkum & Haldi Set', sublabel: 'Tilak Set', emoji: '🔴', bg: '#b71c1c', accent: '#ffb300' },
  { name: 'dhoop-batti.jpg', label: 'Masala Dhoop Batti', sublabel: 'Agarbatti', emoji: '🕯️', bg: '#4a148c', accent: '#7b1fa2' },
  { name: 'navratri-kit.jpg', label: 'Navratri Pooja Kit', sublabel: 'Complete Kit', emoji: '🪔', bg: '#e65100', accent: '#ff9800' },
  { name: 'guggul.jpg', label: 'Guggul Resin Dhoop', sublabel: 'Pure Resin', emoji: '🪵', bg: '#263238', accent: '#455a64' },
  { name: 'mishri.jpg', label: 'Rock Sugar', sublabel: 'Mishri', emoji: '💎', bg: '#0d47a1', accent: '#1976d2' },
  { name: 'lal-chandan.jpg', label: 'Red Sandalwood', sublabel: 'Lal Chandan', emoji: '🪵', bg: '#5d4037', accent: '#b71c1c' },
  { name: 'pooja-thali.jpg', label: 'Puja Thali Set', sublabel: 'Daily Puja Kit', emoji: '🪔', bg: '#b71c1c', accent: '#ffb300' },
  { name: 'panchgavya.jpg', label: 'Panchgavya Diya Set', sublabel: 'Gobar Deepak', emoji: '🪔', bg: '#3e2723', accent: '#ff9800' },
];

function makeSvg(p) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
  <defs>
    <radialGradient id="bg${p.name.replace(/\W/g,'')}" cx="40%" cy="35%" r="70%">
      <stop offset="0%" style="stop-color:${p.accent};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${p.bg};stop-opacity:1" />
    </radialGradient>
  </defs>
  <rect width="500" height="500" fill="url(#bg${p.name.replace(/\W/g,'')})"/>
  <circle cx="430" cy="70" r="90" fill="rgba(255,255,255,0.06)"/>
  <circle cx="70" cy="430" r="110" fill="rgba(255,255,255,0.05)"/>
  <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="2"/>
  <circle cx="250" cy="250" r="150" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <circle cx="250" cy="185" r="110" fill="rgba(0,0,0,0.18)"/>
  <circle cx="250" cy="185" r="105" fill="rgba(255,255,255,0.10)"/>
  <text x="250" y="215" text-anchor="middle" font-size="90" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif">${p.emoji}</text>
  <rect x="135" y="308" width="230" height="36" rx="18" fill="rgba(255,215,0,0.92)"/>
  <text x="250" y="331" text-anchor="middle" font-size="15" font-family="Georgia, serif" font-weight="bold" fill="#2B1B12" letter-spacing="2">PANDIT JI</text>
  <text x="250" y="378" text-anchor="middle" font-size="24" font-family="Georgia, serif" font-weight="bold" fill="rgba(255,255,255,0.96)">${p.label}</text>
  <text x="250" y="406" text-anchor="middle" font-size="17" font-family="Georgia, serif" fill="rgba(255,215,0,0.90)">${p.sublabel}</text>
  <line x1="175" y1="420" x2="325" y2="420" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
  <text x="250" y="445" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="rgba(255,255,255,0.50)" letter-spacing="1">Shudhta Aapke Ghar Tak</text>
  <text x="28" y="50" font-size="20" fill="rgba(255,215,0,0.50)" font-family="sans-serif">&#9733;</text>
  <text x="458" y="50" font-size="20" fill="rgba(255,215,0,0.50)" font-family="sans-serif">&#9733;</text>
  <text x="28" y="484" font-size="20" fill="rgba(255,215,0,0.50)" font-family="sans-serif">&#9733;</text>
  <text x="458" y="484" font-size="20" fill="rgba(255,215,0,0.50)" font-family="sans-serif">&#9733;</text>
</svg>`;
}

products.forEach(p => {
  const svgContent = makeSvg(p);
  fs.writeFileSync(path.join(uploadDir, p.name), svgContent, 'utf8');
  console.log('Created:', p.name);
});
console.log('\nAll product images created successfully!');
