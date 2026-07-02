export type MenuItem = {
  id: string;
  name: string;
  description: string;
  descriptionEs: string;
  price: number;
  category: "Antipasti" | "Pasta" | "Mains" | "Dessert" | "Drinks";
  emoji: string;
  popular?: boolean;
};

export const menu: MenuItem[] = [
  {
    id: "bruschetta",
    name: "Bruschetta al Pomodoro",
    description: "Grilled sourdough, vine tomatoes, basil, garlic, olive oil.",
    descriptionEs:
      "Pan de masa madre a la parrilla, jitomates de rama, albahaca, ajo y aceite de oliva.",
    price: 9,
    category: "Antipasti",
    emoji: "🍅",
    popular: true,
  },
  {
    id: "arancini",
    name: "Arancini",
    description: "Crispy saffron risotto balls, mozzarella, spicy arrabbiata.",
    descriptionEs:
      "Bolas crujientes de risotto al azafrán, mozzarella y arrabbiata picante.",
    price: 11,
    category: "Antipasti",
    emoji: "🧆",
  },
  {
    id: "burrata",
    name: "Burrata & Prosciutto",
    description: "Creamy burrata, San Daniele prosciutto, rocket, aged balsamic.",
    descriptionEs:
      "Burrata cremosa, prosciutto San Daniele, arúgula y balsámico añejo.",
    price: 14,
    category: "Antipasti",
    emoji: "🧀",
  },
  {
    id: "carbonara",
    name: "Spaghetti Carbonara",
    description: "Guanciale, egg yolk, pecorino romano, black pepper.",
    descriptionEs: "Guanciale, yema de huevo, pecorino romano y pimienta negra.",
    price: 17,
    category: "Pasta",
    emoji: "🍝",
    popular: true,
  },
  {
    id: "tagliatelle",
    name: "Tagliatelle al Ragù",
    description: "Slow-cooked beef & pork ragù, fresh egg tagliatelle.",
    descriptionEs:
      "Ragù de res y cerdo cocido a fuego lento, tagliatelle fresco al huevo.",
    price: 18,
    category: "Pasta",
    emoji: "🍲",
  },
  {
    id: "gnocchi",
    name: "Gnocchi Sorrentina",
    description: "Potato gnocchi, San Marzano tomato, mozzarella, basil.",
    descriptionEs:
      "Ñoquis de papa, jitomate San Marzano, mozzarella y albahaca.",
    price: 16,
    category: "Pasta",
    emoji: "🥔",
  },
  {
    id: "branzino",
    name: "Branzino al Forno",
    description: "Whole roasted sea bass, lemon, capers, herbs, roast potatoes.",
    descriptionEs:
      "Robalo entero al horno, limón, alcaparras, hierbas y papas al horno.",
    price: 26,
    category: "Mains",
    emoji: "🐟",
  },
  {
    id: "ossobuco",
    name: "Ossobuco alla Milanese",
    description: "Braised veal shank, saffron risotto, gremolata.",
    descriptionEs:
      "Chambarete de ternera braseado, risotto al azafrán y gremolata.",
    price: 29,
    category: "Mains",
    emoji: "🍖",
    popular: true,
  },
  {
    id: "tiramisu",
    name: "Tiramisù",
    description: "Espresso-soaked savoiardi, mascarpone, cocoa.",
    descriptionEs:
      "Soletas remojadas en espresso, mascarpone y cocoa.",
    price: 9,
    category: "Dessert",
    emoji: "🍰",
    popular: true,
  },
  {
    id: "pannacotta",
    name: "Panna Cotta",
    description: "Vanilla bean cream, wild berry compote.",
    descriptionEs: "Crema de vainilla natural con compota de frutos rojos.",
    price: 8,
    category: "Dessert",
    emoji: "🍮",
  },
  {
    id: "chianti",
    name: "Chianti Classico",
    description: "Glass of Tuscan red, bright cherry & spice.",
    descriptionEs: "Copa de tinto toscano, con notas de cereza y especias.",
    price: 12,
    category: "Drinks",
    emoji: "🍷",
  },
  {
    id: "aperol",
    name: "Aperol Spritz",
    description: "Aperol, prosecco, soda, orange.",
    descriptionEs: "Aperol, prosecco, agua mineral y naranja.",
    price: 11,
    category: "Drinks",
    emoji: "🍹",
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "Single-origin, double shot.",
    descriptionEs: "De origen único, doble carga.",
    price: 4,
    category: "Drinks",
    emoji: "☕",
  },
];

export const categories: MenuItem["category"][] = [
  "Antipasti",
  "Pasta",
  "Mains",
  "Dessert",
  "Drinks",
];
