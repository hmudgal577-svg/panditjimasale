const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const urlModule = require('url');

const uploadDir = 'c:/Users/hmudg/OneDrive/Desktop/panditjimasale/server/uploads';

const images = [
  { name: 'elaichi.jpg', seed: 'cardamom' },
  { name: 'badi-elaichi.jpg', seed: 'spice' },
  { name: 'tez-patta.jpg', seed: 'laurel' },
  { name: 'sabut-dhaniya.jpg', seed: 'coriander' },
  { name: 'badam.jpg', seed: 'almond' },
  { name: 'kaju.jpg', seed: 'cashew' },
  { name: 'pista.jpg', seed: 'pistachio' },
  { name: 'kishmish.jpg', seed: 'raisins' },
  { name: 'akhrot.jpg', seed: 'walnut' },
  { name: 'anjeer.jpg', seed: 'figs' },
  { name: 'pooja-kit.jpg', seed: 'puja' },
  { name: 'kapoor.jpg', seed: 'camphor' },
  { name: 'agarbatti.jpg', seed: 'incense' },
  { name: 'chandan.jpg', seed: 'sandalwood' },
  { name: 'roli-kumkum.jpg', seed: 'kumkum' },
  { name: 'rui-batti.jpg', seed: 'wicks' }
];

function download(url, dest, callback) {
  const parsedUrl = urlModule.parse(url);
  const protocol = parsedUrl.protocol === 'https:' ? https : http;

  const request = protocol.get(url, (response) => {
    // Follow redirect
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      download(response.headers.location, dest, callback);
      return;
    }

    if (response.statusCode !== 200) {
      callback(new Error(`Failed to get '${url}' (Status: ${response.statusCode})`));
      return;
    }

    const file = fs.createWriteStream(dest);
    response.pipe(file);
    file.on('finish', () => {
      file.close(callback);
    });
  });

  request.on('error', (err) => {
    callback(err);
  });
}

function downloadSequentially(index) {
  if (index >= images.length) {
    console.log('ALL PHOTOS DOWNLOADED SUCCESSFULLY!');
    return;
  }

  const img = images[index];
  const url = `https://picsum.photos/seed/${img.seed}/500/500`;
  const dest = path.join(uploadDir, img.name);

  console.log(`Downloading ${img.name}...`);
  download(url, dest, (err) => {
    if (err) {
      console.error(`Failed to download ${img.name}:`, err.message);
    } else {
      console.log(`Successfully downloaded ${img.name}`);
    }
    // Continue after a short delay to avoid rate limiting
    setTimeout(() => {
      downloadSequentially(index + 1);
    }, 300);
  });
}

downloadSequentially(0);
