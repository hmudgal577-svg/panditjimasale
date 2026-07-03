import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-darkbrown text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center">
                <span className="text-gold font-heading font-bold">PJ</span>
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-gold block">Pandit Ji Masale</span>
                <span className="text-xs text-gray-400">Gwalior, Madhya Pradesh</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Shudhta Aapke Ghar Tak. Premium Khade Masale, Dry Fruits, aur Pooja Samagri — Gwalior se poore India mein deliver hoti hai.
            </p>
            <div className="flex space-x-3">
              <a href="https://wa.me/917415992703" target="_blank" rel="noreferrer" className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-maroon transition-colors" aria-label="Facebook"><FiFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-maroon transition-colors" aria-label="Instagram"><FiInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-maroon transition-colors" aria-label="YouTube"><FiYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-gold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-gray-300 hover:text-gold transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=whole-spices" className="text-gray-300 hover:text-gold transition-colors">🌶️ Khade Masale</Link></li>
              <li><Link to="/shop?category=dry-fruits" className="text-gray-300 hover:text-gold transition-colors">🥜 Dry Fruits</Link></li>
              <li><Link to="/shop?category=pooja-items" className="text-gray-300 hover:text-gold transition-colors">🪔 Pooja Samagri</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-gold transition-colors">📚 Blog & Tips</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-bold text-gold mb-4 text-lg">Help & Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link to="/shipping-policy" className="text-gray-300 hover:text-gold transition-colors">Shipping Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-gold transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-gold mb-4 text-lg">Hamaare Paas</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <FiMapPin className="mt-1 text-gold flex-shrink-0" />
                <span className="text-gray-300">Birla Nagar, Gwalior, Madhya Pradesh - 474004</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaWhatsapp className="text-green-400 flex-shrink-0" />
                <a href="https://wa.me/917415992703" className="text-gray-300 hover:text-gold transition-colors">+91 7415992703</a>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="text-gold flex-shrink-0" />
                <a href="mailto:hmudgal577@gmail.com" className="text-gray-300 hover:text-gold transition-colors">hmudgal577@gmail.com</a>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-gray-400 mb-2">We Accept</p>
              <div className="flex space-x-2 flex-wrap gap-1">
                <span className="px-2 py-1 bg-white/10 rounded text-xs">Visa</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">Mastercard</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">UPI</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">NetBanking</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">COD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Pandit Ji Masale, Gwalior MP. All rights reserved.</p>
          <p className="text-gold text-xs font-medium">Shudhta Aapke Ghar Tak 🌶️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
