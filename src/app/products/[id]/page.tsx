"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Plus, Minus, ShoppingCart, ChevronDown, Sparkles, MessageCircle, Play } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/components/CartContext";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  // Unwrap Next.js 15 params promise
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const [prevProductId, setPrevProductId] = useState(product.id);
  const [activeImage, setActiveImage] = useState(product.image);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (product.id !== prevProductId) {
    setPrevProductId(product.id);
    setActiveImage(product.image);
    setIsPlayingVideo(false);
    setQuantity(1);
  }
  
  // Accordion open states
  const [openSection, setOpenSection] = useState<string | null>("ingredients");

  // Show Toast state
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Find related products
  const relatedProducts = products.filter((p) => product.relatedIds.includes(p.id));

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full bg-bg-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs uppercase tracking-widest text-muted-text mb-8">
          <Link href="/" className="hover:text-accent-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-accent-gold transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal font-semibold">{product.name}</span>
        </nav>

        {/* Main Product Info section */}
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          
          {/* Column 1: Image/Video Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            
            {/* Display Box */}
            <div className="relative aspect-square bg-secondary/20 rounded-3xl overflow-hidden border border-border-subtle shadow-md">
              {isPlayingVideo && product.video ? (
                <video
                  src={product.video}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              )}

              {/* Video play overlay trigger */}
              {!isPlayingVideo && product.video && (
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute bottom-6 right-6 bg-primary/95 text-secondary border border-accent-gold/30 p-4 rounded-full shadow-lg hover:bg-accent-gold hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span className="font-sans text-xs uppercase tracking-widest font-bold pr-1">Play Video</span>
                </button>
              )}
            </div>

            {/* Thumbnails grid */}
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveImage(img);
                    setIsPlayingVideo(false);
                  }}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 bg-secondary/10 shrink-0 ${
                    !isPlayingVideo && activeImage === img ? "border-accent-gold scale-95 shadow-md" : "border-transparent"
                  } hover:border-accent-gold/50 transition-all duration-200`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} gallery image ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}

              {product.video && (
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className={`relative w-20 h-20 rounded-xl bg-primary/90 flex flex-col items-center justify-center border-2 shrink-0 ${
                    isPlayingVideo ? "border-accent-gold scale-95" : "border-transparent"
                  } hover:border-accent-gold/50 transition-all duration-200`}
                >
                  <Play className="w-5 h-5 text-accent-gold" />
                  <span className="font-sans text-[8px] uppercase tracking-widest text-secondary mt-1 font-bold">Video</span>
                </button>
              )}
            </div>

          </div>

          {/* Column 2: Details & Purchases */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-accent-gold font-bold block mb-2">
                Momspure Kitchen
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Review summary info */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent-gold text-accent-gold"
                          : "text-border-subtle"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-sans text-xs font-semibold text-charcoal">{product.rating}</span>
                <span className="font-sans text-xs text-muted-text">({product.reviewCount} customers reviews)</span>
              </div>

              {/* Price */}
              <div className="font-sans text-3xl font-extrabold text-primary mb-6">
                ₹{product.price}
              </div>

              {/* Description */}
              <p className="font-sans text-sm sm:text-base text-muted-text leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Shopping Interaction */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                {/* Quantity */}
                <div className="flex items-center border border-primary/20 rounded-full bg-secondary/15 px-3 py-1">
                  <button
                    onClick={decrementQty}
                    className="p-2 text-primary hover:text-accent-gold transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-sans font-bold text-primary text-sm px-6 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    className="p-2 text-primary hover:text-accent-gold transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to basket */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 w-full bg-primary hover:bg-primary-light text-secondary font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-full border border-primary-light/10 shadow-lg flex items-center justify-center space-x-3 transition-colors active:scale-95 transform duration-150"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add ₹{product.price * quantity} to Cart</span>
                </button>
              </div>

              {/* Product Specifications Accordions */}
              <div className="border-t border-border-subtle/50 space-y-1">
                {[
                  {
                    id: "ingredients",
                    title: "Ingredients List",
                    content: (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {product.ingredients.map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-xs text-charcoal/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                            <span className="font-sans">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  },
                  {
                    id: "benefits",
                    title: "Health Benefits",
                    content: (
                      <ul className="space-y-2.5">
                        {product.benefits.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-xs text-charcoal/80 leading-relaxed">
                            <Sparkles className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                            <span className="font-sans">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  },
                  {
                    id: "nutrition",
                    title: "Nutritional Information",
                    content: (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs font-sans text-charcoal/80">
                          <thead>
                            <tr className="border-b border-border-subtle pb-2">
                              <th className="text-left font-semibold py-1.5 uppercase text-accent-gold-dark">Component</th>
                              <th className="text-right font-semibold py-1.5 uppercase text-accent-gold-dark">Amount per Serving ({product.nutrition.servingSize})</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border-subtle/30">
                            <tr>
                              <td className="py-2">Calories</td>
                              <td className="text-right py-2 font-semibold">{product.nutrition.calories}</td>
                            </tr>
                            <tr>
                              <td className="py-2">Protein</td>
                              <td className="text-right py-2 font-semibold">{product.nutrition.protein}</td>
                            </tr>
                            <tr>
                              <td className="py-2">Carbohydrates</td>
                              <td className="text-right py-2 font-semibold">{product.nutrition.carbohydrates}</td>
                            </tr>
                            <tr>
                              <td className="py-2">Fat</td>
                              <td className="text-right py-2 font-semibold">{product.nutrition.fat}</td>
                            </tr>
                            <tr>
                              <td className="py-2">Dietary Fiber</td>
                              <td className="text-right py-2 font-semibold">{product.nutrition.fiber}</td>
                            </tr>
                            {product.nutrition.sodium && (
                              <tr>
                                <td className="py-2">Sodium</td>
                                <td className="text-right py-2 font-semibold">{product.nutrition.sodium}</td>
                              </tr>
                            )}
                            {product.nutrition.iron && (
                              <tr>
                                <td className="py-2">Iron</td>
                                <td className="text-right py-2 font-semibold">{product.nutrition.iron}</td>
                              </tr>
                            )}
                            {product.nutrition.calcium && (
                              <tr>
                                <td className="py-2">Calcium</td>
                                <td className="text-right py-2 font-semibold">{product.nutrition.calcium}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                ].map((sec) => {
                  const isOpen = openSection === sec.id;
                  return (
                    <div key={sec.id} className="border-b border-border-subtle/40">
                      <button
                        onClick={() => toggleSection(sec.id)}
                        className="w-full flex items-center justify-between py-4 text-left font-serif text-sm uppercase tracking-wider font-bold text-primary hover:text-accent-gold-dark transition-colors"
                      >
                        <span>{sec.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-accent-gold transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isOpen ? "max-h-[500px] pb-6" : "max-h-0"
                        }`}
                      >
                        {sec.content}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="border-t border-border-subtle/50 pt-16 mb-24">
          <div className="flex items-center space-x-3 mb-10">
            <MessageCircle className="w-6 h-6 text-accent-gold" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
              Customer Feedbacks ({product.reviews.length})
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-secondary/10 border border-border-subtle/30 p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-serif font-bold text-primary text-base">{rev.name}</h4>
                    <span className="font-sans text-[10px] text-muted-text">{rev.date}</span>
                  </div>
                  <div className="flex space-x-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
                    ))}
                  </div>
                </div>
                <p className="font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-border-subtle/50 pt-16">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-10">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Added Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-24 left-1/2 z-50 bg-primary border border-accent-gold/30 text-secondary px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-4 max-w-sm w-[90%]"
          >
            <div className="bg-accent-gold/25 p-2 rounded-lg text-accent-gold">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm font-semibold truncate">{product.name}</p>
              <p className="font-sans text-[11px] text-secondary/60">Added {quantity} items to your basket</p>
            </div>
            <Link
              href="/cart"
              className="font-sans text-xs uppercase tracking-widest font-bold text-accent-gold hover:text-white transition-colors"
            >
              View
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product JSON-LD structured schema data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": [product.image],
            "description": product.shortDescription,
            "sku": product.id,
            "offers": {
              "@type": "Offer",
              "url": `https://momspure.com/products/${product.id}`,
              "priceCurrency": "INR",
              "price": product.price,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewCount
            }
          })
        }}
      />
    </div>
  );
}
