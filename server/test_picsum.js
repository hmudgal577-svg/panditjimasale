const https = require('https');
const http = require('http');
const fs = require('fs');
const urlModule = require('url');

function download(url, dest, callback) {
  const parsedUrl = urlModule.parse(url);
  const protocol = parsedUrl.protocol === 'https:' ? https : http;

  const request = protocol.get(url, (response) => {
    // handle redirect
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

download('https://picsum.photos/seed/almonds/500/500', 'c:/Users/hmudg/OneDrive/Desktop/panditjimasale/server/uploads/test_almond_picsum.jpg', (err) => {
  if (err) {
    console.error('Download failed:', err.message);
  } else {
    console.log('Download successful! File size:', fs.statSync('c:/Users/hmudg/OneDrive/Desktop/panditjimasale/server/uploads/test_almond_picsum.jpg').size);
  }
});
