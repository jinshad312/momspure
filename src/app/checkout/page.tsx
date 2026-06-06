"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShoppingBag, ArrowLeft, Send } from "lucide-react";
import { useCart } from "@/components/CartContext";

// Define Form schema with Zod
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(10, "Please enter your full address (at least 10 characters)"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  orderNotes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, deliveryNotes, clearCart } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      orderNotes: "",
    }
  });

  // Pre-fill order notes with delivery notes from the cart context
  useEffect(() => {
    if (deliveryNotes) {
      setValue("orderNotes", deliveryNotes);
    }
  }, [deliveryNotes, setValue]);

  // Redirect to cart if it is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  const onSubmit = (data: CheckoutFormValues) => {
    // Construct the WhatsApp message body
    const customerInfo = `Customer:\n${data.fullName}\n\nPhone:\n${data.mobileNumber}\n\nEmail:\n${data.email}\n\nAddress:\n${data.address}, ${data.city}, ${data.state} - ${data.pincode}`;
    
    const productsList = cartItems
      .map((item) => `${item.quantity} x ${item.product.name} (₹${item.product.price} each)`)
      .join("\n");
      
    const notesPart = data.orderNotes?.trim() 
      ? `\nNotes:\n${data.orderNotes}\n` 
      : "";

    const message = `Hello Momspure,\n\nI would like to place an order.\n\n${customerInfo}\n\nProducts:\n${productsList}\n\nTotal Items:\n${cartCount}\n\nGrand Total:\n₹${cartTotal}\n${notesPart}\nThank you.`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp API URL (target phone number is +919876543210)
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Clear local cart storage
    clearCart();

    // Redirect to homepage or confirmation screen
    router.push("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <span className="font-serif text-xl font-medium text-primary">Redirecting to shopping basket...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-bg-ivory min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center space-x-3 mb-12">
          <Link href="/cart" className="p-2 bg-secondary/15 hover:bg-secondary/30 rounded-full text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-4xl font-bold text-primary">
            Billing & Delivery Details
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Billing Form Column */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="bg-bg-ivory border border-border-subtle/50 rounded-3xl p-8 shadow-sm space-y-6">
                
                {/* Row 1: Full name */}
                <div>
                  <label htmlFor="fullName" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your first and last name"
                    {...register("fullName")}
                    className={`w-full bg-secondary/10 border ${
                      errors.fullName ? "border-red-500" : "border-primary/10"
                    } rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text`}
                  />
                  {errors.fullName && (
                    <p className="font-sans text-[11px] text-red-500 mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Row 2: Mobile & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="mobileNumber" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      placeholder="10-digit mobile number (e.g. 9876543210)"
                      {...register("mobileNumber")}
                      className={`w-full bg-secondary/10 border ${
                        errors.mobileNumber ? "border-red-500" : "border-primary/10"
                      } rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text`}
                    />
                    {errors.mobileNumber && (
                      <p className="font-sans text-[11px] text-red-500 mt-1">{errors.mobileNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="E.g. jone.doe@gmail.com"
                      {...register("email")}
                      className={`w-full bg-secondary/10 border ${
                        errors.email ? "border-red-500" : "border-primary/10"
                      } rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text`}
                    />
                    {errors.email && (
                      <p className="font-sans text-[11px] text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Full Address */}
                <div>
                  <label htmlFor="address" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    placeholder="Enter your flat/house no, building name, street address, area name"
                    rows={3}
                    {...register("address")}
                    className={`w-full bg-secondary/10 border ${
                      errors.address ? "border-red-500" : "border-primary/10"
                    } rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text leading-relaxed`}
                  />
                  {errors.address && (
                    <p className="font-sans text-[11px] text-red-500 mt-1">{errors.address.message}</p>
                  )}
                </div>

                {/* Row 4: City, State, Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="E.g. Bengaluru"
                      {...register("city")}
                      className={`w-full bg-secondary/10 border ${
                        errors.city ? "border-red-500" : "border-primary/10"
                      } rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text`}
                    />
                    {errors.city && (
                      <p className="font-sans text-[11px] text-red-500 mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      placeholder="E.g. Karnataka"
                      {...register("state")}
                      className={`w-full bg-secondary/10 border ${
                        errors.state ? "border-red-500" : "border-primary/10"
                      } rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text`}
                    />
                    {errors.state && (
                      <p className="font-sans text-[11px] text-red-500 mt-1">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      placeholder="6-digit PIN code"
                      maxLength={6}
                      {...register("pincode")}
                      className={`w-full bg-secondary/10 border ${
                        errors.pincode ? "border-red-500" : "border-primary/10"
                      } rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text`}
                    />
                    {errors.pincode && (
                      <p className="font-sans text-[11px] text-red-500 mt-1">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>

                {/* Row 5: Editable Order Notes */}
                <div>
                  <label htmlFor="orderNotes" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                    Special Notes
                  </label>
                  <textarea
                    id="orderNotes"
                    placeholder="E.g. specific dropoff instructions, packing instructions etc."
                    rows={3}
                    {...register("orderNotes")}
                    className="w-full bg-secondary/10 border border-primary/10 rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text leading-relaxed"
                  />
                </div>

              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-6 rounded-full border border-emerald-500/20 shadow-xl flex items-center justify-center space-x-3 transition-colors active:scale-95 transform duration-150 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Submit & Checkout on WhatsApp</span>
              </button>

            </form>
          </div>

          {/* Cart Summary Column */}
          <div className="w-full lg:w-1/3">
            <div className="border border-border-subtle/50 rounded-2xl p-8 bg-secondary/10 shadow-sm sticky top-28">
              <div className="flex items-center space-x-2 mb-6 border-b border-border-subtle/50 pb-4">
                <ShoppingBag className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-xl font-bold text-primary">
                  Order Items
                </h3>
              </div>

              {/* Items Summary list */}
              <div className="divide-y divide-border-subtle/30 max-h-[300px] overflow-y-auto pr-2 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-4 flex justify-between gap-4 text-xs font-sans">
                    <span className="text-charcoal font-medium">
                      {item.product.name} <span className="text-muted-text">x {item.quantity}</span>
                    </span>
                    <span className="font-bold text-primary shrink-0">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Summary */}
              <div className="space-y-4 mb-6 border-t border-border-subtle/50 pt-6">
                <div className="flex justify-between text-xs font-sans text-muted-text">
                  <span>Total Items</span>
                  <span className="font-semibold text-charcoal">{cartCount} items</span>
                </div>
                <div className="flex justify-between text-xs font-sans text-muted-text">
                  <span>Shipping Charges</span>
                  <span className="font-semibold text-charcoal">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-serif font-bold text-primary border-t border-border-subtle/50 pt-6">
                <span>Grand Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
