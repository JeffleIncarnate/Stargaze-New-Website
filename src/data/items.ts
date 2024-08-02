export type ItemShirt = {
  id: string;
  name: string;
  type: "shirt";
  description: string;
  price: number;
  img: string;
  img2: string;
  stock: {
    small: boolean;
    medium: boolean;
    large: boolean;
  };
  showOnShop: boolean;
};

export type ItemBeanie = {
  id: string;
  name: string;
  type: "beanie";
  description: string;
  price: number;
  img: string;
  color: "pink" | "black";
  showOnShop: boolean;
  sizeGuide: "One Size Fits ALl";
  inStock: boolean;
};

const ITEMS: Record<string, ItemShirt | ItemBeanie> = {
  1: {
    id: "1",
    name: "CMWYSG TEE",
    type: "shirt",
    description:
      "Introducing our premium oversized box tee, crafted from 100% cotton for unparalleled comfort. Designed with street wear in mind, it features a high ribbed neck and slouched shoulders for a relaxed fit. The tee boasts both puff and screen print detailing perfect for a night out stargazing",
    price: 45,
    img: "/shirts/front.png",
    img2: "/shirts/cmwysg.png",
    stock: {
      small: false,
      medium: false,
      large: false,
    },
    showOnShop: false,
  },
  2: {
    id: "2",
    name: "STRGZE OG TEE",
    type: "shirt",
    description:
      "Premium oversized box tee, includes puff and screen print. designed in mind for anyone trying to rizz up that special someone",
    price: 45,
    img: "/shirts/front.png",
    img2: "/shirts/heart.png",
    stock: {
      small: false,
      medium: false,
      large: false,
    },
    showOnShop: false,
  },
  3: {
    id: "3",
    name: "Phantom Black Beanie",
    type: "beanie",
    description:
      "Inspired by “2024” music, the STARGAZEWORLDWIDE Phantom black beanie is the perfect choice for a luh calm fit typa timing. Crafted with the best organic cotton money has to buy, the sustainable cotton  offers ultimate comfort. The cozy one size fits all design has been meticulously selected for inclusivity. Its clean and sleek design is perfect for any occasion, as a guaranteed piece in your clothing rotation. Mask yourself with the darkness and roam the streets with the Phantom Black beanie.",
    price: 29.99,
    img: "/beanie/black.png",
    color: "black",
    showOnShop: true,
    sizeGuide: "One Size Fits ALl",
    inStock: true,
  },
  4: {
    id: "4",
    name: "Bubblegum Pink Beanie",
    type: "beanie",
    description:
      "Are you tired of her lying about it being bubblegum pink? Well look no further as the STARGAZEWORLDWIDE bubble gum pink beanie, crafted from organic sustainable cotton offers ultimate comfort with a cozy one-size-fits-all design. Its vibrant pink hue adds a playful touch to any outfit, making it a versatile staple in your streetwear collection. be unique and stand out with this must-have accessory.",
    price: 29.99,
    img: "/beanie/pink.png",
    color: "pink",
    showOnShop: true,
    sizeGuide: "One Size Fits ALl",
    inStock: false,
  },
};

export { ITEMS };
