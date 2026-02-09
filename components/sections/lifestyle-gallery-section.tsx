'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function LifestyleGallerySection() {
  const { ref: sectionRef, isVisible } = useScrollReveal()

  const images = [
    { src: '/images/m1.jpg', caption: 'Morning Rituals' },
    { src: '/images/m2.jpg', caption: 'Quiet Moments' },
    { src: '/images/m3.jpg', caption: 'Workspace Serenity' },
    { src: '/images/m4.jpg', caption: 'Living with Nature' }
  ]

  return (
    <section id="lifestyle" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p 
            className={`text-[#737373] text-sm uppercase tracking-widest mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            The Elora Lifestyle
          </p>
          <h2 
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-6 transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Moments of Calm
          </h2>
          <p 
            className={`text-[#737373] text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Discover how our community embraces slow living, mindful design, and everyday elegance
          </p>
        </div>

        {/* Gallery Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Content Block */}
          <div 
            className={`lg:w-1/3 bg-[#1A1A1A] text-white p-12 flex flex-col justify-center transition-all duration-1000 bg-amber-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="font-display text-3xl mb-6 lg:text-8xl">
              Your Daily Rituals
            </h3>
            <p className="text-white/80 text-base leading-relaxed mb-8">
              We believe in the beauty of intentional living. Each moment, each product, each space—crafted to bring you peace and joy.
            </p>
            <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 self-start">
              Explore More
            </button>
          </div>

          {/* Images Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`relative overflow-hidden bg-white group transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${(index + 1) * 150}ms`,
                  aspectRatio: '3/4'
                }}
              >
                <img 
                  src={image.src || "/placeholder.svg"}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#737373] mb-6">Share your Elora moments with us</p>
          <button className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300">
            #EloraLifestyle
          </button>
        </div>
      </div>
    </section>
  )
}
