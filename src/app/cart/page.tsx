"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, Clipboard } from "lucide-react";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, deliveryNotes, setDeliveryNotes } = useCart();

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="w-full bg-bg-ivory min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-4xl font-bold text-primary mb-12">
          Your Shopping Basket
        </h1>

        {isCartEmpty ? (
          <div className="text-center py-24 bg-secondary/10 border border-border-subtle rounded-3xl max-w-2xl mx-auto">
            <p className="font-serif text-2xl text-primary font-medium mb-3">
              Your Basket is Empty
            </p>
            <p className="font-sans text-sm text-muted-text max-w-sm mx-auto mb-8">
              Looks like you haven&apos;t added any of our delicious organic mixtures or podis yet.
            </p>
            <Link
              href="/products"
              className="bg-primary hover:bg-primary-light text-secondary font-sans text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full shadow-lg transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3 space-y-6">
              <div className="border border-border-subtle/50 rounded-2xl overflow-hidden bg-bg-ivory shadow-sm">
                <div className="divide-y divide-border-subtle/30">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-6 flex flex-col sm:flex-row items-center gap-6"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-secondary/20 shrink-0 border border-border-subtle/30">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row justify-between w-full">
                        <div>
                          <span className="font-sans text-[10px] uppercase tracking-widest text-accent-gold font-bold block mb-1">
                            {item.product.category}
                          </span>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-serif text-lg font-bold text-primary hover:text-accent-gold-dark transition-colors block mb-1 truncate"
                          >
                            {item.product.name}
                          </Link>
                          <p className="font-sans text-xs text-muted-text mb-4 sm:mb-0">
                            ₹{item.product.price} each
                          </p>
                        </div>

                        <div className="flex items-center space-x-6 justify-between sm:justify-end">
                          {/* Qty count selector */}
                          <div className="flex items-center border border-primary/15 rounded-full bg-secondary/5 px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 text-primary hover:text-accent-gold transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-sans font-bold text-primary text-xs px-3 min-w-[1.5rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 text-primary hover:text-accent-gold transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <span className="font-sans font-bold text-primary min-w-[4rem] text-right">
                            ₹{item.product.price * item.quantity}
                          </span>

                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-muted-text hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="border border-border-subtle/50 rounded-2xl p-6 bg-bg-ivory shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <Clipboard className="w-4 h-4 text-accent-gold" />
                  <h3 className="font-serif text-base font-bold">Delivery Instructions</h3>
                </div>
                <textarea
                  placeholder="E.g., Please deliver in the evening, call before arrival, or pack in plastic-free wraps..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-secondary/10 border border-primary/10 rounded-xl p-4 font-sans text-xs focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text leading-relaxed"
                />
              </div>

              {/* Continue Shopping Link */}
              <Link
                href="/products"
                className="inline-flex items-center space-x-2 text-primary hover:text-accent-gold font-sans text-xs uppercase tracking-widest font-bold transition-colors mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Cart Summary Card */}
            <div className="w-full lg:w-1/3">
              <div className="border border-border-subtle/50 rounded-2xl p-8 bg-secondary/10 shadow-sm sticky top-28">
                <h3 className="font-serif text-xl font-bold text-primary mb-6 border-b border-border-subtle/50 pb-4">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-xs font-sans text-muted-text">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans text-muted-text">
                    <span>Shipping Charges</span>
                    <span className="font-semibold text-charcoal">FREE</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans text-muted-text">
                    <span>Packaging & Taxes</span>
                    <span className="font-semibold text-charcoal">₹0.00</span>
                  </div>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-primary border-t border-border-subtle/50 pt-6 mb-8">
                  <span>Grand Total</span>
                  <span>₹{cartTotal}</span>
                </div>

                {/* Checkout Link */}
                <Link
                  href="/checkout"
                  className="w-full bg-primary hover:bg-primary-light text-secondary font-sans text-xs uppercase tracking-widest font-bold py-4 px-6 rounded-full border border-primary-light/10 shadow-lg flex items-center justify-center space-x-2 transition-colors active:scale-95 transform duration-150"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="font-sans text-[10px] text-muted-text leading-relaxed text-center mt-4">
                  Note: Payout processing will happen via WhatsApp messaging on the next page.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
