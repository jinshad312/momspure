import React from "react";
import Image from "next/image";
import { Compass, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-bg-ivory min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="bg-secondary/20 border-b border-border-subtle/40 py-20 sm:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-ivory/0 to-bg-ivory/60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 animate-pulse">
            Our Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-primary font-semibold leading-tight">
            Crafting Food as Medicine
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-text max-w-lg mx-auto mt-4 leading-relaxed">
            Discover the story, mission, and uncompromised traditional food philosophies behind Momspure.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        
        {/* Story Section */}
        <section className="flex flex-col lg:flex-row gap-16 items-center mb-28">
          <div className="w-full lg:w-1/2 relative aspect-square bg-secondary/15 rounded-3xl overflow-hidden shadow-xl border border-border-subtle">
            <Image
              src="/assets/IMG_0061.webp"
              alt="Momspure Kitchen Origins"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover animate-fade-in"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.2em] font-bold block">
              How We Started
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary leading-tight">
              Born from a Mother&apos;s Core Devotion
            </h2>
            <p className="font-sans text-sm text-muted-text leading-relaxed">
              Momspure began not in a boardroom, but in a small family kitchen in South India. Our founder, faced with commercial grocery shelves packed with synthetic additives, maltodextrin, and chemical preservatives, decided to take nutrition back into her own hands.
            </p>
            <p className="font-sans text-sm text-muted-text leading-relaxed">
              She began sourcing unadulterated whole grains, sprouting finger millets on her terrace, slow dry-roasting them on charcoal, and hand-pounding aromatic spices. The visible transformation in her children&apos;s energy and digestive health soon caught the attention of neighbors.
            </p>
            <p className="font-sans text-sm text-muted-text leading-relaxed font-semibold text-primary">
              Today, Momspure remains true to those identical micro-batch recipes, expanding our family kitchen to nourish thousands of homes nationwide.
            </p>
          </div>
        </section>

        {/* Mission & Vision Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-28">
          
          {/* Mission */}
          <div className="bg-secondary/15 border border-border-subtle/40 p-10 rounded-3xl flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-accent-gold/25 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-accent-gold-dark" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="font-sans text-sm text-muted-text leading-relaxed">
                To simplify clean eating for modern families by providing unadulterated, sprouted superfoods and heritage food blends crafted with identical maternal care and processing wisdom as a home kitchen.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-primary/95 text-secondary border border-primary-light p-10 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/10 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="font-sans text-sm text-secondary/70 leading-relaxed">
                To build a world-class direct-to-consumer food brand that advocates nutritional honesty, empowers small organic marginal farmers, and revives traditional Indian processing techniques for generations to come.
              </p>
            </div>
          </div>

        </section>

        {/* Product Philosophies */}
        <section className="bg-secondary/10 border border-border-subtle/30 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.2em] font-bold block mb-3">
              Uncompromised Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-medium">
              Our Processing Philosophies
            </h2>
            <p className="font-sans text-xs text-muted-text mt-3">
              Every package of Momspure follows four non-negotiable stages of production.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Organic Sourcing",
                desc: "We buy raw materials directly from organic cooperatives and marginal farmers, ensuring pesticide-free purity."
              },
              {
                step: "02",
                title: "Traditional Sprouting",
                desc: "Grains are soaked and sprouted for 24-48 hours. This activates enzyme breakdown and multiplies active minerals."
              },
              {
                step: "03",
                title: "Slow Roasting",
                desc: "We gently dry-roast grains at controlled temperatures to lock in volatile oils and natural nutty flavor profile."
              },
              {
                step: "04",
                title: "Weekly Millings",
                desc: "No bulk warehouses. Products are ground in small weekly batches, packaged immediately, and dispatched fresh."
              }
            ].map((phil, idx) => (
              <div key={idx} className="space-y-4">
                <span className="font-serif text-4xl font-extrabold text-accent-gold/45 block">
                  {phil.step}
                </span>
                <h4 className="font-serif text-lg font-bold text-primary">
                  {phil.title}
                </h4>
                <p className="font-sans text-xs text-muted-text leading-relaxed">
                  {phil.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
