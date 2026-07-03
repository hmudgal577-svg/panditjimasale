import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { FiClock, FiArrowRight } from 'react-icons/fi';

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
    color: 'from-red-800 to-red-600',
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
    color: 'from-amber-700 to-amber-500',
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
    color: 'from-orange-700 to-orange-500',
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
    color: 'from-green-800 to-green-600',
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
export const BlogList = () => (
  <div className="bg-gray-50 min-h-screen">
    <SEO
      title="Blog — Masale, Dry Fruits & Pooja Ke Baare Mein Jaanein"
      description="Pandit Ji Masale ke blog mein padhe masalon ke fayde, dry fruits nutrition, pooja samagri guide aur kitchen tips. Gwalior, MP se aapke liye."
      keywords="masale ke fayde, dry fruits benefits, pooja samagri guide, khade masale kaise use karein, kitchen tips hindi"
      url="/blog"
    />

    {/* Header */}
    <div className="bg-gradient-to-r from-maroon to-darkbrown text-white py-14">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-gold font-medium mb-2 text-sm uppercase tracking-widest">Pandit Ji Ka</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">Knowledge Hub 📚</h1>
        <p className="text-white/75 text-lg max-w-xl mx-auto">Masale, Dry Fruits aur Pooja Samagri ke baare mein useful jankari — aapke liye</p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {['Sab', 'Sehat & Poshan', 'Nutrition & Health', 'Aadhyatmik', 'Kitchen Tips'].map(cat => (
          <span key={cat} className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 cursor-default hover:border-maroon hover:text-maroon transition-colors">
            {cat}
          </span>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 gap-7">
        {BLOGS.map(blog => (
          <Link key={blog.id} to={`/blog/${blog.slug}`} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            {/* Card Top Color */}
            <div className={`bg-gradient-to-r ${blog.color} p-6 relative overflow-hidden`}>
              <span className="text-5xl">{blog.emoji}</span>
              <div className="absolute right-4 top-4 bg-white/20 rounded-full px-3 py-1 text-white text-xs font-medium">
                {blog.category}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readTime} read</span>
                <span>•</span>
                <span>{blog.date}</span>
              </div>
              <h2 className="font-heading font-bold text-lg text-darkbrown mb-2 group-hover:text-maroon transition-colors leading-snug">
                {blog.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
              <div className="flex items-center text-maroon text-sm font-semibold group-hover:gap-2 transition-all gap-1">
                Poora Padein <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 bg-gradient-to-r from-maroon to-darkbrown rounded-2xl p-8 text-white text-center">
        <h3 className="font-heading font-bold text-2xl mb-2">Shuddh Masale Order Karein 🌶️</h3>
        <p className="text-white/75 mb-5">Gwalior aur poore India mein free delivery ₹499+ orders par</p>
        <Link to="/shop" className="inline-block bg-gold text-darkbrown px-8 py-3 rounded-xl font-bold hover:bg-gold-dark transition-colors">
          Abhi Shop Karein →
        </Link>
      </div>
    </div>
  </div>
);

// Individual Blog Post Page
export const BlogPost = ({ slug }) => {
  const blog = BLOGS.find(b => b.slug === slug);
  if (!blog) return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">📄</p>
      <h2 className="text-2xl font-bold text-darkbrown">Article nahi mila</h2>
      <Link to="/blog" className="mt-4 inline-block text-maroon hover:underline">← Blog par waapis jaayein</Link>
    </div>
  );

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    author: { '@type': 'Organization', name: 'Pandit Ji Masale' },
    publisher: { '@type': 'Organization', name: 'Pandit Ji Masale', logo: { '@type': 'ImageObject', url: 'https://panditjimasale.com/logo.png' } },
    datePublished: blog.date,
    inLanguage: 'hi-IN',
    keywords: blog.tags.join(', '),
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.tags.join(', ')}
        url={`/blog/${blog.slug}`}
        type="article"
        structuredData={schemaArticle}
      />

      {/* Hero */}
      <div className={`bg-gradient-to-r ${blog.color} text-white py-14`}>
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/blog" className="text-white/70 hover:text-white text-sm mb-4 inline-flex items-center gap-1">
            ← Blog par waapis
          </Link>
          <span className="text-5xl block mb-4">{blog.emoji}</span>
          <div className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm mb-4">{blog.category}</div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold leading-snug mb-4">{blog.title}</h1>
          <div className="flex items-center gap-3 text-white/70 text-sm">
            <span className="flex items-center gap-1"><FiClock size={13} /> {blog.readTime} read</span>
            <span>•</span>
            <span>{blog.date}</span>
            <span>•</span>
            <span>Pandit Ji Masale, Gwalior</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Intro */}
        <div className="bg-maroon/5 border-l-4 border-maroon rounded-r-xl p-5 mb-8">
          <p className="text-darkbrown font-medium leading-relaxed italic">"{blog.excerpt}"</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {blog.content.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-heading font-bold text-xl text-darkbrown mb-3">{section.heading}</h2>
              <p className="text-gray-600 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="bg-maroon/10 text-maroon text-sm px-3 py-1.5 rounded-full font-medium">#{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-maroon to-darkbrown rounded-2xl p-7 text-white text-center">
          <p className="text-lg font-heading font-bold mb-2">Shuddh Masale Khareedein 🛒</p>
          <p className="text-white/70 text-sm mb-4">Gwalior se poore India mein delivery • WhatsApp: 7415992703</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/shop" className="bg-gold text-darkbrown px-6 py-2.5 rounded-xl font-bold hover:bg-gold-dark transition-colors text-sm">
              Shop Now →
            </Link>
            <a href="https://wa.me/917415992703" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-colors text-sm">
              WhatsApp Order
            </a>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-10">
          <h3 className="font-heading font-bold text-xl text-darkbrown mb-5">Aur Bhi Padein 📖</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {BLOGS.filter(b => b.id !== blog.id).slice(0, 2).map(b => (
              <Link key={b.id} to={`/blog/${b.slug}`} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-maroon hover:shadow-sm transition-all group">
                <span className="text-2xl">{b.emoji}</span>
                <h4 className="font-semibold text-darkbrown text-sm mt-2 group-hover:text-maroon transition-colors leading-snug">{b.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{b.readTime} read • {b.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
