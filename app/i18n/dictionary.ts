import type { MenuItem } from "@/app/data/menu";

export type Locale = "en" | "es";

type Dictionary = {
  nav: { home: string; menu: string; cart: string };
  home: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    orderOnline: string;
    viewMenu: string;
    favorites: string;
    seeFullMenu: string;
    props: { title: string; text: string }[];
  };
  menu: { title: string; subtitle: string };
  categories: Record<MenuItem["category"], string>;
  card: {
    popular: string;
    addToOrder: string;
    inCart: string;
    addOne: (name: string) => string;
    removeOne: (name: string) => string;
  };
  cart: {
    yourOrder: string;
    delivery: string;
    pickup: string;
    each: string;
    clearCart: string;
    remove: (name: string) => string;
    subtotal: string;
    tax: string;
    total: string;
    free: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    addressPlaceholder: string;
    placeOrder: string;
    demoNote: string;
    emptyTitle: string;
    emptyText: string;
    browseMenu: string;
    thanks: (name: string) => string;
    confirmedBefore: string;
    confirmedAfter: string;
    onTheWay: string;
    readyForPickup: string;
    noPayment: string;
    orderAgain: string;
  };
  footer: {
    tagline: string;
    visit: string;
    hours: string;
    hoursValue: string;
    hoursClosed: string;
    demo: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: { home: "Home", menu: "Menu", cart: "Cart" },
    home: {
      badge: "🇮🇹 Rustic Italian · Portland",
      titleBefore: "Handmade pasta,",
      titleHighlight: "delivered",
      titleAfter: "to your table or door.",
      subtitle:
        "Family recipes, seasonal ingredients, and a wood-fired kitchen. Order online for pickup or delivery in minutes.",
      orderOnline: "Order online",
      viewMenu: "View menu",
      favorites: "Guest favorites",
      seeFullMenu: "See full menu →",
      props: [
        { title: "Made from scratch", text: "Pasta rolled fresh every morning." },
        { title: "Fast delivery", text: "30–45 min across downtown." },
        { title: "Local & seasonal", text: "Sourced from Oregon farms." },
      ],
    },
    menu: {
      title: "Our Menu",
      subtitle:
        "Add dishes to your order, then check out for pickup or delivery.",
    },
    categories: {
      Antipasti: "Antipasti",
      Pasta: "Pasta",
      Mains: "Mains",
      Dessert: "Dessert",
      Drinks: "Drinks",
    },
    card: {
      popular: "Popular",
      addToOrder: "Add to order",
      inCart: "in cart",
      addOne: (name) => `Add one ${name}`,
      removeOne: (name) => `Remove one ${name}`,
    },
    cart: {
      yourOrder: "Your order",
      delivery: "delivery",
      pickup: "pickup",
      each: "each",
      clearCart: "Clear cart",
      remove: (name) => `Remove ${name}`,
      subtotal: "Subtotal",
      tax: "Tax",
      total: "Total",
      free: "Free",
      namePlaceholder: "Your name",
      phonePlaceholder: "Phone number",
      addressPlaceholder: "Delivery address",
      placeOrder: "Place order",
      demoNote: "Demo checkout — no payment is taken.",
      emptyTitle: "Your cart is empty",
      emptyText: "Add some dishes to get started.",
      browseMenu: "Browse the menu",
      thanks: (name) => `Grazie, ${name}!`,
      confirmedBefore: "Your order",
      confirmedAfter: "is confirmed. We'll text you when it's",
      onTheWay: "on the way",
      readyForPickup: "ready for pickup",
      noPayment: "This is a demo — no payment was processed.",
      orderAgain: "Order again",
    },
    footer: {
      tagline: "Rustic Italian cooking, made from scratch daily.",
      visit: "Visit us",
      hours: "Hours",
      hoursValue: "Tue–Sun · 5:00pm – 10:00pm",
      hoursClosed: "Closed Mondays",
      demo: "Demo site",
    },
  },
  es: {
    nav: { home: "Inicio", menu: "Menú", cart: "Carrito" },
    home: {
      badge: "🇮🇹 Italiano rústico · Portland",
      titleBefore: "Pasta artesanal,",
      titleHighlight: "a domicilio",
      titleAfter: "o directo a tu mesa.",
      subtitle:
        "Recetas de familia, ingredientes de temporada y una cocina a leña. Pide en línea para recoger o con entrega a domicilio en minutos.",
      orderOnline: "Pedir en línea",
      viewMenu: "Ver menú",
      favorites: "Favoritos de la casa",
      seeFullMenu: "Ver menú completo →",
      props: [
        { title: "Hecho desde cero", text: "Pasta fresca amasada cada mañana." },
        { title: "Entrega rápida", text: "30–45 min en el centro." },
        { title: "Local y de temporada", text: "De granjas de Oregón." },
      ],
    },
    menu: {
      title: "Nuestro Menú",
      subtitle:
        "Agrega platillos a tu pedido y finaliza para recoger o con entrega a domicilio.",
    },
    categories: {
      Antipasti: "Antipasti",
      Pasta: "Pasta",
      Mains: "Platos Fuertes",
      Dessert: "Postres",
      Drinks: "Bebidas",
    },
    card: {
      popular: "Popular",
      addToOrder: "Agregar al pedido",
      inCart: "en el carrito",
      addOne: (name) => `Agregar un ${name}`,
      removeOne: (name) => `Quitar un ${name}`,
    },
    cart: {
      yourOrder: "Tu pedido",
      delivery: "entrega",
      pickup: "recoger",
      each: "c/u",
      clearCart: "Vaciar carrito",
      remove: (name) => `Quitar ${name}`,
      subtotal: "Subtotal",
      tax: "Impuestos",
      total: "Total",
      free: "Gratis",
      namePlaceholder: "Tu nombre",
      phonePlaceholder: "Teléfono",
      addressPlaceholder: "Dirección de entrega",
      placeOrder: "Realizar pedido",
      demoNote: "Pago de demostración — no se cobra nada.",
      emptyTitle: "Tu carrito está vacío",
      emptyText: "Agrega algunos platillos para empezar.",
      browseMenu: "Ver el menú",
      thanks: (name) => `¡Grazie, ${name}!`,
      confirmedBefore: "Tu pedido",
      confirmedAfter: "está confirmado. Te enviaremos un mensaje cuando esté",
      onTheWay: "en camino",
      readyForPickup: "listo para recoger",
      noPayment: "Esto es una demostración — no se procesó ningún pago.",
      orderAgain: "Pedir de nuevo",
    },
    footer: {
      tagline: "Cocina italiana rústica, hecha desde cero cada día.",
      visit: "Visítanos",
      hours: "Horario",
      hoursValue: "Mar–Dom · 5:00pm – 10:00pm",
      hoursClosed: "Cerrado los lunes",
      demo: "Sitio de demostración",
    },
  },
};
