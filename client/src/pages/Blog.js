import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { FiClock, FiArrowRight, FiBookOpen, FiUser, FiCalendar, FiTag, FiHash } from 'react-icons/fi';

const BLOGS = [
  {
    id: 1,
    slug: 'khade-masale-ke-fayde',
    title: 'Khade Masale Ke Fayde — Kyu Hai Ye Sehat Ke Liye Zaruri?',
    excerpt: 'Kaali Mirch se lekar Elaichi tak — jaanein kaise khade masale aapke khane ka swaad aur sehat dono badhate hain. Ayurveda mein bhi hai inki mahatva.',
    category: 'Sehat & Poshan',
    emoji: '🌶️',
    date: '25 June 2025',
    readTime: '5 min',
    color: 'from-red-950 to-red-800',
    content: [
      {
        heading: 'Khade Masale Kya Hote Hain?',
        text: 'Khade masale wo masale hote hain jo poori (uncrushed) avastha mein use kiye jaate hain — jaise kali mirch ke daane, laung, jeera, elaichi, dalchini, tejpatta, badi elaichi aur star anise. Ye masale apni shuddh form mein sabse zyada poshan aur khushbu rakhte hain.',
      },
      {
        heading: '1. Kaali Mirch (Black Pepper) — Sehat Ka Raja',
        text: 'Kali mirch mein piperine hota hai jo metabolism ko 40% tak badhata hai. Ye haldi ke absorption ko bhi 2000% badhata hai. Roz sone se pehle ek glass doodh mein 2-3 kali mirch pees kar peene se immunity strong hoti hai aur zukam-khansi mein raahat milti hai.',
      },
      {
        heading: '2. Jeera (Cumin) — Pachan Ka Ramban',
        text: 'Jeera iron ka behtareen source hai — 100g jeera mein 66mg iron hota hai. Ye digestion sudharta hai, acidity kam karta hai, aur weight loss mein madad karta hai. Subah khali pet jeera paani peena ek amazing health hack hai jo hamare purvaj sadiyon se use karte aa rahe hain.',
      },
      {
        heading: '3. Elaichi (Cardamom) — Muh Ki Taazgi aur Dil Ka Dost',
        text: 'Elaichi mein antioxidants bhari maatra mein hote hain. Ye blood pressure normal rakhti hai, saas ki badboo khatam karti hai, aur anxiety kam karti hai. Chai mein ek elaichi daalana sirf swaad nahi, sehat ka investment bhi hai.',
      },
      {
        heading: '4. Laung (Cloves) — Dard Ka Dushman',
        text: 'Laung mein eugenol hota hai jo ek powerful natural painkiller hai. Daant dard mein laung ka tel lagate hain — ye ayurvedic nuskha aaj bhi doctors recommend karte hain. Laung liver ko protect karta hai aur blood sugar control mein help karta hai.',
      },
      {
        heading: 'Kaise Khareedein Shuddh Khade Masale?',
        text: 'Shuddh khade masale kharidte waqt dhyan dein: rang gehra aur vivid ho, khushbu tez ho, dane poore aur tute nahi hone chahiye. Milawati masalon mein rang phika hota hai aur khushbu kamzor. Pandit Ji Masale mein har batch tested aur certified hai — isiliye Gwalior aur MP ke logon ka hampar bharosa hai.',
      },
    ],
    tags: ['kali mirch', 'jeera', 'elaichi', 'laung', 'khade masale', 'sehat', 'ayurveda'],
  },
  {
    id: 2,
    slug: 'dry-fruits-ke-fayde',
    title: 'Roz Dry Fruits Khaane Ke 7 Kamaal Ke Fayde — Badam, Kaju, Pista',
    excerpt: 'Subah 5 badam khaana sirf ek aadat nahi — ye ek powerful health habit hai. Jaanein dry fruits ke wo fayde jo shayad aap nahi jaante.',
    category: 'Nutrition & Health',
    emoji: '🥜',
    date: '18 June 2025',
    readTime: '6 min',
    color: 'from-amber-950 to-amber-800',
    content: [
      {
        heading: 'Dry Fruits — Nature Ka Superfood',
        text: 'Dry fruits mein vitamins, minerals, fiber aur healthy fats ki bhari maatra hoti hai. Ye energy ka concentrated source hain aur ek chhoti mutthi dry fruits din bhar ki energy dene mein capable hain.',
      },
      {
        heading: '1. Badam (Almonds) — Dimaag Ka Khana',
        text: 'Badam mein Vitamin E, magnesium, omega-3 aur protein hota hai. Roz 5-7 bheege badam khaane se memory sharp hoti hai, skin glow karti hai aur cholesterol control mein rehta hai. Bheege badam mein tannin layer hatti hai jisse poshan 2x better absorb hota hai.',
      },
      {
        heading: '2. Kaju (Cashews) — Dil Ka Dost',
        text: 'Kaju mein healthy fats hote hain jo good cholesterol (HDL) badhate hain. Ismein zinc hota hai jo immunity strong karta hai. Kaju magnesium ka bhi achha source hai jo bones strong rakhta hai aur neend better karti hai.',
      },
      {
        heading: '3. Pista (Pistachios) — Blood Sugar Controller',
        text: 'Research mein aaya hai ki pista khane ke baad blood sugar spike kam hoti hai. Ye protein aur fiber ka combination hai jo ozone effect deta hai. Pista mein lutein aur zeaxanthin hote hain jo aankhen healthy rakhte hain.',
      },
      {
        heading: '4. Akhrot (Walnuts) — Heart Ka Rakshak',
        text: 'Akhrot ek maatra dry fruit hai jisme plant-based omega-3 (ALA) bhari maatra mein hai. Omega-3 heart disease ka risk 35-45% tak kam karta hai. Roj ek mutthi akhrot khaana ek powerful anti-aging habit hai.',
      },
      {
        heading: '5. Kishmish (Raisins) — Instant Energy',
        text: 'Kishmish natural sugar ka behtareen source hai. Athletes aur students ke liye ye ideal snack hai. Ismein iron hota hai jo anemia se bachata hai — khaaskar mahilaon ke liye bahut faydemand.',
      },
      {
        heading: 'Shuddh Dry Fruits Kahan Se Khareedein?',
        text: 'Dry fruits ki quality unhe dekhkar pata chalta hai — badam bhari aur unbroken ho, kaju ivory-white ho, akhrot ki giri poori ho. Pandit Ji Masale mein Gwalior aur poore MP ko premium quality dry fruits deliver ki jaati hai — seedha best sources se.',
      },
    ],
    tags: ['badam', 'kaju', 'pista', 'akhrot', 'dry fruits', 'sehat', 'nutrition'],
  },
  {
    id: 3,
    slug: 'ghar-mein-pooja-samagri',
    title: 'Ghar Mein Pooja Ke Liye Zaruri Samagri — Complete List 2025',
    excerpt: 'Har puja mein kya chahiye hota hai? Nitya pooja se lekar festival tak — yahan hai complete pooja samagri ki list jo har ghar mein honi chahiye.',
    category: 'Aadhyatmik',
    emoji: '🪔',
    date: '10 June 2025',
    readTime: '4 min',
    color: 'from-orange-950 to-orange-850',
    content: [
      {
        heading: 'Nitya Pooja (Daily Worship) Ki Zaruri Samagri',
        text: 'Roz ki pooja ke liye: Kapoor (camphor) — diya jalane aur aarti ke liye. Chandan (sandalwood) — tilak ke liye. Rui batti — deepak ke liye. Aggarbatti — dhoop ke liye. Gangajal — shuddhikaran ke liye. Kumkum, Haldi, Sindoor, Abeer-Gulal.',
      },
      {
        heading: 'Festivals Ke Liye Special Samagri',
        text: 'Navratri: Akshat (chawal), 5 meethe phal, naariyal, chunri, kapur. Diwali: Mitti ke diye, lakshmi pooja kit, mishri, lotus flower. Satyanarayan Pooja: Panch amrit (doodh, dahi, ghee, shahad, shakkar), tulsi patta, panchang.',
      },
      {
        heading: 'Shuddh Pooja Samagri Kyun Zaruri Hai?',
        text: 'Pooja mein shuddhi sabse pehle hoti hai. Milawati ya synthetic aggarbatti aur kapoor ko dharm shastron mein nishiddh mana gaya hai. Shuddh desi kapoor (bhimseni kapoor) completely jalta hai aur koi daag nahi chhodta — synthetic kapoor mein chemicals hote hain jo atmosphere aur puja dono ko affect karte hain.',
      },
      {
        heading: 'Pandit Ji Ki Pooja Samagri — Kyun Khaas Hai?',
        text: 'Pandit Ji Masale, Gwalior mein milne wali pooja samagri 100% shuddh aur natural hai. Hamaara kapoor bhimseni grade ka hai. Rui batti machine-rolled hai. Chandan ka powder genuine Mysore Chandan se bana hai. Gwalior, MP aur aas paas ke sheher mein hum doorstep delivery dete hain.',
      },
    ],
    tags: ['pooja samagri', 'nitya pooja', 'kapoor', 'chandan', 'rui batti', 'festival'],
  },
  {
    id: 4,
    slug: 'masale-kaise-store-karein',
    title: 'Masale Lamba Chalane Ka Sahi Tarika — Store Karne Ke 8 Tips',
    excerpt: 'Sahi tarike se store kiye masale 2-3 saal tak taze rehte hain. Galat storage se masalon ki khushbu aur gun kho jaate hain. Jaanein expert tips.',
    category: 'Kitchen Tips',
    emoji: '🫙',
    date: '2 June 2025',
    readTime: '4 min',
    color: 'from-green-950 to-green-800',
    content: [
      {
        heading: 'Masalon Ka Dushman — Namee, Roshni aur Hawa',
        text: 'Masale teen cheezon se jaldi kharab hote hain: moisture (namee), direct sunlight (dhoop) aur air (hawa). Agar aapke masale khule container mein kitchen ke paas hain to wo jaldi apni khushbu kho dete hain.',
      },
      {
        heading: 'Tip 1: Airtight Container Use Karein',
        text: 'Glass airtight containers sabse best hain. Plastic mein chemical reaction ho sakta hai. Steel dabba bhi achha hai lekin transparent container mein light effect hoti hai — isliye tinted ya opaque prefer karein.',
      },
      {
        heading: 'Tip 2: Khade Masale Alag, Pise Alag',
        text: 'Khade masale (sabut) pisi hui masalon se kahin zyada der tak chalte hain. Jeera, laung, kali mirch — teen saal tak sahi rehti hain sabut form mein. Pis jaane ke baad sirf 6-12 mahine hi freshness rehti hai.',
      },
      {
        heading: 'Tip 3: Fridge Mein Mat Rakhein (Kuch Ko Chhod Kar)',
        text: 'Zyaadatar masale room temperature par best rehte hain. Fridge mein condensation se namee aati hai. Exception: Hing (asafoetida) — ise fridge mein rakhna better hai kyunki iski smell bahut tez hoti hai.',
      },
      {
        heading: 'Tip 4: Fresh Ki Pehchaan',
        text: 'Taza masalon ki pehchaan: haath par ragad kar dekho — agar tez khushbu aaye to fresh hai. Jeera ko haath mein lo — agar tel jaisa feel ho (oily texture) to fresh hai, agar sukha mehsus ho to purana hai.',
      },
    ],
    tags: ['masale store', 'kitchen tips', 'masale fresh', 'spice storage'],
  },
];

