import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiAward, FiHeart, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaLeaf, FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const About = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pandit Ji Masale',
    description: 'Premium quality Khade Masale, Dry Fruits, and Pooja Samagri in Gwalior, Madhya Pradesh.',
    url: 'https://panditjimasale.com',
    telephone: '+917415992703',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gwalior',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'State', name: 'Madhya Pradesh' },
    priceRange: '₹₹',
    openingHours: 'Mo-Su 09:00-21:00',
    sameAs: ['https://wa.me/917415992703'],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title="About Us — Pandit Ji Masale, Gwalior MP"
        description="Pandit Ji Masale, Gwalior — Madhya Pradesh ka sabse bharosemand masale ka online store. Pure Khade Masale, Dry Fruits & Pooja Samagri. WhatsApp: 7415992703."
        keywords="pandit ji masale gwalior, masale gwalior mp, khade masale madhya pradesh, about pandit ji masale"
        url="/about"
        structuredData={schema}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-maroon to-darkbrown text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-darkbrown font-heading font-bold text-3xl">PJ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">Hamare Baare Mein</h1>
          <p className="text-white/80 text-lg">Shudhta Aapke Ghar Tak — Gwalior, Madhya Pradesh</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">

        {/* Story */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="font-heading font-bold text-2xl text-darkbrown mb-4">Hamari Kahani 📖</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Pandit Ji Masale</strong> ki shuruaat ek saral soch se hui — ki Gwalior aur poore Madhya Pradesh ke har ghar mein <strong>shuddh, milawat-mukt masale</strong> pahunchein. Hamare dada-pardata ke zamaane se masalon ki shuddhi ka ek vishesh mahatva raha hai.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Aaj hum <strong>Gwalior, MP</strong> se poore India mein premium Khade Masale, Dry Fruits aur Pooja Samagri deliver karte hain. Hum seedha kisan se kharidta hain — Kerala ki kali mirch, Kashmir ki elaichi, Rajasthan ka jeera — aur aapke ghar tak fresh pahunchate hain.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Hamare saath har order ek vaada hai — <strong>shuddhata ka, taazgi ka, aur vishwas ka.</strong>
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: <FiShield size={28} />, title: '100% Pure & Natural', desc: 'Koi milawat nahi, koi artificial color nahi. Sirf shuddh masale jaise prakriti ne banaye hain.' },
            { icon: <FaLeaf size={28} />, title: 'Seedha Kisan Se', desc: 'Hum seedha best farms se kharidta hain — aapko behtareen quality milti hai, kisan ko sahi daam.' },
            { icon: <FiAward size={28} />, title: 'Quality Tested', desc: 'Har batch ki khushbu, rang aur shuddhi ki janch hoti hai aapke ghar pahunchne se pehle.' },
            { icon: <FiHeart size={28} />, title: 'Parivar Ki Tarah', desc: 'Har order hamara apna order hai. Aapki santushti hamare liye sabse bada puraskar hai.' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex gap-4">
              <div className="w-12 h-12 bg-maroon/10 rounded-xl flex items-center justify-center text-maroon flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-heading font-bold text-lg text-darkbrown mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="font-heading font-bold text-2xl text-darkbrown mb-6">Hamara Pata 📍</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-maroon/10 rounded-xl flex items-center justify-center text-maroon flex-shrink-0"><FiMapPin size={20} /></div>
              <div>
                <p className="font-semibold text-darkbrown">Hamare Yahan</p>
                <p className="text-gray-500 text-sm mt-1">Birla Nagar, Gwalior<br />Madhya Pradesh - 474004</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0"><FaWhatsapp size={20} /></div>
              <div>
                <p className="font-semibold text-darkbrown">WhatsApp Order</p>
                <a href="https://wa.me/917415992703" target="_blank" rel="noopener noreferrer" className="text-green-600 text-sm font-medium mt-1 block hover:underline">+91 7415992703</a>
                <p className="text-gray-400 text-xs">Mon–Sun, 9am–9pm</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-maroon/10 rounded-xl flex items-center justify-center text-maroon flex-shrink-0"><FiMail size={20} /></div>
              <div>
                <p className="font-semibold text-darkbrown">Email</p>
                <a href="mailto:hmudgal577@gmail.com" className="text-gray-500 text-sm mt-1 block hover:underline">hmudgal577@gmail.com</a>
                <p className="text-gray-400 text-xs">24 ghante mein reply</p>
              </div>
            </div>
          </div>
        </div>

        {/* Promise Banner */}
        <div className="bg-gradient-to-r from-maroon to-darkbrown text-white rounded-2xl p-8 text-center">
          <h2 className="font-heading font-bold text-2xl mb-3">Hamara Vaada 🤝</h2>
          <p className="text-white/90 leading-relaxed max-w-2xl mx-auto mb-6">
            Pandit Ji Masale mein har product ke saath hamaari personal guarantee hai. Agar koi bhi product aapko pasand na aaye — hum bina koi sawaal ke replace ya refund karenge. Kyunki aapka vishwas hi hamaari sabse badi sampatti hai.
          </p>
          <Link to="/shop" className="inline-block bg-gold text-darkbrown px-8 py-3 rounded-xl font-bold hover:bg-gold-dark transition-colors">
            Abhi Shop Karein →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
