"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye, ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    triggerToast();
  };

  const handleQuickViewAddToCart = () => {
    addToCart(product, quantity);
    setIsQuickViewOpen(false);
    triggerToast();
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <>
      <div className="group relative flex flex-col bg-bg-ivory border border-border-subtle/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-accent-gold/30 transition-all duration-300">
        {/* Product Image Area */}
        <Link href={`/products/${product.id}`} className="relative block aspect-square bg-secondary/30 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={product.featured}
          />
          {/* Accent border overlay */}
          <div className="absolute inset-0 border border-transparent group-hover:border-accent-gold/20 transition-all duration-300 rounded-t-2xl pointer-events-none" />

          {/* Quick Actions Hover Overlay */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
              className="p-3 bg-bg-ivory text-primary rounded-full shadow-lg hover:bg-accent-gold hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95"
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-3 bg-primary text-secondary rounded-full shadow-lg hover:bg-accent-gold hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95"
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Category Badge */}
          <span className="absolute top-4 left-4 bg-primary/95 text-secondary font-sans text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary-light">
            {product.category}
          </span>
        </Link>

        {/* Info Area */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
            <span className="font-sans text-xs font-semibold text-charcoal">{product.rating}</span>
            <span className="font-sans text-xs text-muted-text">({product.reviewCount})</span>
          </div>

          {/* Name & Short Description */}
          <Link href={`/products/${product.id}`} className="block mb-2 group-hover:text-accent-gold-dark transition-colors">
            <h3 className="font-serif text-xl font-semibold leading-snug text-primary">
              {product.name}
            </h3>
          </Link>
          <p className="font-sans text-xs text-muted-text leading-relaxed mb-6 flex-grow">
            {product.shortDescription}
          </p>

          {/* Price & Add Action */}
          <div className="flex items-center justify-between border-t border-border-subtle/50 pt-4 mt-auto">
            <span className="font-sans text-lg font-bold text-primary">
              ₹{product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 border border-primary/20 hover:border-accent-gold bg-transparent hover:bg-primary hover:text-secondary font-sans text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-full transition-all duration-300"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Added Toast Confirmation */}
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
              <p className="font-sans text-[11px] text-secondary/60">Added to your shopping basket</p>
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

      {/* Quick View Modal */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-bg-ivory border border-border-subtle max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl z-10 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-primary/10 hover:bg-primary/20 text-primary hover:text-accent-gold-dark rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Gallery Section */}
              <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto md:h-auto bg-secondary/20 min-h-[300px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-primary text-secondary font-sans text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary-light">
                  {product.category}
                </span>
              </div>

              {/* Product Detail Section */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-accent-gold font-bold block mb-2">
                    Momspure Kitchen
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-primary mb-3 leading-tight">
                    {product.name}
                  </h2>
                  <div className="flex items-center space-x-1.5 mb-6">
                    <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
                    <span className="font-sans text-sm font-semibold text-charcoal">{product.rating}</span>
                    <span className="font-sans text-xs text-muted-text">({product.reviewCount} verified reviews)</span>
                  </div>

                  <p className="font-sans text-sm text-muted-text leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 border-y border-border-subtle/40 py-4">
                    <div>
                      <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-accent-gold-dark mb-1">
                        Ingredients
                      </h4>
                      <p className="font-sans text-xs text-charcoal/80 leading-relaxed truncate">
                        {product.ingredients.slice(0, 3).join(", ")}...
                      </p>
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-accent-gold-dark mb-1">
                        Nutrition
                      </h4>
                      <p className="font-sans text-xs text-charcoal/80 leading-relaxed">
                        {product.nutrition.calories} / {product.nutrition.servingSize}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-primary/20 rounded-full bg-secondary/10 px-2">
                    <button
                      onClick={decrementQty}
                      className="p-2 text-primary hover:text-accent-gold transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-sans font-bold text-primary text-sm px-4 min-w-[2rem] text-center">
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

                  {/* Buy / Add button */}
                  <button
                    onClick={handleQuickViewAddToCart}
                    className="flex-1 w-full bg-primary hover:bg-primary-light text-secondary font-sans text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-full border border-primary-light/10 shadow-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add ₹{product.price * quantity} to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
