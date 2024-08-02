import "./catalogue.scss";

import Item from "./item/item";
import { ITEMS } from "../../data/items";

import {
  CMWYSG_SHIRT,
  HEART_SHIRT,
  BLACK_BEANIE,
  PINK_BEANIE,
} from "../../assets/__img__";

const Catalogue = () => {
  const items = [
    {
      itemUuid: "1",
      name: "CMWYSG TEE",
      price: 45,
      img: CMWYSG_SHIRT,
      isNew: false,
      showOnShop: ITEMS["1"].showOnShop,
    },
    {
      itemUuid: "2",
      name: "STRGZE OG TEE",
      price: 45,
      img: HEART_SHIRT,
      isNew: false,
      showOnShop: ITEMS["2"].showOnShop,
    },
    {
      itemUuid: "3",
      name: "Phantom Black Beanie",
      price: 29.99,
      img: BLACK_BEANIE,
      isNew: true,
      showOnShop: ITEMS["3"].showOnShop,
    },
    {
      itemUuid: "4",
      name: "Bubblegum Pink Beanie",
      price: 29.99,
      img: PINK_BEANIE,
      isNew: true,
      showOnShop: ITEMS["4"].showOnShop,
    },
  ];

  return (
    <main className="Catalogue">
      {items.map((item, index) => {
        return (
          <Item
            itemUuid={item.itemUuid}
            name={item.name}
            price={item.price}
            img={item.img}
            index={index}
            isNew={item.isNew}
            showOnShop={item.showOnShop}
            key={crypto.randomUUID()}
          />
        );
      })}
    </main>
  );
};

export default Catalogue;
