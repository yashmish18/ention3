import React from 'react';
import ContactForm from '../../components/ContactForm';

export default function CollaboratePage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#133B5C] via-[#0FAFCA] to-[#007e9e] flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">Collaborate With ENTION</h1>
        <p className="text-lg md:text-2xl text-cyan-100 max-w-2xl mx-auto mb-6 font-medium">We believe in the power of partnership to drive innovation and growth. ENTION is actively seeking collaborations with investors, technology partners, and distributors who share our vision for the future of computing.</p>
      </section>
      {/* Why Partner With Us */}
      <section className="py-12 px-4 grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-3">Why Partner With Us?</h2>
          <p className="text-base text-cyan-100 mb-6">ENTION is not just a laptop company; we are a hub of innovation, committed to pushing the boundaries of technology. Partnering with us means joining a journey of creating impactful products that resonate with a global audience.</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 size-6 text-[#0FAFCA] mt-1">
                {/* Market Leadership Icon */}
                <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.75-2.25M21 12l-3.75 2.25" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Market Leadership</h3>
                <p className="text-base text-cyan-100">Benefit from our established brand presence and rapidly growing market share in the premium laptop segment.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 size-6 text-[#0FAFCA] mt-1">
                {/* Innovative Pipeline Icon */}
                <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6"><path d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Innovative Pipeline</h3>
                <p className="text-base text-cyan-100">Gain access to our pipeline of next-generation products that are set to redefine the user experience.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 size-6 text-[#0FAFCA] mt-1">
                {/* Shared Success Icon */}
                <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Shared Success</h3>
                <p className="text-base text-cyan-100">We are dedicated to building mutually beneficial relationships that foster long-term growth and profitability.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-96 bg-center bg-cover rounded-xl shadow-lg" style={{backgroundImage: 'url("/assets/all_product_page/all product carousal 6.webp")'}}></div>
      </section>
      {/* Become an Investor + Contact Form */}
      <section className="py-16 px-4 bg-white/10 rounded-xl shadow-sm my-16 w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-3">Become an Investor</h2>
            <p className="text-base text-cyan-100 mb-6">ENTION presents a compelling investment opportunity. We have a proven track record of growth, a strong financial position, and a clear roadmap for future expansion. Join us in capitalizing on the burgeoning market for high-performance laptops.</p>
            <a className="bg-[#0FAFCA] hover:bg-[#007e9e] text-[#000f29] font-bold py-2 px-4 rounded-lg focus:outline-none transition" href="#">Download Investor Deck</a>
          </div>
          <div className="bg-white/80 rounded-lg shadow-md p-6 card">
            <h3 className="text-xl font-semibold text-[#133B5C] mb-4">Get in Touch</h3>
            <ContactForm />
          </div>
        </div>
      </section>
      {/* Partnership Opportunities */}
      <section className="py-12 px-4 w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-white text-center mb-4">Partnership Opportunities</h2>
        <p className="text-base text-cyan-100 text-center max-w-3xl mx-auto mb-12">We offer diverse opportunities for collaboration across our value chain.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 rounded-lg shadow-md p-6 card text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#0FAFCA]/30 rounded-full text-[#0FAFCA]">
                {/* Technology Partners Icon */}
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A7.985 7.985 0 0112 2c2.21 0 4.21.895 5.657 2.343A8 8 0 0117.657 18.657z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.53 16.122a3 3 0 00-3.483 0l-1.261 1.26a3 3 0 000 4.243l6.364 6.364a3 3 0 004.242 0l1.26-1.26a3 3 0 000-4.243l-1.26-1.26a3 3 0 00-3.483 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#133B5C]">Technology Partners</h3>
            <p className="text-base text-[#133B5C] mt-2">Collaborate with our R&D team to integrate your cutting-edge technologies into our products.</p>
          </div>
          <div className="bg-white/80 rounded-lg shadow-md p-6 card text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#0FAFCA]/30 rounded-full text-[#0FAFCA]">
                {/* Distribution & Retail Icon */}
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#133B5C]">Distribution & Retail</h3>
            <p className="text-base text-[#133B5C] mt-2">Join our global network of distributors and retailers to bring ENTION laptops to customers worldwide.</p>
          </div>
          <div className="bg-white/80 rounded-lg shadow-md p-6 card text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#0FAFCA]/30 rounded-full text-[#0FAFCA]">
                {/* Strategic Alliances Icon */}
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#133B5C]">Strategic Alliances</h3>
            <p className="text-base text-[#133B5C] mt-2">We are open to forming strategic alliances that create synergistic value and drive market innovation.</p>
          </div>
        </div>
      </section>
      <div className="h-12" />
    </main>
  );
} 