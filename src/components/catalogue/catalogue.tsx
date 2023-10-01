import "./catalogue.scss";

import Item from "./item/item";

import { CMWYSG_SHIRT, HEART_SHIRT } from "../../assets/__img__";

const Catalogue = () => {
  const items = [
    {
      itemUuid: "1",
      name: "CMWYSG TEE",
      price: 45,
      img: CMWYSG_SHIRT,
    },
    {
      itemUuid: "2",
      name: "STRGZE OG TEE",
      price: 45,
      img: HEART_SHIRT,
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
            key={crypto.randomUUID()}
          />
        );
      })}
    </main>
  );
};

export default Catalogue;
