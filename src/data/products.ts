export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface NutritionInfo {
  servingSize: string;
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
  fiber: string;
  sodium?: string;
  iron?: string;
  calcium?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  video?: string;
  description: string;
  shortDescription: string;
  ingredients: string[];
  benefits: string[];
  nutrition: NutritionInfo;
  reviews: Review[];
  relatedIds: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "avulos-podi",
    name: "Momspure Avulos Podi",
    slug: "avulos-podi",
    category: "Podi & Powders",
    price: 249,
    rating: 4.9,
    reviewCount: 124,
    image: "/assets/IMG_0061.webp",
    gallery: [
      "/assets/IMG_0061.webp",
      "/assets/IMG_0061.webp",
      "/assets/IMG_0061.webp"
    ],
    video: "/assets/IMG_0059.webm",
    shortDescription: "A traditional, aromatic spice blend crafted with roasted rice flakes (avulos) and organic spices to elevate your daily meals.",
    description: "Our Momspure Avulos Podi is a culinary masterpiece handed down through generations. Made by gently roasting flattened rice flakes (avulos) with organic red chilies, cumin, curry leaves, and a touch of cold-pressed oil, this powder is ground to perfection. It offers a crunch, warmth, and savory depth that acts as a perfect side for idlis, dosas, steamed rice, or sprinkled over stir-fried organic vegetables.",
    ingredients: [
      "Roasted Rice Flakes (Avulos)",
      "Organic Split Black Gram (Urad Dal)",
      "Organic Bengal Gram (Chana Dal)",
      "Hand-selected Dry Red Chilies",
      "Fresh Farm Curry Leaves",
      "Asafoetida (Hing)",
      "Rock Salt",
      "Cold-Pressed Sesame Oil"
    ],
    benefits: [
      "100% natural, preservative-free, and chemical-free formulation",
      "Rich in iron and essential dietary fiber from whole grains",
      "Aids in quick digestion and maintains gut flora balance",
      "Provides a clean, low-calorie energy boost for active days",
      "Handmade in small batches under strict hygiene conditions"
    ],
    nutrition: {
      servingSize: "10g (1 tablespoon)",
      calories: "38 kcal",
      protein: "1.2g",
      carbohydrates: "6.8g",
      fat: "0.6g",
      fiber: "1.4g",
      sodium: "85mg",
      iron: "8% DV",
      calcium: "2% DV"
    },
    reviews: [
      {
        id: "rev-1",
        name: "Latha Ramaswamy",
        rating: 5,
        date: "2026-05-12",
        comment: "This podi tastes exactly like what my grandmother used to make. The crunch of the avulos makes it so unique. Absolutely love it!"
      },
      {
        id: "rev-2",
        name: "Karthik Raja",
        rating: 5,
        date: "2026-05-28",
        comment: "Excellent spice balance. It isn't overly spicy but packed with deep, roasted aroma. Tastes brilliant with hot rice and ghee."
      },
      {
        id: "rev-3",
        name: "Meera Nair",
        rating: 4,
        date: "2026-06-02",
        comment: "Really fresh packaging. It remains crispy even after opening for two weeks. Perfect staple in my kitchen."
      }
    ],
    relatedIds: ["family-nutri-mix", "organic-moringa-powder"],
    featured: true
  },
  {
    id: "family-nutri-mix",
    name: "Momspure Family Nutri Mix",
    slug: "family-nutri-mix",
    category: "Nutri Mixes",
    price: 399,
    rating: 4.8,
    reviewCount: 218,
    image: "/assets/IMG_0061.webp",
    gallery: [
      "/assets/IMG_0061.webp",
      "/assets/IMG_0061.webp"
    ],
    shortDescription: "A wholesome multi-grain health drink powder made of 18 natural sprouted grains, millets, and dry fruits for all age groups.",
    description: "Momspure Family Nutri Mix is an all-natural nutritional powerhouse. Formulated with sprouted millets, whole grains, nuts, and natural spices, this blend is slowly roasted and ground to preserve vitamins and minerals. Perfect as a breakfast porridge, this mix provides balanced proteins, carbohydrates, and healthy fats, making it a complete meal replacement for children and busy adults.",
    ingredients: [
      "Sprouted Ragi (Finger Millet)",
      "Sprouted Bajra (Pearl Millet)",
      "Sprouted Jowar (Sorghum)",
      "Brown Rice & Whole Wheat",
      "Roasted Almonds & Cashew Nuts",
      "Cardamom & Dry Ginger",
      "Sprouted Green Gram",
      "Sago & Groundnuts"
    ],
    benefits: [
      "18 handpicked sprouted grains and nuts for maximum nutrient absorption",
      "High bioavailability of minerals like Calcium, Iron, and Magnesium",
      "Provides sustained energy release without any artificial sugars",
      "Supports growth in children and immunity in senior family members",
      "Easy to prepare in under 5 minutes with water or warm milk"
    ],
    nutrition: {
      servingSize: "30g (3 tablespoons)",
      calories: "116 kcal",
      protein: "3.8g",
      carbohydrates: "22.4g",
      fat: "1.6g",
      fiber: "3.2g",
      sodium: "15mg",
      iron: "12% DV",
      calcium: "15% DV"
    },
    reviews: [
      {
        id: "rev-4",
        name: "Dr. Anjali Sen",
        rating: 5,
        date: "2026-04-18",
        comment: "I recommend this to all my patients looking for natural weight management and child growth. Zero chemicals, pure health."
      },
      {
        id: "rev-5",
        name: "Suresh Pillai",
        rating: 4,
        date: "2026-05-15",
        comment: "Our family breakfast is sorted now. It is incredibly filing and tastes amazing with milk and a drizzle of honey."
      }
    ],
    relatedIds: ["avulos-podi", "millet-health-mix"],
    featured: true
  },
  {
    id: "millet-health-mix",
    name: "Sprouted Millet Health Mix",
    slug: "millet-health-mix",
    category: "Nutri Mixes",
    price: 349,
    rating: 4.9,
    reviewCount: 96,
    image: "/assets/IMG_0061.webp",
    gallery: [
      "/assets/IMG_0061.webp"
    ],
    shortDescription: "A gluten-free, low-glycemic health drink powder featuring sprouted finger millet (ragi), kodo millet, and foxtail millet.",
    description: "Crafted specifically for health-conscious individuals and diabetics, our Sprouted Millet Health Mix features 100% gluten-free millets. Sprouting increases folate, iron, and fiber while reducing anti-nutrients like phytates. Spiced naturally with green cardamom, it helps maintain blood sugar levels and supports healthy cardiac health.",
    ingredients: [
      "Sprouted Finger Millet (Ragi)",
      "Sprouted Foxtail Millet",
      "Sprouted Kodo Millet",
      "Sprouted Little Millet",
      "Organic Green Cardamom",
      "Sprouted Bengal Gram"
    ],
    benefits: [
      "100% gluten-free and low-glycemic index rating",
      "Ideal for diabetics, weight watchers, and gluten-sensitive digestion",
      "Enhanced levels of active enzymes due to sprouting process",
      "Packed with antioxidants that clean and cleanse your body",
      "Zero added colors, thickeners, or artificial preservatives"
    ],
    nutrition: {
      servingSize: "30g",
      calories: "108 kcal",
      protein: "3.4g",
      carbohydrates: "21.1g",
      fat: "1.1g",
      fiber: "4.1g",
      sodium: "10mg",
      iron: "10% DV",
      calcium: "18% DV"
    },
    reviews: [
      {
        id: "rev-6",
        name: "Rajesh Bhatia",
        rating: 5,
        date: "2026-05-10",
        comment: "Excellent alternative to processed oats. The diabetic-friendly composition has helped me keep my sugars in target."
      }
    ],
    relatedIds: ["family-nutri-mix", "organic-moringa-powder"]
  },
  {
    id: "organic-moringa-powder",
    name: "Organic Moringa Powder",
    slug: "organic-moringa-powder",
    category: "Podi & Powders",
    price: 199,
    rating: 4.7,
    reviewCount: 88,
    image: "/assets/IMG_0061.webp",
    gallery: [
      "/assets/IMG_0061.webp"
    ],
    shortDescription: "Pure shadow-dried organic moringa oleifera leaf powder, loaded with immune-boosting vitamins and amino acids.",
    description: "Obtained from fresh, organic moringa leaves harvested at dawn. The leaves are shade-dried at low temperatures to lock in their emerald color and intense nutritional profile, then ground to a silky-smooth micro-powder. Rich in Vitamin C, Iron, Vitamin A, and all essential amino acids, this is nature’s ultimate multivitamin.",
    ingredients: [
      "100% Organic Moringa Oleifera Leaves"
    ],
    benefits: [
      "Premium single-ingredient green superfood supplement",
      "Powerful anti-inflammatory and natural detoxifying agent",
      "Boosts immunity, skin radiance, and hair strength",
      "Helps regulate blood pressure and lipid profiles",
      "Mixes smoothly into morning smoothies, green teas, or curd"
    ],
    nutrition: {
      servingSize: "5g (1 teaspoon)",
      calories: "15 kcal",
      protein: "1.3g",
      carbohydrates: "1.9g",
      fat: "0.2g",
      fiber: "1.1g",
      sodium: "4mg",
      iron: "15% DV",
      calcium: "8% DV"
    },
    reviews: [
      {
        id: "rev-7",
        name: "Sarah Mathew",
        rating: 5,
        date: "2026-05-19",
        comment: "Extremely fine powder. You can tell it is genuine by the vibrant green color and fresh grassy aroma. Great quality!"
      }
    ],
    relatedIds: ["avulos-podi", "millet-health-mix"]
  },
  {
    id: "wood-pressed-coconut-oil",
    name: "Premium Wood Pressed Coconut Oil",
    slug: "wood-pressed-coconut-oil",
    category: "Cold Pressed Oils",
    price: 320,
    rating: 4.9,
    reviewCount: 154,
    image: "/assets/IMG_0061.webp",
    gallery: [
      "/assets/IMG_0061.webp"
    ],
    shortDescription: "Raw, pure, unrefined oil extracted from premium sun-dried copras using traditional wood presses (marachekku).",
    description: "Our wood-pressed coconut oil is processed at low temperatures without any solvents or high heat, preserving natural nutrients and fresh coconut aroma. It is rich in Lauric Acid and Medium Chain Triglycerides (MCTs), making it an excellent medium for organic cooking, hair care, and skin hydration.",
    ingredients: [
      "100% Pure Coconut Copras"
    ],
    benefits: [
      "Cold-extracted in traditional wooden ghani to retain natural antioxidants",
      "High smoke point, perfect for sautéing and roasting organic food",
      "Rich in Lauric Acid (found in mother's milk) which boosts immunity",
      "Chemical-free, bleaching-free, and paraffin-free purity",
      "Lightweight hydration for dry skin and damaged hair follicles"
    ],
    nutrition: {
      servingSize: "14g (1 tablespoon)",
      calories: "120 kcal",
      protein: "0g",
      carbohydrates: "0g",
      fat: "14g",
      fiber: "0g",
      sodium: "0mg"
    },
    reviews: [
      {
        id: "rev-8",
        name: "Venkatesh S.",
        rating: 5,
        date: "2026-06-01",
        comment: "The aroma of this coconut oil is so soothing. I use it for cooking as well as applying it to my hair. Brilliant product."
      }
    ],
    relatedIds: ["avulos-podi", "family-nutri-mix"],
    featured: true
  }
];
