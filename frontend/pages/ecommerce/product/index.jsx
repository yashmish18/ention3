import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import Link from "next/link";
import { cn } from '../../../lib/utils';
import TestCarousel from '../../../components/TestCarousel';

// Hero carousel: 5 slides, all with the same background image
// Remove mock arrays
// const heroSlides = Array(5).fill("/assets/slide-1.jpg");
// const categories = [...];
// const products = [...];

const heroSlides = [];
const categories = [];
const products = [];

// Minimal, modern carousel for the product homepage


const workbookSeries = [
  {
    key: 'E5',
    name: 'Workbook series E5',
    features: [
      'Made for Everyday Hustlers,',
      'Powerful yet Budget Friendly,',
      'Control at your fingertips,',
      'Intel N95 processor upto 3.4Ghz (6Mb cache, 4 core, 4thread)',
      'Window 11',
      'Display 15.6inch, full HD IPS',
    ],
    bag: 'Laptop bag worth 1500',
    price: '₹' + (Math.floor(Math.random() * 10000) + 40000),
    image: '/assets/all_product_page/e5.webp',
  },
  {
    key: 'E4',
    name: 'Workbook series E4',
    features: [
      'Made for techy and Professional',
      'Powerful yet Budget Friendly,',
      'Dual RAM and Dual SSD slots give you the freedom to expand',
      'Intel i7 13th gen processor13620H 24M Cache, up to 4.90 GHz',
      'Window 11',
      'Display 15.6inch, full HD IPS',
    ],
    bag: 'Laptop bag worth 1500',
    price: '₹' + (Math.floor(Math.random() * 10000) + 50000),
    image: '/assets/all_product_page/e4.webp',
  },
  // {
  //   key: 'E3',
  //   name: 'Workbook series E3',
  //   features: [
  //     'Made for rough use',
  //     'dual heating system',
  //     'With a full-metal body,',
  //     'Intel i5-13500H has 18 MB of L3 cache 2.6 boost up to 4.7 GHz',
  //     'Window 11',
  //     'Display 15.6inch, full HD IPS',
  //   ],
  //   bag: 'Laptop bag worth 1500',
  //   price: '₹' + (Math.floor(Math.random() * 10000) + 30000),
  //   image: '/assets/product_/e3/1.png',
  // },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const autoScrollTimeout = useRef();

  useEffect(() => {
    autoScrollTimeout.current = setTimeout(() => {
      setActive((a) => (a + 1) % heroSlides.length);
    }, 3500);
    return () => clearTimeout(autoScrollTimeout.current);
  }, [active]);

  return (
    <section className="bg-gradient-to-b from-[#070D2A] via-[#133B5C] to-[#0FAFCA] relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Slide image */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <Image
          src={heroSlides[active]}
          alt="Hero Slide"
          width={1200}
          height={600}
          style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#222', display: 'block' }}
          onError={e => { e.target.style.background = '#222'; e.target.src = ''; }}
        />
        <div className="absolute inset-0 bg-black/70 z-0" />
      </div>
      {/* Carousel controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full border-2 ${active === i ? 'bg-[#007e9e] border-white' : 'bg-transparent border-white/50'} transition`}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>
    </section>
  );
}

const CategoryCard = ({ category }) => (
  <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 hover:scale-105 transition border border-[#e5e7eb]">
    <Image src={category.image} alt={category.name} width={80} height={80} className="mb-2 object-contain" />
    <span className="font-semibold text-[#000f29] mt-2">{category.name}</span>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 border border-[#e5e7eb]">
    <Image
      src={product.image}
      alt={product.name}
      width={400}
      height={227}
      className="w-full h-56 object-contain rounded-t-xl bg-[#f7fafc]"
    />
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-lg font-semibold mb-2 text-[#000f29]">{product.name}</h3>
      <p className="text-[#007e9e] text-xl font-bold mb-4">{product.price}</p>
      <Link href={`/ecommerce/product/e${product.id}`} className="mt-auto bg-[#007e9e] text-white rounded-3xl py-2 px-6 hover:bg-[#01E9FE] hover:text-[#000f29] transition-all text-center">Buy Now</Link>
    </div>
  </div>
);

const PromoBanner = () => (
  <section className="w-full bg-white py-10 flex flex-col items-center justify-center text-center border-t border-b border-[#e5e7eb]">
    <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
      <Image src="/assets/annual-compliance.png" alt="Promo" width={120} height={120} className="rounded-lg" />
      <div>
        <h3 className="text-2xl font-bold text-[#007e9e] mb-2">Special Offer: Free Shipping on Orders Over ₹10,000!</h3>
        <p className="text-lg text-[#000f29]">Limited time only. Shop your favorites now.</p>
      </div>
    </div>
  </section>
);

function WorkbookCard({ series }) {
  // Map series.key to product id
  const idMap = { E5: 5, E4: 4, E3: 3 };
  const productId = idMap[series.key];
  // Special handling for E3: show blurred card with 'Launching Soon'
  if (series.key === 'E3') {
    return (
      <div className="bg-[#b9d2df] shadow-2xl flex flex-col md:flex-row overflow-hidden border-0 h-[380px] my-6">
        <div className="flex-1 flex flex-col justify-between p-4 relative z">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#0d223a]">Workbook series E3</h2>
            <ul className="list-disc pl-6 mb-4 text-base text-[#222] space-y-1">
              <li>Launching Soon</li>
            </ul>
          </div>
        </div>
        <div className="md:w-1/2 w-full h-full flex items-center justify-center relative">
          <div className="w-full h-full flex items-center justify-center bg-[#b9d2df] blur-sm absolute inset-0 z-0" />
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#007e9e] z-10">Launching Soon</span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#b9d2df] shadow-2xl flex flex-col md:flex-row overflow-hidden border-0 h-[380px] my-6">
      {/* Left: Details */}
      <div className="flex-1 flex flex-col justify-between p-4 relative z">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#0d223a]">{series.name}</h2>
          <ul className="list-disc pl-6 mb-4 text-base text-[#222] space-y-1">
            {series.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <div className="text-sm text-[#007e9e] mb-2">{series.bag}</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t pt-2 mt-2">
          <div className="text-lg font-semibold text-[#0d223a]">
            <span className="text-3xl font-extrabold text-[#007e9e] block mt-2 mb-1">Coming Soon</span>
          </div>
          <div className="mt-4 md:mt-0 flex gap-8 justifycenter mr-[70px]">
            <Link href={`/ecommerce/product/e${productId}`} legacyBehavior>
              <a className="text-[#007e9e] underline font-medium hover:text-[#01E9FE] transition">Learn more</a>
            </Link>
            <Link href={`/ecommerce/product/e${productId}`} legacyBehavior>
              <a className="text-[#007e9e] underline font-medium hover:text-[#01E9FE] transition">Shop Now</a>
            </Link>
          </div>
        </div>
      </div>
      {/* Right: Image */}
      <div className="md:w-1/2 w-full h-full flex items-center justify-center">
        <Image
          src={series.image}
          alt={series.name}
          width={400}
          height={380}
          className="w-full h-[980%] object-contain shadow-lg"
          style={{ background: 'transparent', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

function WorkbookCardMobile({ series }) {
  // Map series.key to product id
  const idMap = { E5: 5, E4: 4, E3: 3 };
  const productId = idMap[series.key];
  return (
    <div className="bg-[#b9d2df] shadow flex flex-col p-2 my-6 w-full max-w-xs mx-auto">
      {/* Image at the very top, full width, no rounded corners, larger height */}
      <div className="w-full">
        <Image
          src={series.image}
          alt={series.name}
          width={600}
          height={360}
          className="object-contain w-full h-80"
          style={{ background: 'transparent', objectFit: 'contain' }}
        />
      </div>
      {/* All text content below the image */}
      <h2 className="text-lg font-bold text-[#0d223a] mb-1 mt-4">{series.name}</h2>
      <ul className="list-disc pl-4 text-sm text-[#222] mb-1">
        {series.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <div className="text-xs text-[#007e9e] mb-1">{series.bag}</div>
      <div className="flex flex-col gap-1 border-t pt-1 mt-1 text-xs">
        <div className="w-full text-center">
          <span className="text-2xl font-extrabold text-[#007e9e] block mt-2 mb-1">Coming Soon</span>
        </div>
        <div className="flex gap-2 mt-1">
          <div className="flex w-4/5 mx-auto justify-between">
            <Link href={`/ecommerce/product/e${productId}`} legacyBehavior>
              <a className="text-[#007e9e] underline font-medium hover:text-[#01E9FE] transition">Learn more</a>
            </Link>
            <Link href={`/ecommerce/product/e${productId}`} legacyBehavior>
              <a className="text-[#007e9e] underline font-medium hover:text-[#01E9FE] transition">Shop Now</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4  border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};

export default function ProductLandingPage() {
  const [activeTab, setActiveTab] = useState("workbook");
  const [filter, setFilter] = useState("all");

  const filteredProducts = filter === "all"
    ? products
    : products.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070D2A] via-[#133B5C] to-[#0FAFCA] overflow-x-hidden">
      {/* Super smooth transparent carousel */}
      <div className="w-full flex justify-center items-center pb-4 py-[150px]">
        <TestCarousel />
      </div>
      {/* Filter and Tab Content */}
      <section className="max-w-7xl mx-auto py-12 px-2 sm:px-4">
        {activeTab === "workbook" && (
          <>
            <div className="hidden md:flex flex-col gap-8">
              {workbookSeries.map((series) => (
                <WorkbookCard key={series.key} series={series} />
              ))}
            </div>
            <div className="block md:hidden w-full flex flex-col items-center justify-center">
              {workbookSeries.map((series) => (
                <WorkbookCardMobile key={series.key} series={series} />
              ))}
            </div>
          </>
        )}
        {activeTab === "swapbook" && (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <h2 className="text-2xl font-bold text-[#000] mb-6 text-center">Swapbook Series</h2>
            <span className="text-2xl font-bold text-[#01E9FE]">Coming Soon.</span>
          </div>
        )}
      </section>
    
      {/* Promotional Banner and Newsletter Signup only for Home tab */}
      {activeTab === "home" && (
        <>
          <PromoBanner />
          {/* Newsletter Signup */}
          <section className="w-full bg-white py-12 flex flex-col items-center justify-center text-center border-t border-[#e5e7eb]">
            <Image src="/assets/news.png" alt="Newsletter" width={80} height={80} className="mb-4" />
            <h2 className="text-2xl font-bold text-[#000f29] mb-4">Subscribe to Our Newsletter</h2>
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <input type="email" placeholder="Enter your email" className="rounded-3xl px-6 py-3 flex-1 outline-none border border-[#007e9e]" />
              <button type="submit" className="bg-[#007e9e] text-white font-bold rounded-3xl px-8 py-3 hover:bg-[#01E9FE] hover:text-[#000f29] transition">Subscribe</button>
            </form>
          </section>
        </>
      )}
    </div>
  );
}
