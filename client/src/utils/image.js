/**
 * Resolves local upload image paths to absolute backend URLs in production.
 * In development, returns the relative path which is handled by the dev server proxy.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/500x500?text=Pandit+Ji';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;

  // Extract base URL from REACT_APP_API_URL environment variable
  const apiUrl = process.env.REACT_APP_API_URL || '';
  if (apiUrl) {
    const baseUrl = apiUrl.replace(/\/api$/, '');
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${baseUrl}${cleanPath}`;
  }

  // Fallback to relative path in local development (handled by package.json proxy)
  return imagePath;
};
