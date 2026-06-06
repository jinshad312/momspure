"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Categories extracted from data + "All"
  const categories = ["All", "Podi & Powders", "Nutri Mixes", "Cold Pressed Oils"];

  const [searchQuery, setSearchQuery] = useState("");

  const categoryParam = searchParams.get("category");
  const selectedCategory = (categoryParam && categories.includes(categoryParam)) ? categoryParam : "All";

  // Compute filtered products directly during render
  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    const searchMatch = searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleCategorySelect = (category: string) => {
    // Update URL search parameters
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search and Category Control Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 border-b border-border-subtle/50 pb-8">
        
        {/* Category Scroll bar */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 scrollbar-none">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`font-sans text-xs uppercase tracking-wider font-semibold py-2.5 px-6 rounded-full border whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? "bg-primary border-primary text-secondary"
                    : "border-primary/15 bg-transparent hover:border-accent-gold text-primary hover:text-accent-gold-dark"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Live Search bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search our kitchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/15 border border-primary/10 rounded-full py-3 pl-12 pr-6 font-sans text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 text-charcoal placeholder-muted-text"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
        </div>
      </div>

      {/* Product Grid Layout */}
      <AnimatePresence mode="popLayout">
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-border-subtle"
          >
            <p className="font-serif text-2xl text-primary font-medium mb-3">
              No Kitchen Items Found
            </p>
            <p className="font-sans text-sm text-muted-text max-w-sm mx-auto mb-6">
              We couldn&apos;t find any products matching &ldquo;{searchQuery}&rdquo; in our {selectedCategory !== "All" ? selectedCategory : "catalog"}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategorySelect("All");
              }}
              className="bg-primary hover:bg-primary-light text-secondary font-sans text-xs uppercase tracking-widest font-bold py-3 px-6 rounded-full transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="w-full bg-bg-ivory min-h-screen">
      {/* Banner Area */}
      <div className="bg-secondary/20 border-b border-border-subtle/40 py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-ivory/0 to-bg-ivory/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-3 animate-pulse">
            Naturally Curated
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-semibold leading-tight">
            Our Organic Kitchen Range
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-text max-w-lg mx-auto mt-4 leading-relaxed">
            Freshly prepared in batch productions. Browse our range of Sprouted Porridge powders, Spice Podis, and unrefined coconut oils.
          </p>
        </div>
      </div>

      {/* Catalogue content with Suspense to resolve searchParams */}
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <span className="font-serif text-xl font-medium text-primary animate-pulse">
              Preparing organic collection...
            </span>
          </div>
        }
      >
        <CatalogContent />
      </Suspense>
    </div>
  );
}
