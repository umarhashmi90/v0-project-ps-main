// src/lib/products.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  aiHint: string;
  href: string;
  category: 'PC' | 'iOS' | 'Android';
};

export const pcProducts: Product[] = [
  {
    id: 2,
    name: "Vnhax Frozen Key",
    price: 5,
    imageUrl: "https://i.postimg.cc/j5QRy4fy/Vnhax-frozen-key.jpg",
    aiHint: "abstract green",
    href: "/products/vnhax-frozen-key",
    category: "PC",
  },
  {
    id: 4,
    name: "Vnhax Week Key",
    price: 15,
    imageUrl: "https://i.postimg.cc/26Mvsmyz/Vnhax-week-key.jpg",
    aiHint: "abstract purple",
    href: "/products/vnhax-week-key",
    category: "PC",
  },
  {
    id: 1,
    name: "Vnhax Month Key",
    price: 30,
    imageUrl: "https://i.postimg.cc/cJ1bH7mv/Vnhax-month-key.jpg",
    aiHint: "abstract blue",
    href: "/products/vnhax-month-key",
    category: "PC",
  },
  {
    id: 5,
    name: "Vnhax Admin Key",
    price: 190,
    imageUrl: "https://i.postimg.cc/QdYpQpD9/Vnhax-Admin-key.jpg",
    aiHint: "abstract gold",
    href: "/products/vnhax-admin-key",
    category: "PC",
  },
  {
    id: 6,
    name: "Redeye Frozen Key",
    price: 5,
    imageUrl: "https://i.postimg.cc/JhTnsWfj/Redeye-frozen-key.jpg",
    aiHint: "abstract dark red",
    href: "/products/redeye-frozen-key",
    category: "PC",
  },
  {
    id: 7,
    name: "Redeye Week Key",
    price: 15,
    imageUrl: "https://i.postimg.cc/rwVMxPCj/Redeye-week-key.jpg",
    aiHint: "abstract fire",
    href: "/products/redeye-week-key",
    category: "PC",
  },
  {
    id: 8,
    name: "Redeye Month Key",
    price: 30,
    imageUrl: "https://i.postimg.cc/8PDSg03G/Redeye-month-key.jpg",
    aiHint: "abstract red",
    href: "/products/redeye-month-key",
    category: "PC",
  },
  {
    id: 9,
    name: "Anubis Week Key",
    price: 20,
    imageUrl: "https://i.postimg.cc/3N60d0qM/Anubis-week-key.jpg",
    aiHint: "abstract sand",
    href: "/products/anubis-week-key",
    category: "PC",
  },
  {
    id: 10,
    name: "Anubis Month Key",
    price: 40,
    imageUrl: "https://i.postimg.cc/Gh8s6zBb/Anubis-month-key.jpg",
    aiHint: "abstract gold",
    href: "/products/anubis-month-key",
    category: "PC",
  },
];