// Blog List Page
export const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState('Sab');

  const filteredBlogs = activeCategory === 'Sab'
    ? BLOGS
    : BLOGS.filter(blog => blog.category === activeCategory);

  const categories = ['Sab', 'Sehat & Poshan', 'Nutrition & Health', 'Aadhyatmik', 'Kitchen Tips'];

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title="Blog — Masale, Dry Fruits & Pooja Ke Baare Mein Jaanein"
        description="Pandit Ji Masale ke blog mein padhe masalon ke fayde, dry fruits nutrition, pooja samagri guide aur kitchen tips. Gwalior, MP se aapke liye."
        keywords="masale ke fayde, dry fruits benefits, pooja samagri guide, khade masale kaise use karein, kitchen tips hindi"
        url="/blog"
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-maroon to-darkbrown text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Pandit Ji Knowledge Center
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Ayurvedic & Healthy Living Blog 📚</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Shuddh Khade Masale, Premium Dry Fruits, aur Pooja Vidhi ke labh aur sahi nuskhe jaanein.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-10 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border cursor-pointer
                ${activeCategory === cat
                  ? 'bg-maroon text-white border-maroon shadow-md shadow-maroon/20 scale-105'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-maroon hover:text-maroon hover:bg-maroon/5'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="font-heading font-bold text-lg text-darkbrown">Koi article nahi mila</h3>
            <p className="text-gray-500 text-sm mt-1">Kripya koi doosra category chunein.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredBlogs.map(blog => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
              >
                {/* Header Banner Color block */}
                <div className={`bg-gradient-to-r ${blog.color} p-8 relative overflow-hidden flex items-center justify-between`}>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <span className="text-5xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{blog.emoji}</span>
                  <span className="bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-white text-xs font-semibold shadow-sm">
                    {blog.category}
                  </span>
                </div>
                {/* Body details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-gray-400 text-xs mb-3 font-medium">
                      <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readTime} read</span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>
                    <h2 className="font-heading font-bold text-lg md:text-xl text-darkbrown mb-3.5 group-hover:text-maroon transition-colors leading-snug">
                      {blog.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{blog.excerpt}</p>
                  </div>
                  <div className="flex items-center text-maroon text-sm font-bold border-t border-gray-50 pt-4 mt-auto group-hover:text-maroon-light transition-colors">
                    <span>Poora Padein</span>
                    <FiArrowRight size={16} className="ml-1.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Shuddh Quality Promo Banner */}
        <div className="mt-16 bg-gradient-to-br from-darkbrown to-maroon rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg border border-maroon/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="bg-gold text-darkbrown px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                100% Pure & Organic
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2.5">Ghar Baithe Order Karein 🌶️</h3>
              <p className="text-white/80 text-sm md:text-base max-w-lg leading-relaxed">
                Pandit Ji se khareedein shuddh khade masale, taaza dry fruits, aur certified pooja samagri. Free delivery on orders above ₹499!
              </p>
            </div>
            <Link to="/shop" className="bg-gold text-darkbrown hover:bg-gold-dark px-8 py-3.5 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-md shadow-gold/20 flex items-center gap-1 text-base">
              Shop Catalog Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Blog Post Page
export const BlogPost = ({ slug }) => {
  const blog = BLOGS.find(b => b.slug === slug);
  if (!blog) return (
    <div className="text-center py-20 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <p className="text-6xl mb-4">🔍</p>
      <h2 className="text-2xl font-bold text-darkbrown font-heading">Article Nahi Mila</h2>
      <p className="text-gray-500 mt-1">Jis blog article ko aap dhoond rahe hain wo abhi uplabdh nahi hai.</p>
      <Link to="/blog" className="mt-6 btn-primary px-6 py-2.5">← Blog par waapis jaayein</Link>
    </div>
  );

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    author: { '@type': 'Organization', name: 'Pandit Ji Masale' },
    publisher: { '@type': 'Organization', name: 'Pandit Ji Masale', logo: { '@type': 'ImageObject', url: 'https://client-chi-silk.vercel.app/favicon.ico' } },
    datePublished: blog.date,
    inLanguage: 'hi-IN',
    keywords: blog.tags.join(', '),
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <SEO
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.tags.join(', ')}
        url={`/blog/${blog.slug}`}
        type="article"
        structuredData={schemaArticle}
      />

      {/* Article Hero Banner */}
      <div className={`bg-gradient-to-br ${blog.color} text-white py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <Link to="/blog" className="text-white/80 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition-colors font-medium">
            ← Waapis Blog List par
          </Link>
          <span className="text-6xl block mb-4 filter drop-shadow-md">{blog.emoji}</span>
          <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-sm font-semibold mb-4">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-6">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm border-t border-white/10 pt-5">
            <span className="flex items-center gap-1"><FiUser /> By Pandit Ji Editor</span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1"><FiClock /> {blog.readTime} read</span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1"><FiCalendar /> {blog.date}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Abstract/Excerpt Quote */}
        <div className="bg-white border-l-4 border-maroon rounded-r-2xl p-6 shadow-sm mb-10">
          <p className="text-darkbrown font-medium leading-relaxed italic text-base md:text-lg">
            "{blog.excerpt}"
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-8">
          {blog.content.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow">
              <h2 className="font-heading font-bold text-xl md:text-2xl text-darkbrown mb-4 border-b border-gray-50 pb-2.5">
                {section.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1">
            <FiTag /> Related Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <span key={tag} className="bg-maroon/5 text-maroon hover:bg-maroon/10 border border-maroon/10 text-sm px-3.5 py-1.5 rounded-full font-medium transition-colors flex items-center gap-0.5">
                <FiHash className="opacity-40" />{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mt-12 flex items-start gap-4 shadow-sm">
          <div className="w-12 h-12 bg-maroon text-gold font-bold font-heading rounded-full flex items-center justify-center text-lg flex-shrink-0">
            PJ
          </div>
          <div>
            <h4 className="font-bold text-darkbrown">Pandit Ji Editorial Team</h4>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Pandit Ji Masale Gwalior ka official channel. Hum shuddh aur gunakari masalon, dry fruits aur aadhyaatmik pooja vidhiyo se judi sahi jankari aap tak pahuchate hain.
            </p>
          </div>
        </div>

        {/* Shop CTA Card */}
        <div className="mt-12 bg-gradient-to-r from-maroon to-darkbrown rounded-3xl p-8 text-white text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          <p className="text-gold font-bold uppercase tracking-wider text-xs mb-2">Buy Direct & Save</p>
          <h3 className="text-2xl font-heading font-bold mb-3">Kya Aapko Shuddh Masale Chahiye?</h3>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
            100% natural bina kisi chemical ya rang milawat ke. Doorstep delivery at your home.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/shop" className="bg-gold text-darkbrown px-8 py-3 rounded-xl font-bold hover:bg-gold-dark transition-all duration-200 shadow-md">
              Order Online
            </Link>
            <a href="https://wa.me/917415992703?text=Namaste!%20Mujhe%20pure%20masale%20order%20karne%2520hain" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-all duration-200 shadow-md flex items-center gap-1">
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Read More Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-heading font-bold text-2xl text-darkbrown mb-6 flex items-center gap-2">
            <FiBookOpen className="text-maroon" /> Aur Bhi Padein (Read More)
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {BLOGS.filter(b => b.id !== blog.id).slice(0, 2).map(b => (
              <Link
                key={b.id}
                to={`/blog/${b.slug}`}
                className="bg-white rounded-2xl border border-gray-150 p-5 hover:border-maroon hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl filter drop-shadow-sm">{b.emoji}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                      {b.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-darkbrown text-base group-hover:text-maroon transition-colors leading-snug line-clamp-2">
                    {b.title}
                  </h4>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
                  {b.readTime} read • {b.date}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
