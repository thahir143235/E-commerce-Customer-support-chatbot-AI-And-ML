import { featuredProducts } from "./products";

const getPrice = (name: string) => {
  const product = featuredProducts.find(
    (p) => p.name.toLowerCase().includes(name.toLowerCase())
  );

  return product
    ? `₹${product.price.toLocaleString("en-IN")}`
    : "Price not available";
};

export const productFAQ = {
  headphones: [
    {
      q: "What are the key features?",
      a: "Premium Headphones offer active noise cancellation, wireless Bluetooth connectivity, and deep bass sound quality."
    },
    {
      q: "What is the battery life?",
      a: "The headphones provide up to 30 hours of battery life on a single charge."
    },
    {
      q: "Is it wireless?",
      a: "Yes, the Premium Headphones support wireless Bluetooth connectivity."
    },
    {
      q: "Is noise cancellation available?",
      a: "Yes, it includes active noise cancellation for an immersive listening experience."
    },
    {
      q: "What is the price?",
      a: `The price of Premium Headphones is ${getPrice("Headphones")}.`
    }
  ],

  smartwatch: [
    {
      q: "What health features are included?",
      a: "The Smart Watch tracks heart rate, steps, calories burned, and sleep patterns."
    },
    {
      q: "Is it waterproof?",
      a: "Yes, the Smart Watch is water-resistant and suitable for daily use."
    },
    {
      q: "Does it support Android and iOS?",
      a: "Yes, it is compatible with both Android and iOS devices."
    },
    {
      q: "What is the battery life?",
      a: "The Smart Watch battery lasts up to 2 days on a full charge."
    },
    {
      q: "What is the price?",
      a: `The Smart Watch is priced at ${getPrice("Watch")}.`
    }
  ],

  laptop: [
    {
      q: "What are the specifications?",
      a: "Laptop Pro features an Intel i7 processor, 16GB RAM, and 512GB SSD storage."
    },
    {
      q: "Is it good for coding?",
      a: "Yes, Laptop Pro is ideal for coding, software development, and professional tasks."
    },
    {
      q: "Can it handle multitasking?",
      a: "Yes, with 16GB RAM, it supports smooth multitasking and heavy applications."
    },
    {
      q: "Is it suitable for students?",
      a: "Yes, it is suitable for students, professionals, and developers."
    },
    {
      q: "What is the price?",
      a: `The price of Laptop Pro is ${getPrice("Laptop")}.`
    }
  ]
};
