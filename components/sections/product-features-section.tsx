'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function ProductFeaturesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal()
  const imageRef = null // Declare imageRef variable
  const offset = 0 // Declare offset variable

  const features = [
    {
      title: 'Natural Ingredients',
      description: 'Every product is crafted with carefully sourced botanical extracts and organic compounds. We believe in the power of nature to nourish and restore.',
      image: '/images/natural-20ingredients.png'
    },
    {
      title: 'Sustainable Crafted',
      description: 'From recyclable packaging to carbon-neutral shipping, sustainability is woven into every decision we make. Beauty that respects our planet.',
      image: '/images/sustainable-20crafted.png'
    },
    {
      title: 'Dermatologist Tested',
      description: 'All formulations undergo rigorous testing to ensure they are gentle, effective, and suitable for even the most sensitive skin types.',
      image: '/images/dermato.png'
    }
  ]

  return (
    <section id="features" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Why Choose Elira
          </h2>
          <p 
            className={`text-[#737373] text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            A commitment to excellence, from ingredient to impact
          </p>
        </div>

        {/* Features */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Text - Left on even, right on odd */}
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <h3 className="font-display text-3xl md:text-4xl mb-6">
                  {feature.title}
                </h3>
                <p className="text-[#737373] text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Image - Right on even, left on odd */}
              <div 
                className={`aspect-[3/2] relative overflow-hidden bg-[#F5F5F5] ${index % 2 === 1 ? 'md:order-1' : ''}`}
              >
                <img 
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
