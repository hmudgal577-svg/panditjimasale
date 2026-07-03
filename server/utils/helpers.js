const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PJ-${timestamp}${random}`;
};

const calculateGST = (amount, rate = 0.05) => {
  return Math.round(amount * rate * 100) / 100;
};

module.exports = { slugify, generateOrderId, calculateGST };