export const iosProducts: Product[] = [
  {
    id: 14,
    name: "Vnhax iOS Frozen Key",
    price: 5,
    imageUrl: "https://i.postimg.cc/k4WLbYWy/vn-ios-frozen-key.jpg",
    aiHint: "gaming character cinematic",
    href: "/products/vnhax-ios-frozen-key",
    category: "iOS",
  },
  {
    id: 15,
    name: "Vnhax iOS Month Key",
    price: 30,
    imageUrl: "https://i.postimg.cc/yYGYCzMG/vn-ios-month-key.jpg",
    aiHint: "gaming character cinematic",
    href: "/products/vnhax-ios-month-key",
    category: "iOS",
  },
  {
    id: 18,
    name: "Star iOS Frozen Key",
    price: 5,
    imageUrl: "https://i.postimg.cc/SxKT8Bjm/star-ios-frozen-key.jpg",
    aiHint: "gaming character cinematic",
    href: "/products/star-ios-frozen-key",
    category: "iOS",
  },
  {
    id: 19,
    name: "Star iOS Week Key",
    price: 15,
    imageUrl: "https://i.postimg.cc/6pS0ZTDh/star-ios-week-key.jpg",
    aiHint: "gaming character cinematic",
    href: "/products/star-ios-week-key",
    category: "iOS",
  },
  {
    id: 20,
    name: "Star iOS Month Key",
    price: 30,
    imageUrl: "https://i.postimg.cc/9Qq9vbnG/star-ios-month-key.jpg",
    aiHint: "gaming character cinematic",
    href: "/products/star-ios-month-key",
    category: "iOS",
  },
  {
    id: 21,
    name: "Tornado iOS Week Key",
    price: 17,
    imageUrl: "https://i.postimg.cc/MpXs95F7/tornado-ios-week-key.jpg",
    aiHint: "gaming character cinematic",
    href: "/products/tornado-ios-week-key",
    category: "iOS",
  },
  {
    id: 22,
    name: "Tornado iOS Month Key",
    price: 35,
    imageUrl: "https://i.postimg.cc/KjJNN37p/tornado-ios-month-key.jpg",
    aiHint: "gaming character cinematic",
    href: "/products/tornado-ios-month-key",
    category: "iOS",
  },
];

export const androidProducts: Product[] = [
    {
        id: 11,
        name: "Shield Android Day Key",
        price: 5,
        imageUrl: "https://i.postimg.cc/GhjRky3C/SHIELD-Android-day-key.jpg",
        aiHint: "gaming character cinematic",
        href: "/products/shield-android-day-key",
        category: "Android",
    },
    {
        id: 12,
        name: "Shield Android Week Key",
        price: 15,
        imageUrl: "https://i.postimg.cc/Gptb3mC1/SHIELD-Android-week-key.jpg",
        aiHint: "gaming character cinematic",
        href: "/products/shield-android-week-key",
        category: "Android",
    },
    {
        id: 13,
        name: "Shield Android Month Key",
        price: 30,
        imageUrl: "https://i.postimg.cc/Hxj1mZbW/SHIELD-Android-month-key.jpg",
        aiHint: "gaming character cinematic",
        href: "/products/shield-android-month-key",
        category: "Android",
    },
    {
        id: 23,
        name: "Zolo Android Day Key",
        price: 5,
        imageUrl: "https://i.postimg.cc/kGGfpL39/ZOLO-ios-day-key.jpg",
        aiHint: "gaming character cinematic",
        href: "/products/zolo-android-day-key",
        category: "Android",
    },
    {
        id: 24,
        name: "Zolo Android Week Key",
        price: 15,
        imageUrl: "https://i.postimg.cc/YStNPTYV/ZOLO-ios-month-key-1.jpg",
        aiHint: "gaming character cinematic",
        href: "/products/zolo-android-week-key",
        category: "Android",
    },
    {
        id: 25,
        name: "Zolo Android Month Key",
        price: 30,
        imageUrl: "https://i.postimg.cc/qBc3P1MH/ZOLO-ios-month-key.jpg",
        aiHint: "gaming character cinematic",
        href: "/products/zolo-android-month-key",
        category: "Android",
    },
    {
        id: 16,
        name: "Kernel Root Android Week Key",
        price: 20,
        imageUrl: "https://i.postimg.cc/NjV8sb9G/Kernel-Android-week-key.jpg",
        aiHint: "gaming character cinematic",
        href: "/products/kernel-android-week-key",
        category: "Android",
    },
    {
        id: 17,
        name: "Kernel Root Android Month Key",
        price: 40,
        imageUrl: "https://i.postimg.cc/C1Jz1LPC/Kernel-Android-month-key.jpg",
        aiHint: "gaming character cinematic",
        href: "/products/kernel-android-month-key",
        category: "Android",
    }
];

export const allProducts: Product[] = [...pcProducts, ...iosProducts, ...androidProducts];
